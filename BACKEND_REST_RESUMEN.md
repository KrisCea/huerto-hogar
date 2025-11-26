# 📦 Backend REST CSR - Resumen de Implementación

## ✅ Qué se ha Creado

### 1. **Arquitectura REST**
- ✅ Controller REST para Productos (`/api/products`)
- ✅ Controller REST para Categorías (`/api/categories`)
- ✅ Spring Data JPA con H2 In-Memory Database
- ✅ Configuración CORS global

### 2. **Modelos y Persistencia**
```
├── model/
│   ├── Category.java        ← Entidad Categoría
│   └── Product.java         ← Entidad Producto
├── repository/
│   ├── CategoryRepository.java
│   └── ProductRepository.java
└── controller/
    ├── CategoryController.java
    └── ProductController.java
```

### 3. **Configuración**
- ✅ CORS habilitado para `http://localhost:3000`
- ✅ H2 Console en `/h2-console`
- ✅ DataLoader con 3 productos de ejemplo
- ✅ Base de datos en memoria (desarrollo)

### 4. **Documentación**
- ✅ `INTEGRACION_FRONTEND_BACKEND.md` - Guía de integración
- ✅ `frontend/.env.development` - Variables de entorno
- ✅ Swagger UI disponible en `/swagger-ui.html`

### 5. **Servicios Frontend**
- ✅ `apiService.js` - Servicio de llamadas HTTP
- ✅ `ExamplesAPIREST.jsx` - Componentes de ejemplo

---

## 🚀 Cómo Usar

### Backend
```bash
cd backend

# Compilar
./mvnw clean package -DskipTests

# Ejecutar
java -jar target/huerto-hogar-web-0.0.1-SNAPSHOT.jar
```
Backend en: `http://localhost:8080`

### Frontend
```bash
cd frontend

npm install        # Si es necesario
npm start          # Inicia en http://localhost:3000
```

---

## 📊 Endpoints Disponibles

### Públicos (sin autenticación)
| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/v1/products` | GET | Lista todos los productos |
| `/api/v1/products/{id}` | GET | Obtiene un producto por ID |
| `/api/v1/categories` | GET | Lista todas las categorías |
| `/api/v1/auth/register` | POST | Registrar nuevo usuario |
| `/api/v1/auth/login` | POST | Iniciar sesión |

### Autenticados
| Endpoint | Método | Descripción | Roles |
|----------|--------|-------------|-------|
| `/api/v1/orders` | POST | Crear orden | Todos autenticados |
| `/api/v1/vendedor/products` | GET | Ver productos | ADMIN, VENDEDOR |
| `/api/v1/vendedor/orders` | GET | Ver órdenes | ADMIN, VENDEDOR |
| `/api/v1/admin/products` | GET/POST/PUT/DELETE | CRUD productos | ADMIN |

---

## 📝 Ejemplo de Respuesta

### GET `/api/products`
```json
[
  {
    "id": 1,
    "name": "Tomate",
    "description": "Tomate fresco",
    "price": 1.25,
    "imageUrl": "/images/products/tomate.jpg",
    "category": {
      "id": 1,
      "name": "Verduras"
    }
  },
  ...
]
```

---

## 💻 Consumir API desde React

### Usando el servicio
```javascript
import { getProducts } from '../services/apiService';

useEffect(() => {
  getProducts()
    .then(data => setProducts(data))
    .catch(err => console.error(err));
}, []);
```

### Usando fetch directamente
```javascript
fetch('http://localhost:8080/api/products')
  .then(res => res.json())
  .then(data => setProducts(data));
```

---

## 🔒 Seguridad (CORS y JWT)

✅ Configurado en `SecurityConfig.java`

- CORS habilitado para `http://localhost:3000`
- Autenticación JWT implementada
- Control de roles: ADMIN, VENDEDOR, CLIENTE
- Endpoints protegidos según roles

---

## 📦 Dependencias Backend

```xml
<!-- Spring Boot Starters -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- H2 Database -->
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

---

## 📚 Archivos Clave

### Backend
- `backend/pom.xml` - Dependencias Maven
- `backend/src/main/resources/application.properties` - Configuración
- Swagger UI: `http://localhost:8080/swagger-ui.html` - Documentación interactiva

### Frontend
- `frontend/src/services/apiService.js` - Servicio de API
- `frontend/src/components/ExamplesAPIREST.jsx` - Ejemplos
- `frontend/.env.development` - Variables de entorno

### Raíz
- `INTEGRACION_FRONTEND_BACKEND.md` - Guía de integración

---

## ✅ Características Implementadas

- ✅ Autenticación JWT
- ✅ Endpoints CRUD completos
- ✅ Control de roles (ADMIN, VENDEDOR, CLIENTE)
- ✅ Swagger/OpenAPI documentación
- ✅ Capa de servicios
- ✅ Validación de datos
- ✅ Base de datos configurada (H2/MySQL)

---

## 🆘 Verificación Rápida

```bash
# ¿Backend corriendo?
curl http://localhost:8080/api/products

# ¿Frontend corriendo?
curl http://localhost:3000

# ¿CORS funcionando?
Abre DevTools (F12) → Network → Verifica requests a /api/*
```

---

**¡Backend REST CSR completamente configurado y listo para usar!** 🎉

