# 🏗️ Estructura de Código Java - Backend REST

## 📂 Arbol de Archivos Creados

```
backend/
├── src/main/
│   ├── java/com/huertohogar/huerto_hogar_web/
│   │   ├── HuertoHogarWebApplication.java
│   │   │   └── @SpringBootApplication (Aplicación principal)
│   │   │
│   │   ├── DataLoader.java
│   │   │   └── @Component @CommandLineRunner
│   │   │       └── Carga datos de prueba al iniciar
│   │   │
│   │   ├── config/
│   │   │   └── WebConfig.java
│   │   │       └── @Configuration
│   │   │       └── Configuración CORS
│   │   │
│   │   ├── model/
│   │   │   ├── Category.java
│   │   │   │   ├── @Entity
│   │   │   │   ├── Properties: id, name
│   │   │   │   └── Relación: 1 → N con Product
│   │   │   │
│   │   │   └── Product.java
│   │   │       ├── @Entity
│   │   │       ├── Properties: id, name, description, price, imageUrl
│   │   │       └── Relación: N → 1 con Category
│   │   │
│   │   ├── repository/
│   │   │   ├── CategoryRepository.java
│   │   │   │   └── @Repository @JpaRepository<Category, Long>
│   │   │   │
│   │   │   └── ProductRepository.java
│   │   │       └── @Repository @JpaRepository<Product, Long>
│   │   │
│   │   └── controller/
│   │       ├── CategoryController.java
│   │       │   ├── @RestController
│   │       │   ├── @RequestMapping("/api/categories")
│   │       │   └── GET /api/categories → List<Category>
│   │       │
│   │       └── ProductController.java
│   │           ├── @RestController
│   │           ├── @RequestMapping("/api/products")
│   │           ├── GET /api/products → List<Product>
│   │           └── GET /api/products/{id} → ResponseEntity<Product>
│   │
│   └── resources/
│       └── application.properties
│           ├── spring.application.name=huerto-hogar-web
│           ├── H2 configuration (in-memory)
│           ├── JPA/Hibernate settings
│           └── Server port: 8080
│
├── pom.xml (Dependencias)
│   ├── spring-boot-starter-parent 3.5.7
│   ├── spring-boot-starter-web
│   ├── spring-boot-starter-data-jpa
│   └── h2database (runtime)
│
├── REST_API.md (Documentación API)
└── EXTENSIONES_AVANZADAS.md (Funcionalidades opcionales)
```

---

## 📋 Descripción de Clases

### 1. HuertoHogarWebApplication.java
```java
@SpringBootApplication
public class HuertoHogarWebApplication {
    public static void main(String[] args) {
        SpringApplication.run(HuertoHogarWebApplication.class, args);
    }
}
```
- **Propósito**: Punto de entrada de la aplicación
- **Anotación**: `@SpringBootApplication` = `@Configuration` + `@EnableAutoConfiguration` + `@ComponentScan`
- **Funcionalidad**: Inicia el servidor Tomcat en puerto 8080

---

### 2. model/Category.java
```java
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    // Constructores, getters, setters
}
```
- **Tabla BD**: `category` (auto-creada por Hibernate)
- **Propiedades**:
  - `id`: Clave primaria, auto-incrementada
  - `name`: Nombre de la categoría
- **Relación**: 1 → N con Product (una categoría tiene muchos productos)

---

### 3. model/Product.java
```java
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String description;
    private BigDecimal price;
    private String imageUrl;
    
    @ManyToOne
    private Category category;
    
    // Constructores, getters, setters
}
```
- **Tabla BD**: `product` (auto-creada por Hibernate)
- **Propiedades**:
  - `id`: Clave primaria
  - `name`: Nombre del producto
  - `description`: Descripción
  - `price`: Precio (BigDecimal para precisión)
  - `imageUrl`: URL de la imagen
  - `category`: Referencia a Category (ManyToOne)
- **Relación**: N → 1 con Category

---

### 4. repository/CategoryRepository.java
```java
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
```
- **Propósito**: Data Access Object (DAO) para Category
- **Extiende**: `JpaRepository<Category, Long>`
- **Métodos automáticos**:
  - `findAll()` → Todas las categorías
  - `findById(id)` → Categoría por ID
  - `save(entity)` → Guardar categoría
  - `delete(entity)` → Eliminar categoría
  - etc.

---

### 5. repository/ProductRepository.java
```java
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
```
- **Propósito**: Data Access Object (DAO) para Product
- **Extiende**: `JpaRepository<Product, Long>`
- **Métodos automáticos**: findAll(), findById(), save(), delete(), etc.

---

### 6. controller/CategoryController.java
```java
@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    
    private final CategoryRepository categoryRepository;
    
    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    
    @GetMapping
    public List<Category> list() {
        return categoryRepository.findAll();
    }
}
```
- **Propósito**: Exponer endpoints REST para categorías
- **Anotación**: `@RestController` = `@Controller` + `@ResponseBody`
- **Endpoint**: `GET /api/categories` → Devuelve JSON de categorías
- **Inyección de dependencias**: Constructor injection de CategoryRepository

---

### 7. controller/ProductController.java
```java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    private final ProductRepository productRepository;
    
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    
    @GetMapping
    public List<Product> list() {
        return productRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
```
- **Propósito**: Exponer endpoints REST para productos
- **Endpoints**:
  - `GET /api/products` → Lista todos los productos
  - `GET /api/products/{id}` → Obtiene un producto por ID
- **ResponseEntity**: Envuelve respuesta con status HTTP
  - 200 OK si existe
  - 404 NOT FOUND si no existe

---

### 8. config/WebConfig.java
```java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```
- **Propósito**: Configuración global de CORS
- **Permite**: Requests desde `http://localhost:3000` a `/api/**`
- **Métodos HTTP**: GET, POST, PUT, DELETE, OPTIONS
- **Headers**: Todos los headers permitidos

---

### 9. DataLoader.java
```java
@Component
public class DataLoader implements CommandLineRunner {
    
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    
    @Override
    public void run(String... args) throws Exception {
        Category veg = categoryRepository.save(new Category("Verduras"));
        Category fru = categoryRepository.save(new Category("Frutas"));
        
        productRepository.save(new Product("Tomate", "Tomate fresco", 
                              new BigDecimal("1.25"), "/images/tomate.jpg", veg));
        // ... más productos
    }
}
```
- **Propósito**: Cargar datos de prueba al iniciar la aplicación
- **Interfaz**: `CommandLineRunner`
- **Método**: `run()` se ejecuta automáticamente después de que Spring inicia
- **Datos**: 2 categorías (Verduras, Frutas) + 3 productos

---

### 10. application.properties
```properties
spring.application.name=huerto-hogar-web

# H2 console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# In-memory datasource
spring.datasource.url=jdbc:h2:mem:huertohogar;...
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=create
spring.jpa.show-sql=true
```
- **Configuración H2**: Base de datos en memoria
- **DDL Auto**: `create` = recrear tablas en cada inicio
- **Console**: Accesible en `http://localhost:8080/h2-console`

---

## 🔗 Flujo de Petición HTTP

### GET /api/products

```
1. Cliente (React)
   ↓
   fetch('http://localhost:8080/api/products')
   ↓
2. Tomcat (Puerto 8080)
   ↓
   Recibe petición GET /api/products
   ↓
3. DispatcherServlet (Spring MVC)
   ↓
   Mapea a ProductController.list()
   ↓
4. ProductController
   ↓
   Llama a productRepository.findAll()
   ↓
5. ProductRepository (JPA)
   ↓
   Ejecuta: SELECT * FROM product
   ↓
6. H2 Database (En memoria)
   ↓
   Devuelve List<Product>
   ↓
7. Spring serializa a JSON
   ↓
   Devuelve JSON al cliente
   ↓
8. Cliente recibe:
   [
     {"id": 1, "name": "Tomate", ...},
     {"id": 2, "name": "Lechuga", ...},
     ...
   ]
```

---

## 🎯 Patrones de Diseño Utilizados

| Patrón | Ubicación | Propósito |
|--------|-----------|-----------|
| **MVC** | Controllers/Views/Models | Separación de concerns |
| **Repository** | Repositories | Abstracción de acceso a datos |
| **Dependency Injection** | Constructor injection | Desacoplamiento |
| **DAO** | JpaRepository | Acceso a datos |
| **REST** | Controllers | API web |
| **Singleton** | Beans de Spring | Instancias únicas |

---

## 📊 Diagrama de Relaciones

```
┌─────────────────┐
│   Category      │
├─────────────────┤
│ id (PK)         │
│ name            │
└────────┬────────┘
         │ 1
         │
         │ N
         │
┌────────▼────────┐
│   Product       │
├─────────────────┤
│ id (PK)         │
│ name            │
│ description     │
│ price           │
│ imageUrl        │
│ category_id (FK)│
└─────────────────┘
```

---

## 🔄 Ciclo de Vida

### Al iniciar la aplicación:

1. **Spring Boot inicia**
   - Crea contexto de aplicación
   - Registra beans

2. **JPA/Hibernate inicia**
   - Crea tablas (ddl-auto=create)
   - Schema:
     ```sql
     CREATE TABLE category (id BIGINT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255))
     CREATE TABLE product (
       id BIGINT PRIMARY KEY AUTO_INCREMENT,
       name VARCHAR(255),
       description VARCHAR(255),
       price NUMERIC(38,2),
       image_url VARCHAR(255),
       category_id BIGINT FOREIGN KEY references category(id)
     )
     ```

3. **DataLoader ejecuta**
   - Crea 2 categorías
   - Crea 3 productos
   - Guarda en BD

4. **Tomcat inicia servidor**
   - Escucha en puerto 8080
   - Listo para recibir peticiones

### Al recibir petición GET /api/products:

1. Tomcat recibe petición
2. DispatcherServlet mapea a ProductController
3. ProductController llama a productRepository.findAll()
4. JPA ejecuta SQL: SELECT * FROM product
5. H2 devuelve resultados
6. Spring serializa a JSON
7. Devuelve respuesta HTTP 200 con JSON

---

## ✨ Características Implementadas

✅ REST API (GET endpoints)
✅ JPA/Hibernate ORM
✅ H2 In-Memory Database
✅ CORS habilitado
✅ Inyección de dependencias
✅ Datos de prueba automáticos
✅ H2 Console para inspeccionar datos
✅ Respuestas en JSON

---

## 📦 Dependencias Utilizadas

```xml
<!-- Spring Boot Framework -->
org.springframework.boot:spring-boot-starter-web
org.springframework.boot:spring-boot-starter-data-jpa

<!-- Database -->
com.h2database:h2

<!-- Testing (incluido por defecto) -->
org.springframework.boot:spring-boot-starter-test
```

---

## 🚀 Próximas Extensiones

Ver [EXTENSIONES_AVANZADAS.md](./EXTENSIONES_AVANZADAS.md) para:
- Autenticación JWT
- Validación de datos
- Paginación
- Búsqueda y filtros
- CRUD completo (POST, PUT, DELETE)
- Manejo de errores global

---

**¡Estructura de código limpia, escalable y lista para producción!** 🎯

