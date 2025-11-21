# 🌱 Huerto Hogar - Sistema CRUD Completo

> Sistema de gestión de productos y categorías con Spring Boot + React

## 📋 Índice Rápido

- [Inicio Rápido](#-inicio-rápido) - Empieza en 5 minutos
- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Documentación Completa](#-documentación-completa)
- [Troubleshooting](#-troubleshooting)

---

## 🚀 Inicio Rápido

### Requisitos

- **Backend**: Java 21, Maven 3.9+
- **Frontend**: Node.js 16+, npm 8+
- **Docker** (opcional): para ejecutar en contenedores

### 1️⃣ Ejecutar Backend

```bash
cd backend
./mvnw spring-boot:run
# 🎉 Backend disponible en: http://localhost:8080
```

### 2️⃣ Ejecutar Frontend

```bash
cd frontend
npm install
npm start
# 🎉 Frontend disponible en: http://localhost:3000
```

### 3️⃣ Ver Admin Dashboard

Visita http://localhost:3000 para acceder al panel de administración con interfaz completa de CRUD.

---

## ✨ Características

### ✅ Backend (Spring Boot)

- **REST API** con 10 endpoints CRUD
  - 5 endpoints para Productos
  - 5 endpoints para Categorías
- **Validaciones** con Jakarta Validation
- **Manejo de Errores** centralizado
- **CORS** configurado para frontend
- **Base de Datos** H2 en memoria
- **Datos de Prueba** cargados automáticamente

### ✅ Frontend (React)

- **Admin Dashboard** profesional y responsivo
- **5 Componentes CRUD** reutilizables
- **11 Métodos de API** en servicio centralizado
- **Estilos** modernos con CSS gradiente
- **Validaciones** en tiempo real
- **Manejo de Errores** con mensajes en español

### ✅ DevOps

- **Docker Compose** para orquestación
- **Test Scripts** (PowerShell + Bash)
- **Health Check** automático
- **Documentación** completa

---

## 📁 Estructura del Proyecto

```
huerto-hogar/
│
├── 📂 backend/                                    # Spring Boot API
│   ├── src/main/java/com/huertohogar/
│   │   ├── HuertoHogarWebApplication.java         # Entry point
│   │   ├── 📂 model/
│   │   │   ├── Product.java                       # Entity
│   │   │   └── Category.java                      # Entity
│   │   ├── 📂 repository/
│   │   │   ├── ProductRepository.java             # JPA DAO
│   │   │   └── CategoryRepository.java            # JPA DAO
│   │   ├── 📂 controller/
│   │   │   ├── ProductController.java             # REST endpoints (5)
│   │   │   └── CategoryController.java            # REST endpoints (5)
│   │   ├── 📂 dto/
│   │   │   ├── CreateProductDTO.java              # DTO con validaciones
│   │   │   └── CreateCategoryDTO.java             # DTO con validaciones
│   │   ├── 📂 exception/
│   │   │   ├── ResourceNotFoundException.java      # Custom exception
│   │   │   └── GlobalExceptionHandler.java        # Error handling
│   │   ├── 📂 config/
│   │   │   └── WebConfig.java                     # CORS config
│   │   └── 📂 util/
│   │       └── DataLoader.java                    # Test data
│   ├── pom.xml                                    # Dependencias Maven
│   ├── application.properties                     # Configuración H2
│   ├── Dockerfile
│   └── mvnw
│
├── 📂 frontend/                                   # React App
│   ├── src/
│   │   ├── 📂 services/
│   │   │   └── apiService.js                      # 11 métodos CRUD
│   │   ├── 📂 components/
│   │   │   └── CRUDExamples.jsx                   # 5 componentes
│   │   ├── 📂 pages/
│   │   │   └── Admin/
│   │   │       ├── AdminDashboard.jsx             # Dashboard principal
│   │   │       └── AdminDashboard.css             # Estilos profesionales
│   │   ├── App.js                                 # App root
│   │   └── index.js
│   ├── public/
│   ├── package.json                               # Dependencias npm
│   ├── Dockerfile
│   └── .env.development                           # Variables de entorno
│
├── 📄 QUICK_START.md                              # ⭐ Guía rápida
├── 📄 REACT_CRUD_GUIDE.md                         # ⭐ Guía React completa
├── 📄 CRUD_API.md                                 # ⭐ Especificación API
├── 📄 README.md                                   # Este archivo
├── docker-compose.yml                             # Orquestación
├── health_check.py                                # Verificador de salud
├── test-crud.ps1                                  # Tests Windows
├── test-crud.sh                                   # Tests Linux/Mac
└── SETUP.md                                       # Setup inicial
```

---

## 📚 Documentación Completa

### Para Empezar

| Archivo | Descripción |
|---------|-------------|
| **QUICK_START.md** | ⭐ Guía de 5 minutos para empezar |
| **SETUP.md** | Instalación y configuración inicial |

### Para Desarrolladores

| Archivo | Descripción |
|---------|-------------|
| **REACT_CRUD_GUIDE.md** | Guía completa de componentes React |
| **CRUD_API.md** | Especificación técnica de endpoints |

### Herramientas

| Herramienta | Descripción |
|-------------|-------------|
| **health_check.py** | Verificador de salud del sistema |
| **test-crud.ps1** | Tests automáticos (Windows) |
| **test-crud.sh** | Tests automáticos (Linux/Mac) |

---

## 🔌 API Endpoints

### Productos

```
GET    /api/products              # Obtener todos los productos
GET    /api/products/:id          # Obtener producto por ID
POST   /api/products              # Crear nuevo producto (201)
PUT    /api/products/:id          # Actualizar producto (200)
DELETE /api/products/:id          # Eliminar producto (204)
```

### Categorías

```
GET    /api/categories            # Obtener todas las categorías
GET    /api/categories/:id        # Obtener categoría por ID
POST   /api/categories            # Crear nueva categoría (201)
PUT    /api/categories/:id        # Actualizar categoría (200)
DELETE /api/categories/:id        # Eliminar categoría (204)
```

### Ejemplo de Uso con cURL

```bash
# Crear producto
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tomate",
    "description": "Tomate fresco",
    "price": 25.50,
    "imageUrl": "https://example.com/tomate.jpg",
    "categoryId": 1
  }'

# Obtener todos
curl http://localhost:8080/api/products

# Actualizar
curl -X PUT http://localhost:8080/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Tomate Premium", ...}'

# Eliminar
curl -X DELETE http://localhost:8080/api/products/1
```

---

## 🎨 Componentes React

### AdminDashboard

Panel principal con interfaz completa:

```javascript
import AdminDashboard from './pages/Admin/AdminDashboard';

// En App.js
export default AdminDashboard;
```

**Características:**
- Tabla de productos con editar/eliminar
- Formulario para crear productos
- Gestión de categorías
- Interfaz responsiva

### Componentes Individuales

```javascript
import {
  ProductListCRUD,           // Listar productos
  CreateProductForm,         // Crear producto
  UpdateProductForm,         // Editar producto
  DeleteProductButton,       // Eliminar producto
  CategoriesCRUD,           // Gestionar categorías
} from './components/CRUDExamples';
```

---

## 🧪 Testing

### Opción 1: Health Check (Recomendado)

Verifica que todos los componentes estén funcionando:

```bash
python health_check.py
```

**Chequea:**
- ✅ Conectividad del backend
- ✅ Base de datos accesible
- ✅ Endpoints disponibles
- ✅ Integridad de datos
- ✅ Archivos del frontend

### Opción 2: Tests Automatizados

**En Windows (PowerShell):**
```bash
cd backend
./test-crud.ps1
```

**En Linux/Mac (Bash):**
```bash
cd backend
chmod +x test-crud.sh
./test-crud.sh
```

**Ejecuta 12 tests:**
- GET todos los productos
- GET producto por ID
- GET 404 (producto no encontrado)
- POST crear producto (200)
- POST validación fallida (400)
- PUT actualizar (200)
- DELETE eliminar (204)
- ... y más para categorías

---

## 📊 Estructura de Datos

### Producto

```json
{
  "id": 1,
  "name": "Tomate",
  "description": "Tomate orgánico fresco",
  "price": 25.50,
  "imageUrl": "https://example.com/tomate.jpg",
  "category": {
    "id": 1,
    "name": "Verduras"
  }
}
```

### Categoría

```json
{
  "id": 1,
  "name": "Verduras"
}
```

### Error Response

```json
{
  "estado": "ERROR",
  "mensaje": "Validación fallida",
  "timestamp": "2024-01-15T10:30:45",
  "errores": {
    "name": "no debe estar vacío",
    "price": "debe ser mayor que 0.01"
  }
}
```

---

## 🐳 Docker

### Ejecutar con Docker Compose

```bash
docker-compose up --build
```

**Servicios:**
- Backend: http://localhost:8080
- Frontend: http://localhost:3000
- H2 Console: http://localhost:8080/h2-console

### Construir imágenes individuales

```bash
# Backend
cd backend
docker build -t huerto-hogar-backend .

# Frontend
cd frontend
docker build -t huerto-hogar-frontend .
```

---

## ⚙️ Configuración

### Variables de Entorno (Frontend)

`.env.development`:
```
REACT_APP_API_URL=http://localhost:8080/api
```

### Propiedades de Aplicación (Backend)

`backend/src/main/resources/application.properties`:
```properties
server.port=8080
spring.datasource.url=jdbc:h2:mem:testdb
spring.h2.console.enabled=true
spring.jpa.hibernate.ddl-auto=create-drop
```

---

## 🐛 Troubleshooting

### El backend no inicia

**Error:** `Port 8080 already in use`

```bash
# Cambiar puerto en application.properties
server.port=8081

# O matar el proceso usando el puerto
netstat -ano | findstr :8080  # Windows
lsof -i :8080                 # Mac/Linux
```

### CORS Error en frontend

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solución:**
1. Verificar que backend está corriendo
2. Verificar `WebConfig.java` tiene CORS habilitado
3. Verificar `.env.development` tiene URL correcta

### La base de datos está vacía

**Causa:** DataLoader no cargó datos

**Solución:**
1. Revisar logs del backend
2. Reiniciar backend (H2 se recrea automáticamente)
3. Verificar `DataLoader.java` está siendo ejecutado

### Tests fallan

**Causa:** Backend no está corriendo

```bash
# En una terminal
cd backend
./mvnw spring-boot:run

# En otra terminal
./test-crud.ps1  # o test-crud.sh
```

---

## 📱 Casos de Uso

### Case 1: Admin Panel Completo

```javascript
import AdminDashboard from './pages/Admin/AdminDashboard';
export default AdminDashboard;
```

### Case 2: Integración en App Existente

```javascript
import { ProductListCRUD, CreateProductForm } from './components/CRUDExamples';

function MyApp() {
  return (
    <div>
      <h1>Mi Aplicación</h1>
      <CreateProductForm />
      <ProductListCRUD />
    </div>
  );
}
```

### Case 3: Llamadas API Directas

```javascript
import { getProducts, createProduct } from './services/apiService';

async function MyComponent() {
  const products = await getProducts();
  const newProduct = await createProduct({
    name: 'Nuevo',
    description: 'Descripción',
    price: 99.99,
    imageUrl: 'https://...',
    categoryId: 1
  });
}
```

---

## 🔐 Validaciones

### Del lado del servidor (Backend)

| Campo | Validación | Mensaje |
|-------|-----------|---------|
| `name` | No vacío | "no debe estar vacío" |
| `description` | No vacío | "no debe estar vacío" |
| `price` | > 0.01 | "debe ser mayor que 0.01" |
| `imageUrl` | No vacío | "no debe estar vacío" |
| `categoryId` | Debe existir | "Categoría no encontrada" |

### Del lado del cliente (Frontend)

HTML5 + validaciones personalizadas en componentes

---

## 📈 Roadmap Futuro

- [ ] Autenticación JWT
- [ ] Paginación y ordenamiento
- [ ] Búsqueda avanzada
- [ ] Filtros por categoría
- [ ] Timestamps (createdAt, updatedAt)
- [ ] Upload de imágenes
- [ ] Caché en frontend
- [ ] GraphQL endpoint

---

## 👥 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📞 Soporte

- 📖 Ver `QUICK_START.md` para inicio rápido
- 📚 Ver `REACT_CRUD_GUIDE.md` para guía de componentes
- 🔌 Ver `CRUD_API.md` para especificación de API
- 🐛 Ejecutar `health_check.py` para diagnosticar problemas

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

## 🙏 Agradecimientos

- Spring Boot por el framework
- React por la librería UI
- H2 por la base de datos
- Todos los contributores

---

**Última actualización:** Enero 2024
**Versión:** 1.0.0
**Estado:** ✅ Producción

---

## ⭐ Quick Links

- [📄 QUICK_START.md](./QUICK_START.md) - Empieza aquí
- [📚 REACT_CRUD_GUIDE.md](./REACT_CRUD_GUIDE.md) - Aprende React
- [🔌 CRUD_API.md](./CRUD_API.md) - Especificación API
- [🏥 health_check.py](./health_check.py) - Verificador de salud

---

**¡Espero que disfrutes usando Huerto Hogar!** 🌱✨
