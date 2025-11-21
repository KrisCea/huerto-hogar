# 🚀 Guía Rápida de Integración CRUD

## Inicio Rápido (5 minutos)

### 1. Verificar Backend

```bash
# Desde /backend
./mvnw spring-boot:run
# o en Windows: mvnw.cmd spring-boot:run
```

✅ Esperado: `Started HuertoHogarWebApplication in 2.5 seconds`

### 2. Verificar Frontend

```bash
# Desde /frontend
npm start
```

✅ Esperado: Abre http://localhost:3000

### 3. Importar Componente Admin

En `frontend/src/App.js`:

```javascript
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() {
  return <AdminDashboard />;
}

export default App;
```

---

## 📁 Archivos Clave Creados

### Backend (Java - Spring Boot)

```
backend/src/main/java/com/huertohogar/
├── HuertoHogarWebApplication.java          ✅ Entry point
├── model/
│   ├── Product.java                        ✅ Entity con @ManyToOne Category
│   └── Category.java                       ✅ Entity principal
├── repository/
│   ├── ProductRepository.java              ✅ JpaRepository
│   └── CategoryRepository.java             ✅ JpaRepository
├── controller/
│   ├── ProductController.java              ✅ 5 endpoints CRUD
│   └── CategoryController.java             ✅ 5 endpoints CRUD
├── dto/
│   ├── CreateProductDTO.java               ✅ Validation @Valid
│   └── CreateCategoryDTO.java              ✅ Validation @Valid
├── exception/
│   ├── ResourceNotFoundException.java       ✅ Custom exception
│   └── GlobalExceptionHandler.java         ✅ Centralized error handling
├── config/
│   └── WebConfig.java                      ✅ CORS config
├── util/
│   └── DataLoader.java                     ✅ Test data (runs at startup)
└── resources/
    └── application.properties               ✅ H2 config
```

### Frontend (React)

```
frontend/src/
├── services/
│   └── apiService.js                       ✅ 11 métodos CRUD
├── components/
│   └── CRUDExamples.jsx                    ✅ 5 componentes reutilizables
├── pages/
│   └── Admin/
│       ├── AdminDashboard.jsx              ✅ Dashboard principal
│       └── AdminDashboard.css              ✅ Estilos profesionales
└── .env.development                        ✅ REACT_APP_API_URL
```

### Documentación

```
├── REACT_CRUD_GUIDE.md                     ✅ Guía completa de React
├── CRUD_API.md                             ✅ Especificación de API
├── SETUP.md                                ✅ Setup inicial
└── README.md                               ✅ Overview
```

---

## 🎯 Casos de Uso

### Caso 1: Usar Admin Dashboard (Recomendado)

```javascript
// App.js
import AdminDashboard from './pages/Admin/AdminDashboard';

export default AdminDashboard;
```

**Características:**
- ✅ Tabla de productos con editar/eliminar
- ✅ Crear producto con formulario
- ✅ Gestionar categorías
- ✅ Interfaz profesional con CSS gradiente
- ✅ Responsivo en móvil

---

### Caso 2: Usar Componentes Individuales

```javascript
// Importar solo lo que necesites
import { ProductListCRUD, CreateProductForm } from './components/CRUDExamples';

function MyAdmin() {
  return (
    <div>
      <CreateProductForm />
      <ProductListCRUD />
    </div>
  );
}
```

**Componentes disponibles:**
```javascript
import {
  ProductListCRUD,           // Listar productos
  CreateProductForm,         // Formulario crear
  UpdateProductForm,         // Formulario editar
  DeleteProductButton,       // Botón eliminar
  CategoriesCRUD,           // Gestión de categorías
} from './components/CRUDExamples';
```

---

### Caso 3: Usar Service Directamente

```javascript
import React, { useState, useEffect } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from './services/apiService';

function MyComponent() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const addProduct = async () => {
    const newProd = await createProduct({
      name: 'Nuevo Producto',
      description: 'Descripción',
      price: 29.99,
      imageUrl: 'https://...',
      categoryId: 1,
    });
    setProducts([...products, newProd]);
  };

  return (
    <div>
      {products.map(p => <div key={p.id}>{p.name}</div>)}
      <button onClick={addProduct}>Agregar</button>
    </div>
  );
}
```

---

## 🧪 Testing

### Opción 1: PowerShell (Windows)

```bash
cd backend
./test-crud.ps1
```

**Ejecuta 12 tests:**
- ✅ GET all products
- ✅ GET product by ID
- ✅ GET invalid ID → 404
- ✅ POST valid product → 201
- ✅ POST invalid → 400
- ✅ PUT update → 200
- ✅ DELETE → 204
- ... y más para categorías

### Opción 2: Bash (Linux/Mac)

```bash
cd backend
chmod +x test-crud.sh
./test-crud.sh
```

### Opción 3: cURL Manual

```bash
# Crear producto
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tomate",
    "description": "Tomate fresco",
    "price": 25.50,
    "imageUrl": "https://...",
    "categoryId": 1
  }'

# Obtener todos
curl http://localhost:8080/api/products

# Obtener por ID
curl http://localhost:8080/api/products/1

# Actualizar
curl -X PUT http://localhost:8080/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Tomate v2", ...}'

# Eliminar
curl -X DELETE http://localhost:8080/api/products/1
```

---

## 📊 Estructura de Datos

### Producto (Product.java)

```json
{
  "id": 1,
  "name": "Tomate",
  "description": "Tomate orgánico",
  "price": 25.50,
  "imageUrl": "https://example.com/tomate.jpg",
  "category": {
    "id": 1,
    "name": "Verduras"
  }
}
```

### Categoría (Category.java)

```json
{
  "id": 1,
  "name": "Verduras"
}
```

---

## ✅ Checklist de Validación

### Backend

- [ ] Compilar sin errores: `mvnw clean package`
- [ ] Iniciar correctamente: `mvnw spring-boot:run`
- [ ] Ver datos en H2: http://localhost:8080/h2-console
  - URL: `jdbc:h2:mem:testdb`
  - Usuario: `sa`
  - Contraseña: (vacía)

### Frontend

- [ ] npm start sin errores
- [ ] Abre http://localhost:3000
- [ ] Componentes se importan sin errores
- [ ] Admin Dashboard muestra tabla

### CRUD Operations

- [ ] GET /api/products devuelve 2-3 productos
- [ ] POST /api/products con datos válidos → 201
- [ ] POST /api/products con datos inválidos → 400
- [ ] PUT /api/products/{id} → 200
- [ ] DELETE /api/products/{id} → 204
- [ ] GET /api/products/999 → 404

---

## 🐛 Troubleshooting

### Error: "Cannot GET /api/products"

**Causa:** Backend no está corriendo
**Solución:**
```bash
cd backend
./mvnw spring-boot:run
```

### Error: "Failed to fetch"

**Causa:** CORS bloqueado o servidor desconectado
**Solución:**
1. Verificar que backend está en http://localhost:8080
2. Verificar .env.development: `REACT_APP_API_URL=http://localhost:8080/api`
3. Reiniciar React: `npm start`

### Error: "404 Not Found"

**Causa:** Categoría o Producto no existe
**Solución:**
```bash
# Ver datos existentes
curl http://localhost:8080/api/categories
curl http://localhost:8080/api/products
```

### Error: "Categoría no encontrada" (400)

**Causa:** categoryId no existe
**Solución:**
```javascript
// Primero obtener IDs válidas
const categories = await getCategories();
const validCategoryId = categories[0].id;

// Luego usar en producto
await createProduct({
  categoryId: validCategoryId,
  // ... otros campos
});
```

### Error: "Validación fallida" (400)

**Causa:** Falta algún campo o datos inválidos
**Solución:** Revisar errores en respuesta:
```javascript
try {
  await createProduct(data);
} catch (err) {
  console.log(err.errores); // Ver errores por campo
}
```

---

## 🔧 Modificaciones Comunes

### Cambiar puertos

**Backend** - `backend/src/main/resources/application.properties`:
```properties
server.port=8081
```

**Frontend** - Crear `.env.development`:
```
REACT_APP_API_URL=http://localhost:8081/api
```

### Habilitar H2 Console

Ya está habilitada. Acceder en:
```
http://localhost:8080/h2-console
```

### Agregar más validaciones

En DTOs (ej: `CreateProductDTO.java`):
```java
@NotBlank(message = "El nombre es requerido")
@Size(min = 3, max = 100, message = "Entre 3 y 100 caracteres")
private String name;
```

### Cambiar datos iniciales

Editar `DataLoader.java`:
```java
Category cat = new Category();
cat.setName("Mi Categoría");
categoryRepository.save(cat);

Product prod = new Product();
prod.setName("Mi Producto");
prod.setPrice(99.99);
prod.setCategory(cat);
productRepository.save(prod);
```

---

## 📚 Archivos de Referencia

```
CRUD_API.md              → Especificación completa de endpoints
REACT_CRUD_GUIDE.md      → Guía detallada de componentes
SETUP.md                 → Setup inicial del proyecto
backend/HELP.md          → Ayuda del backend
backend/pom.xml          → Dependencias Maven
frontend/package.json    → Dependencias npm
```

---

## 🎓 Próximos Pasos (Opcionales)

### 1. Agregar Autenticación

```java
// Agregar dependencia
spring-boot-starter-security
spring-boot-starter-oauth2-resource-server

// En SecurityConfig.java
@Configuration
@EnableWebSecurity
public class SecurityConfig { }
```

### 2. Agregar Paginación

```java
// En ProductController.java
@GetMapping
public Page<Product> getAll(Pageable pageable) {
  return productRepository.findAll(pageable);
}
```

### 3. Agregar búsqueda/filtrado

```java
// En ProductRepository.java
Page<Product> findByNameContaining(String name, Pageable pageable);
```

### 4. Agregar timestamps

```java
@Entity
public class Product {
  @CreationTimestamp
  private LocalDateTime createdAt;
  
  @UpdateTimestamp
  private LocalDateTime updatedAt;
}
```

---

## 📞 Soporte Rápido

| Problema | Comando | Archivo |
|----------|---------|---------|
| Backend no compila | `mvnw clean compile` | `backend/pom.xml` |
| Frontend error | `npm install` | `frontend/package.json` |
| Ver logs backend | `mvnw spring-boot:run` | `application.properties` |
| Resetear DB | Reiniciar backend | (H2 en memoria) |
| Test de API | `./test-crud.ps1` | `backend/test-crud.ps1` |

---

## 🎉 ¡Listo!

Ahora tienes un sistema CRUD completo y funcional:

- ✅ Backend REST con Spring Boot
- ✅ Frontend React con componentes reutilizables
- ✅ Admin Dashboard profesional
- ✅ Validaciones en ambos lados
- ✅ Manejo de errores centralizado
- ✅ CORS configurado
- ✅ Base de datos H2
- ✅ Test automation scripts

**Tiempo de implementación:** ~2 horas
**Complejidad:** Media
**Escalabilidad:** Alta

**¡A disfrutar desarrollando!** 🌱
