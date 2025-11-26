# 📚 Documentación de APIs
## HuertoHogar - API REST v1

---

**Versión API:** v1  
**Base URL:** `http://localhost:8080/api/v1`  
**Formato:** JSON  
**Autenticación:** JWT Bearer Token  
**Documentación Interactiva:** `http://localhost:8080/swagger-ui.html`

---

## ÍNDICE

1. [Introducción](#1-introducción)
2. [Autenticación](#2-autenticación)
3. [Endpoints Públicos](#3-endpoints-públicos)
4. [Endpoints Autenticados](#4-endpoints-autenticados)
5. [Endpoints por Rol](#5-endpoints-por-rol)
6. [Modelos de Datos](#6-modelos-de-datos)
7. [Códigos de Estado HTTP](#7-códigos-de-estado-http)
8. [Manejo de Errores](#8-manejo-de-errores)

---

## 1. INTRODUCCIÓN

### 1.1 Descripción General
La API REST de HuertoHogar proporciona endpoints para gestionar productos, categorías, órdenes y usuarios. La API sigue los principios REST y utiliza JSON para el intercambio de datos.

### 1.2 Versionado
La API está versionada usando el prefijo `/api/v1/` en todas las rutas.

### 1.3 Formato de Respuesta
Todas las respuestas están en formato JSON con codificación UTF-8.

### 1.4 Autenticación
La mayoría de los endpoints requieren autenticación mediante JWT (JSON Web Token). El token debe enviarse en el header `Authorization` con el formato:
```
Authorization: Bearer <token>
```

---

## 2. AUTENTICACIÓN

### 2.1 Registrar Usuario

**Endpoint:** `POST /api/v1/auth/register`

**Descripción:** Registra un nuevo usuario en el sistema.

**Autenticación:** No requerida

**Request Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123",
  "role": "CLIENTE"
}
```

**Campos:**
- `name` (string, requerido): Nombre completo del usuario
- `email` (string, requerido, único): Email del usuario
- `password` (string, requerido, mínimo 6 caracteres): Contraseña
- `role` (enum, opcional): Rol del usuario. Valores: `ADMIN`, `VENDEDOR`, `CLIENTE`. Por defecto: `CLIENTE`

**Response 201 Created:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "juan@example.com",
    "name": "Juan Pérez",
    "role": "CLIENTE"
  }
}
```

**Errores:**
- `400 Bad Request`: Validación fallida o email ya registrado
- `500 Internal Server Error`: Error del servidor

---

### 2.2 Iniciar Sesión

**Endpoint:** `POST /api/v1/auth/login`

**Descripción:** Autentica un usuario y devuelve un token JWT.

**Autenticación:** No requerida

**Request Body:**
```json
{
  "email": "juan@example.com",
  "password": "password123"
}
```

**Campos:**
- `email` (string, requerido): Email del usuario
- `password` (string, requerido): Contraseña del usuario

**Response 200 OK:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "juan@example.com",
    "name": "Juan Pérez",
    "role": "CLIENTE"
  }
}
```

**Errores:**
- `400 Bad Request`: Credenciales inválidas
- `401 Unauthorized`: Usuario no encontrado o contraseña incorrecta

**Ejemplo cURL:**
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@huertohogar.com",
    "password": "admin123"
  }'
```

---

## 3. ENDPOINTS PÚBLICOS

### 3.1 Listar Productos

**Endpoint:** `GET /api/v1/products`

**Descripción:** Obtiene la lista de todos los productos disponibles.

**Autenticación:** No requerida

**Query Parameters:** Ninguno

**Response 200 OK:**
```json
[
  {
    "id": 1,
    "name": "Tomate",
    "description": "Tomate fresco orgánico",
    "price": 1.25,
    "imageUrl": "/images/products/tomates.jpg",
    "category": {
      "id": 1,
      "name": "Verduras"
    }
  },
  {
    "id": 2,
    "name": "Lechuga",
    "description": "Lechuga natural",
    "price": 0.99,
    "imageUrl": "/images/products/lechugas.jpg",
    "category": {
      "id": 1,
      "name": "Verduras"
    }
  }
]
```

**Ejemplo cURL:**
```bash
curl http://localhost:8080/api/v1/products
```

---

### 3.2 Obtener Producto por ID

**Endpoint:** `GET /api/v1/products/{id}`

**Descripción:** Obtiene los detalles de un producto específico.

**Autenticación:** No requerida

**Path Parameters:**
- `id` (long, requerido): ID del producto

**Response 200 OK:**
```json
{
  "id": 1,
  "name": "Tomate",
  "description": "Tomate fresco orgánico",
  "price": 1.25,
  "imageUrl": "/images/products/tomates.jpg",
  "category": {
    "id": 1,
    "name": "Verduras"
  }
}
```

**Errores:**
- `404 Not Found`: Producto no encontrado

**Ejemplo cURL:**
```bash
curl http://localhost:8080/api/v1/products/1
```

---

### 3.3 Listar Categorías

**Endpoint:** `GET /api/v1/categories`

**Descripción:** Obtiene la lista de todas las categorías.

**Autenticación:** No requerida

**Response 200 OK:**
```json
[
  {
    "id": 1,
    "name": "Verduras"
  },
  {
    "id": 2,
    "name": "Frutas"
  },
  {
    "id": 3,
    "name": "Lácteos"
  }
]
```

---

### 3.4 Obtener Categoría por ID

**Endpoint:** `GET /api/v1/categories/{id}`

**Descripción:** Obtiene los detalles de una categoría específica.

**Autenticación:** No requerida

**Path Parameters:**
- `id` (long, requerido): ID de la categoría

**Response 200 OK:**
```json
{
  "id": 1,
  "name": "Verduras"
}
```

**Errores:**
- `404 Not Found`: Categoría no encontrada

---

## 4. ENDPOINTS AUTENTICADOS

### 4.1 Crear Orden

**Endpoint:** `POST /api/v1/orders`

**Descripción:** Crea una nueva orden de compra.

**Autenticación:** Requerida (cualquier usuario autenticado)

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "nombre": "Juan",
  "apellidos": "Pérez",
  "correo": "juan@example.com",
  "calle": "Calle Principal 123",
  "departamento": "Depto 4B",
  "region": "Región Metropolitana",
  "comuna": "Santiago",
  "indicaciones": "Dejar en recepción",
  "total": 150.50,
  "items": [
    {
      "id": 1,
      "name": "Tomate",
      "quantity": 2,
      "price": 1.25
    }
  ]
}
```

**Campos:**
- `nombre` (string, requerido): Nombre del cliente
- `apellidos` (string, requerido): Apellidos del cliente
- `correo` (string, requerido): Email del cliente
- `calle` (string, requerido): Dirección de envío
- `departamento` (string, opcional): Departamento o número
- `region` (string, requerido): Región
- `comuna` (string, requerido): Comuna
- `indicaciones` (string, opcional): Indicaciones adicionales
- `total` (decimal, opcional): Total de la orden
- `items` (array, opcional): Lista de productos

**Response 201 Created:**
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellidos": "Pérez",
  "correo": "juan@example.com",
  "calle": "Calle Principal 123",
  "departamento": "Depto 4B",
  "region": "Región Metropolitana",
  "comuna": "Santiago",
  "indicaciones": "Dejar en recepción",
  "total": 150.50,
  "codigo": "ORD1734567890",
  "estado": "confirmado",
  "fecha": "2024-01-15T10:30:00",
  "itemsJson": "[{\"id\":1,\"name\":\"Tomate\",\"quantity\":2,\"price\":1.25}]"
}
```

**Errores:**
- `401 Unauthorized`: Token inválido o expirado
- `400 Bad Request`: Datos inválidos

**Ejemplo cURL:**
```bash
curl -X POST http://localhost:8080/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
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

---

## 5. ENDPOINTS POR ROL

### 5.1 Endpoints de Vendedor

**Rol requerido:** `VENDEDOR` o `ADMIN`

#### 5.1.1 Listar Productos (Vendedor)

**Endpoint:** `GET /api/v1/vendedor/products`

**Descripción:** Lista todos los productos (vista de vendedor).

**Autenticación:** Requerida (VENDEDOR o ADMIN)

**Response 200 OK:**
```json
[
  {
    "id": 1,
    "name": "Tomate",
    "description": "Tomate fresco orgánico",
    "price": 1.25,
    "imageUrl": "/images/products/tomates.jpg",
    "category": {
      "id": 1,
      "name": "Verduras"
    }
  }
]
```

#### 5.1.2 Ver Detalle de Producto (Vendedor)

**Endpoint:** `GET /api/v1/vendedor/products/{id}`

**Descripción:** Obtiene el detalle de un producto.

**Autenticación:** Requerida (VENDEDOR o ADMIN)

#### 5.1.3 Listar Órdenes (Vendedor)

**Endpoint:** `GET /api/v1/vendedor/orders`

**Descripción:** Lista todas las órdenes del sistema.

**Autenticación:** Requerida (VENDEDOR o ADMIN)

**Response 200 OK:**
```json
[
  {
    "id": 1,
    "nombre": "Juan",
    "apellidos": "Pérez",
    "correo": "juan@example.com",
    "total": 150.50,
    "codigo": "ORD1734567890",
    "estado": "confirmado",
    "fecha": "2024-01-15T10:30:00"
  }
]
```

#### 5.1.4 Ver Detalle de Orden (Vendedor)

**Endpoint:** `GET /api/v1/vendedor/orders/{id}`

**Descripción:** Obtiene el detalle completo de una orden.

**Autenticación:** Requerida (VENDEDOR o ADMIN)

---

### 5.2 Endpoints de Administrador

**Rol requerido:** `ADMIN`

#### 5.2.1 CRUD de Productos (Admin)

**Crear Producto:**
- **Endpoint:** `POST /api/v1/admin/products`
- **Request Body:**
```json
{
  "name": "Nuevo Producto",
  "description": "Descripción del producto",
  "price": 10.99,
  "imageUrl": "/images/products/nuevo.jpg",
  "categoryId": 1
}
```

**Actualizar Producto:**
- **Endpoint:** `PUT /api/v1/admin/products/{id}`
- **Request Body:** Mismo formato que crear

**Eliminar Producto:**
- **Endpoint:** `DELETE /api/v1/admin/products/{id}`
- **Response:** `204 No Content`

#### 5.2.2 Ver Órdenes (Admin)

**Endpoint:** `GET /api/v1/admin/orders`

**Descripción:** Lista todas las órdenes del sistema (vista de administrador).

**Autenticación:** Requerida (solo ADMIN)

---

## 6. MODELOS DE DATOS

### 6.1 Producto

```json
{
  "id": 1,
  "name": "Tomate",
  "description": "Tomate fresco orgánico",
  "price": 1.25,
  "imageUrl": "/images/products/tomates.jpg",
  "category": {
    "id": 1,
    "name": "Verduras"
  }
}
```

**Campos:**
- `id` (long): Identificador único
- `name` (string): Nombre del producto
- `description` (string): Descripción del producto
- `price` (decimal): Precio del producto
- `imageUrl` (string): URL de la imagen
- `category` (object): Categoría del producto

### 6.2 Categoría

```json
{
  "id": 1,
  "name": "Verduras"
}
```

**Campos:**
- `id` (long): Identificador único
- `name` (string): Nombre de la categoría

### 6.3 Orden

```json
{
  "id": 1,
  "nombre": "Juan",
  "apellidos": "Pérez",
  "correo": "juan@example.com",
  "calle": "Calle Principal 123",
  "departamento": "Depto 4B",
  "region": "Región Metropolitana",
  "comuna": "Santiago",
  "indicaciones": "Dejar en recepción",
  "total": 150.50,
  "codigo": "ORD1734567890",
  "estado": "confirmado",
  "fecha": "2024-01-15T10:30:00",
  "itemsJson": "[{...}]"
}
```

### 6.4 Usuario

```json
{
  "id": 1,
  "email": "juan@example.com",
  "name": "Juan Pérez",
  "role": "CLIENTE"
}
```

**Roles disponibles:**
- `ADMIN`: Administrador con acceso total
- `VENDEDOR`: Vendedor con acceso a productos y órdenes
- `CLIENTE`: Cliente con acceso solo a la tienda

---

## 7. CÓDIGOS DE ESTADO HTTP

| Código | Significado | Descripción |
|--------|-------------|-------------|
| `200` | OK | Solicitud exitosa |
| `201` | Created | Recurso creado exitosamente |
| `204` | No Content | Operación exitosa sin contenido |
| `400` | Bad Request | Solicitud inválida o datos incorrectos |
| `401` | Unauthorized | No autenticado o token inválido |
| `403` | Forbidden | No tiene permisos para acceder |
| `404` | Not Found | Recurso no encontrado |
| `500` | Internal Server Error | Error del servidor |

---

## 8. MANEJO DE ERRORES

### 8.1 Formato de Error

Todas las respuestas de error siguen este formato:

```json
{
  "estado": "error",
  "mensaje": "Descripción del error",
  "timestamp": 1734567890000,
  "errores": {
    "campo": "Mensaje de error específico del campo"
  }
}
```

### 8.2 Ejemplos de Errores

**Error de validación (400):**
```json
{
  "estado": "error",
  "mensaje": "Error de validación",
  "errores": {
    "name": "El nombre del producto no puede estar vacío",
    "price": "El precio debe ser mayor a 0"
  },
  "timestamp": 1734567890000
}
```

**Recurso no encontrado (404):**
```json
{
  "estado": "error",
  "mensaje": "Producto con ID 999 no encontrado",
  "timestamp": 1734567890000
}
```

**No autorizado (401):**
```json
{
  "estado": "error",
  "mensaje": "Token inválido o expirado",
  "timestamp": 1734567890000
}
```

**Sin permisos (403):**
```json
{
  "estado": "error",
  "mensaje": "No tiene permisos para acceder a este recurso",
  "timestamp": 1734567890000
}
```

---

## 9. EJEMPLOS DE USO COMPLETOS

### 9.1 Flujo Completo: Registro → Login → Crear Orden

```bash
# 1. Registrar usuario
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123"
  }'

# Respuesta contiene el token
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# 2. Listar productos
curl http://localhost:8080/api/v1/products

# 3. Crear orden (usando el token)
curl -X POST http://localhost:8080/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
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

### 9.2 Flujo Administrador: Gestionar Productos

```bash
# 1. Login como admin
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@huertohogar.com",
    "password": "admin123"
  }'

TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# 2. Crear producto
curl -X POST http://localhost:8080/api/v1/admin/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Nuevo Producto",
    "description": "Descripción",
    "price": 10.99,
    "imageUrl": "/images/products/nuevo.jpg",
    "categoryId": 1
  }'

# 3. Actualizar producto
curl -X PUT http://localhost:8080/api/v1/admin/products/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Producto Actualizado",
    "description": "Nueva descripción",
    "price": 12.99,
    "imageUrl": "/images/products/actualizado.jpg",
    "categoryId": 1
  }'

# 4. Eliminar producto
curl -X DELETE http://localhost:8080/api/v1/admin/products/1 \
  -H "Authorization: Bearer $TOKEN"
```

---

## 10. SWAGGER UI

Para documentación interactiva y pruebas en tiempo real, accede a:

**URL:** `http://localhost:8080/swagger-ui.html`

Swagger UI permite:
- Ver todos los endpoints disponibles
- Probar endpoints directamente desde el navegador
- Ver esquemas de datos
- Autenticarse y usar el token en las pruebas

---

**Documentación de APIs - Versión 1.0**

