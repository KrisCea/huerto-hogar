# 🎯 Quick Reference - Backend REST CSR

## 🚀 Comandos Esenciales

### Backend
```bash
# Compilar
cd backend
./mvnw clean package -DskipTests

# Ejecutar
java -jar target/huerto-hogar-web-0.0.1-SNAPSHOT.jar
# O con Maven:
./mvnw spring-boot:run

# Backend en: http://localhost:8080
```

### Frontend
```bash
cd frontend
npm start
# Frontend en: http://localhost:3000
```

### Pruebas
```bash
# Listar productos
curl http://localhost:8080/api/products

# Obtener producto #1
curl http://localhost:8080/api/products/1

# Listar categorías
curl http://localhost:8080/api/categories

# H2 Console
# Abre en navegador: http://localhost:8080/h2-console
# User: sa | Pass: (vacío)
```

---

## 📍 Endpoints

| URL | Método | Respuesta |
|-----|--------|----------|
| `/api/products` | GET | `List<Product>` JSON |
| `/api/products/{id}` | GET | `Product` JSON o 404 |
| `/api/categories` | GET | `List<Category>` JSON |

---

## 📦 Estructura Clave

```
backend/src/main/java/com/huertohogar/huerto_hogar_web/
├── model/
│   ├── Product.java      → Entidad DB
│   └── Category.java     → Entidad DB
├── repository/
│   ├── ProductRepository.java   → DAO
│   └── CategoryRepository.java  → DAO
├── controller/
│   ├── ProductController.java   → GET /api/products
│   └── CategoryController.java  → GET /api/categories
├── config/
│   └── WebConfig.java    → CORS
└── DataLoader.java       → Datos de prueba

frontend/src/
├── services/
│   └── apiService.js     → Llamadas HTTP
└── components/
    └── ExamplesAPIREST.jsx → Ejemplos React
```

---

## 💻 Consumir desde React

```javascript
// 1. Importar servicio
import { getProducts, getProductById, getCategories } from '../services/apiService';

// 2. En un componente con hook
useEffect(() => {
  getProducts()
    .then(data => setProducts(data))
    .catch(err => console.error(err));
}, []);

// 3. Mostrar datos
{products.map(p => (
  <div key={p.id}>
    <h3>{p.name}</h3>
    <p>${p.price}</p>
  </div>
))}
```

---

## 🔒 CORS

✅ Configurado en `backend/src/main/java/com/huertohogar/huerto_hogar_web/config/WebConfig.java`

Permite:
- Origen: `http://localhost:3000`
- Métodos: GET, POST, PUT, DELETE, OPTIONS

---

## 🗄️ Base de Datos (H2)

```properties
# En application.properties
jdbc:h2:mem:huertohogar  # Base de datos en memoria
User: sa
Password: (vacío)
```

### Schema
```sql
-- Auto-creado por Hibernate
CREATE TABLE category (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255)
);

CREATE TABLE product (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  description VARCHAR(255),
  price NUMERIC(38,2),
  image_url VARCHAR(255),
  category_id BIGINT FOREIGN KEY
);
```

---

## 📊 Respuesta Ejemplo

### GET /api/products
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
  }
]
```

---

## 🔧 Cambiar Configuración

### Puerto Backend (default: 8080)
```properties
# application.properties
server.port=9000
```

### Origen CORS permitido
```java
// WebConfig.java
.allowedOrigins("http://localhost:3000", "http://tu-app.com")
```

### DDL Mode (default: create)
```properties
# application.properties
spring.jpa.hibernate.ddl-auto=update  # Mantener datos
spring.jpa.hibernate.ddl-auto=validate  # Producción
```

---

## 🧠 Flujo de Datos

```
React Component
       ↓
  fetch() / axios
       ↓
  HTTP GET request
       ↓
Spring Boot Controller
       ↓
  Repository (JPA)
       ↓
  H2 Database
       ↓
  SQL Query
       ↓
  Resultados → JSON
       ↓
React state
```

---

## ⚡ Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `pom.xml` | Dependencias Maven |
| `application.properties` | Configuración Spring |
| `*Controller.java` | Endpoints REST |
| `*Repository.java` | Acceso a datos |
| `*Model.java` | Entidades JPA |
| `WebConfig.java` | Configuración CORS |
| `apiService.js` | Llamadas HTTP desde React |

---

## 🐛 Errores Comunes

| Error | Solución |
|-------|----------|
| `Connection refused` | Backend no está corriendo |
| `CORS blocked` | Revisar `WebConfig.java` |
| `404 Not Found` | Revisar URL del endpoint |
| `Port 8080 already in use` | Cambiar puerto en properties |
| `NullPointerException` | Verificar inyección de dependencias |

---

## 📚 Documentación Completa

- **REST_API.md** - Documentación API detallada
- **INTEGRACION_FRONTEND_BACKEND.md** - Guía de integración
- **EXTENSIONES_AVANZADAS.md** - JWT, paginación, búsqueda
- **ESTRUCTURA_CODIGO_JAVA.md** - Análisis de código
- **VERIFICACION_CHECKLIST.md** - Checklist de pruebas
- **DOCUMENTACION_INDICE.md** - Índice de toda la documentación

---

## ✅ Quick Checklist

- [ ] Backend compila: `./mvnw clean package -DskipTests`
- [ ] Backend arranca: `java -jar target/...jar`
- [ ] API responde: `curl http://localhost:8080/api/products`
- [ ] Frontend inicia: `npm start`
- [ ] CORS funciona: Sin errores en DevTools
- [ ] Datos se cargan: Elementos visibles en componentes React

---

## 🎯 Próximas Extensiones

1. **Autenticación JWT** → `EXTENSIONES_AVANZADAS.md`
2. **Validación de datos** → `@Valid`, validators
3. **Paginación** → `Pageable`, `Page<T>`
4. **Búsqueda/Filtros** → Custom @Query
5. **CRUD Completo** → POST, PUT, DELETE

---

## 📞 Variables de Entorno

### .env.development (Frontend)
```bash
REACT_APP_API_URL=http://localhost:8080/api
```

### application.properties (Backend)
```properties
server.port=8080
spring.datasource.url=jdbc:h2:mem:huertohogar
spring.h2.console.enabled=true
```

---

## 🚀 Deployment (Futuro)

1. **Base de datos persistente**: Cambiar H2 a PostgreSQL/MySQL
2. **Autenticación**: Agregar JWT
3. **Validación**: Agregar constraints
4. **Testing**: Unit tests, integration tests
5. **CI/CD**: GitHub Actions, Docker
6. **Producción**: Cambiar `ddl-auto=validate`

---

**¡Todo lo que necesitas saber en una página!** 📄

Última actualización: Noviembre 11, 2025

