# 🏡 HuertoHogar - E-commerce de Productos Orgánicos

Sistema completo de e-commerce con backend Spring Boot y frontend React, incluyendo autenticación JWT, control de roles y API REST documentada.

---

## 🚀 Inicio Rápido

### Prerrequisitos

- **Java 21** o superior
- **Node.js 16+** y npm
- **Maven** (incluido con `mvnw`)

### 1. Iniciar Backend

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

El backend estará disponible en: **http://localhost:8080**

### 2. Iniciar Frontend

```bash
cd frontend
npm install
npm start
```

El frontend estará disponible en: **http://localhost:3000**

---

## 🧪 Testing

### Probar API con cURL

#### 1. Registrar usuario
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "role": "CLIENTE"
  }'
```

#### 2. Iniciar sesión
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@huertohogar.com",
    "password": "admin123"
  }'
```

**Respuesta:** Obtendrás un `token` JWT. Guárdalo para las siguientes peticiones.

#### 3. Listar productos (público)
```bash
curl http://localhost:8080/api/v1/products
```

#### 4. Crear orden (requiere autenticación)
```bash
curl -X POST http://localhost:8080/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "nombre": "Juan",
    "apellidos": "Pérez",
    "correo": "juan@example.com",
    "calle": "Calle Principal 123",
    "region": "Región Metropolitana",
    "comuna": "Santiago",
    "total": 150.50
  }'
```

### Probar desde el navegador

1. **Swagger UI** (Documentación interactiva):
   - URL: http://localhost:8080/swagger-ui.html
   - Permite probar todos los endpoints directamente

2. **Frontend React**:
   - URL: http://localhost:3000
   - Navega por la aplicación y prueba las funcionalidades

---

## 👥 Usuarios de Prueba

El sistema incluye usuarios pre-configurados:

| Rol | Email | Password | Acceso |
|-----|-------|----------|--------|
| **Administrador** | `admin@huertohogar.com` | `admin123` | Acceso total al sistema |
| **Vendedor** | `vendedor@huertohogar.com` | `vendedor123` | Ver productos y órdenes |
| **Cliente** | `cliente@huertohogar.com` | `cliente123` | Solo tienda (público) |

---

## 📍 Endpoints Principales

### Públicos (sin autenticación)
- `GET /api/v1/products` - Listar productos
- `GET /api/v1/products/{id}` - Ver producto
- `GET /api/v1/categories` - Listar categorías
- `POST /api/v1/auth/register` - Registrar usuario
- `POST /api/v1/auth/login` - Iniciar sesión

### Autenticados
- `POST /api/v1/orders` - Crear orden (cualquier usuario autenticado)

### Vendedor (ADMIN o VENDEDOR)
- `GET /api/v1/vendedor/products` - Ver productos
- `GET /api/v1/vendedor/orders` - Ver órdenes

### Administrador (solo ADMIN)
- `GET /api/v1/admin/products` - CRUD completo de productos
- `GET /api/v1/admin/orders` - Ver todas las órdenes

---

## 🔧 Configuración

### Base de Datos

Por defecto usa **H2** (in-memory) para desarrollo. Para cambiar a **MySQL**:

1. Edita `backend/src/main/resources/application.properties`
2. Descomenta la configuración MySQL
3. Comenta la configuración H2
4. Ajusta credenciales según tu base de datos

### Variables de Entorno Frontend

El frontend usa `http://localhost:8080/api/v1` por defecto. Para cambiar:

1. Crea `.env` en `frontend/`
2. Agrega: `REACT_APP_API_URL=http://tu-backend:8080/api/v1`

---

## 📚 Documentación

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **Documentación Backend**: Ver `BACKEND_REST_RESUMEN.md`
- **Guía de Integración**: Ver `INTEGRACION_FRONTEND_BACKEND.md`
- **Índice Completo**: Ver `DOCUMENTACION_INDICE.md`

---

## 🐛 Solución de Problemas

### Backend no inicia
```bash
# Verificar Java
java -version  # Debe ser 21+

# Limpiar y recompilar
cd backend
./mvnw clean install
```

### Frontend no inicia
```bash
# Limpiar node_modules
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Error CORS
- Verifica que el backend esté en `http://localhost:8080`
- Verifica que el frontend esté en `http://localhost:3000`
- Revisa `SecurityConfig.java` si necesitas cambiar orígenes

### Error de autenticación
- Verifica que el token JWT esté en el header: `Authorization: Bearer <token>`
- Verifica que el token no haya expirado (24 horas por defecto)

---

## 🏗️ Estructura del Proyecto

```
huerto-hogar-1/
├── backend/              # Spring Boot API
│   ├── src/main/java/   # Código fuente
│   └── pom.xml          # Dependencias Maven
├── frontend/            # React App
│   ├── src/            # Código fuente
│   └── package.json    # Dependencias npm
└── README.md           # Este archivo
```

---

## ✅ Verificación Rápida

```bash
# 1. Verificar backend
curl http://localhost:8080/api/v1/products

# 2. Verificar frontend
curl http://localhost:3000

# 3. Verificar Swagger
# Abre: http://localhost:8080/swagger-ui.html
```

---

## 🎯 Características Implementadas

- ✅ API REST con versionado (`/api/v1/...`)
- ✅ Autenticación JWT
- ✅ Control de roles (ADMIN, VENDEDOR, CLIENTE)
- ✅ Swagger/OpenAPI documentación
- ✅ CRUD completo de productos y categorías
- ✅ Gestión de órdenes
- ✅ CORS configurado
- ✅ Validación de datos
- ✅ Manejo de errores centralizado

---

## 📞 Soporte

Para más información, consulta:
- `BACKEND_REST_RESUMEN.md` - Resumen del backend
- `INTEGRACION_FRONTEND_BACKEND.md` - Guía de integración
- Swagger UI - Documentación interactiva

---

**¡Listo para usar!** 🚀
