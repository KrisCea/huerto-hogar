# 🔧 Backend REST - Extensiones y Ejemplos Avanzados

## 📋 Introducción

Este archivo contiene ejemplos avanzados para extender el backend REST con funcionalidades adicionales como:
- Autenticación JWT
- Validación de datos
- Paginación
- Búsqueda y filtros
- DTOs (Data Transfer Objects)

---

## 1. Autenticación JWT (Opcional)

### 1.1 Agregar Dependencias

Añadir al `pom.xml`:
```xml
<!-- JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.12.3</version>
    <scope>runtime</scope>
</dependency>

<!-- Spring Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

### 1.2 Crear modelo User

```java
package com.huertohogar.huerto_hogar_web.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String email;
    
    private String password;
    
    private String name;
    
    private String role; // "USER", "ADMIN"
    
    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
```

### 1.3 JWT Utility

```java
package com.huertohogar.huerto_hogar_web.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {
    
    @Value("${jwt.secret:mySecretKeyThatIsAtLeast256BitsLongForHS256Algorithm}")
    private String secret;
    
    @Value("${jwt.expiration:86400000}") // 24 horas
    private long expiration;
    
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
    
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    
    public String getEmailFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
```

### 1.4 Auth Controller

```java
package com.huertohogar.huerto_hogar_web.controller;

import com.huertohogar.huerto_hogar_web.model.User;
import com.huertohogar.huerto_hogar_web.security.JwtUtil;
import com.huertohogar.huerto_hogar_web.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    
    public AuthController(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("El email ya existe");
        }
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");
        User saved = userRepository.save(user);
        
        Map<String, Object> response = new HashMap<>();
        response.put("id", saved.getId());
        response.put("email", saved.getEmail());
        response.put("name", saved.getName());
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        
        User user = userRepository.findByEmail(email)
                .orElse(null);
        
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.badRequest().body("Credenciales inválidas");
        }
        
        String token = jwtUtil.generateToken(email);
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "name", user.getName(),
                "role", user.getRole()
        ));
        
        return ResponseEntity.ok(response);
    }
}
```

---

## 2. DTOs (Data Transfer Objects)

### 2.1 ProductDTO

```java
package com.huertohogar.huerto_hogar_web.dto;

import java.math.BigDecimal;

public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String imageUrl;
    private Long categoryId;
    private String categoryName;
    
    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
}
```

---

## 3. Validación de Datos

### 3.1 Agregar dependencia

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

### 3.2 Actualizar modelo Product

```java
import jakarta.validation.constraints.*;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "El nombre no puede estar vacío")
    private String name;
    
    @NotBlank(message = "La descripción no puede estar vacía")
    private String description;
    
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor a 0")
    private BigDecimal price;
    
    @NotBlank(message = "La URL de imagen no puede estar vacía")
    @URL(message = "La URL debe ser válida")
    private String imageUrl;
    
    @NotNull(message = "La categoría no puede ser nula")
    @ManyToOne
    private Category category;
    
    // ... rest of the class
}
```

### 3.3 Controller con validación

```java
@PostMapping
public ResponseEntity<?> createProduct(@Valid @RequestBody ProductDTO dto) {
    // El @Valid dispara validaciones
    Product product = new Product();
    product.setName(dto.getName());
    product.setDescription(dto.getDescription());
    product.setPrice(dto.getPrice());
    product.setImageUrl(dto.getImageUrl());
    
    Product saved = productRepository.save(product);
    return ResponseEntity.status(201).body(saved);
}
```

---

## 4. Paginación

### 4.1 Actualizar Repository

```java
package com.huertohogar.huerto_hogar_web.repository;

import com.huertohogar.huerto_hogar_web.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findAll(Pageable pageable);
}
```

### 4.2 Controller con paginación

```java
@GetMapping
public Page<Product> listPaginated(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {
    return productRepository.findAll(PageRequest.of(page, size));
}
```

### 4.3 Frontend - consumir paginación

```javascript
// Obtener primera página (10 elementos)
fetch('http://localhost:8080/api/products?page=0&size=10')
    .then(res => res.json())
    .then(data => {
        console.log(data.content);        // Array de productos
        console.log(data.totalPages);     // Total de páginas
        console.log(data.totalElements);  // Total de elementos
        console.log(data.number);         // Página actual
    });
```

---

## 5. Búsqueda y Filtros

### 5.1 Repository con búsqueda

```java
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByCategoryId(Long categoryId);
    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
}
```

### 5.2 Controller con búsqueda

```java
@GetMapping("/search")
public List<Product> search(@RequestParam String query) {
    return productRepository.findByNameContainingIgnoreCase(query);
}

@GetMapping("/category/{categoryId}")
public List<Product> byCategory(@PathVariable Long categoryId) {
    return productRepository.findByCategoryId(categoryId);
}

@GetMapping("/price")
public List<Product> byPrice(
        @RequestParam BigDecimal min,
        @RequestParam BigDecimal max) {
    return productRepository.findByPriceBetween(min, max);
}
```

### 5.3 Frontend - búsqueda

```javascript
// Buscar por nombre
fetch('http://localhost:8080/api/products/search?query=tomate')
    .then(res => res.json())
    .then(data => console.log(data));

// Por categoría
fetch('http://localhost:8080/api/products/category/1')
    .then(res => res.json())
    .then(data => console.log(data));

// Por rango de precio
fetch('http://localhost:8080/api/products/price?min=0&max=2')
    .then(res => res.json())
    .then(data => console.log(data));
```

---

## 6. Manejo de Errores Global

### 6.1 Exception Handler

```java
package com.huertohogar.huerto_hogar_web.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationError(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult()
                .getFieldErrors()
                .forEach(err -> errors.put(err.getField(), err.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGenericError(Exception ex) {
        Map<String, String> error = new HashMap<>();
        error.put("mensaje", "Error interno del servidor");
        error.put("detalles", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
```

---

## 7. CRUD Completo (POST, PUT, DELETE)

### 7.1 ProductController extendido

```java
@PostMapping
public ResponseEntity<Product> create(@Valid @RequestBody ProductDTO dto) {
    Category category = categoryRepository.findById(dto.getCategoryId())
            .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
    
    Product product = new Product();
    product.setName(dto.getName());
    product.setDescription(dto.getDescription());
    product.setPrice(dto.getPrice());
    product.setImageUrl(dto.getImageUrl());
    product.setCategory(category);
    
    return ResponseEntity.status(201).body(productRepository.save(product));
}

@PutMapping("/{id}")
public ResponseEntity<Product> update(@PathVariable Long id, @Valid @RequestBody ProductDTO dto) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    
    product.setName(dto.getName());
    product.setDescription(dto.getDescription());
    product.setPrice(dto.getPrice());
    product.setImageUrl(dto.getImageUrl());
    
    return ResponseEntity.ok(productRepository.save(product));
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> delete(@PathVariable Long id) {
    productRepository.deleteById(id);
    return ResponseEntity.noContent().build();
}
```

### 7.2 Frontend - ejemplos CRUD

```javascript
// POST - Crear
fetch('http://localhost:8080/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: 'Pepino',
        description: 'Pepino fresco',
        price: 1.99,
        imageUrl: '/images/pepino.jpg',
        categoryId: 1
    })
}).then(res => res.json());

// PUT - Actualizar
fetch('http://localhost:8080/api/products/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: 'Tomate Premium',
        description: 'Tomate orgánico',
        price: 2.50,
        imageUrl: '/images/tomate-premium.jpg',
        categoryId: 1
    })
}).then(res => res.json());

// DELETE
fetch('http://localhost:8080/api/products/1', { method: 'DELETE' });
```

---

## 📝 Resumen de Extensiones

| Característica | Complejidad | Archivo |
|----------------|------------|---------|
| Autenticación JWT | Media | `security/JwtUtil.java`, `AuthController.java` |
| DTOs | Baja | `dto/ProductDTO.java` |
| Validación | Baja | `@Valid`, constraints en modelos |
| Paginación | Baja | `Pageable` en controllers |
| Búsqueda | Media | Custom queries en repositories |
| Manejo de errores | Baja | `GlobalExceptionHandler.java` |
| CRUD Completo | Media | POST, PUT, DELETE en controllers |

---

¡Estas extensiones permiten construir un backend robusto y escalable! 🚀

