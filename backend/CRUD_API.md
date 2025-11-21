# 🔄 CRUD REST API Completo - HuertoHogar Backend

## Descripción

Se ha implementado un **CRUD completo (Create, Read, Update, Delete)** para Productos y Categorías con validación integrada.

---

## 📍 Endpoints Completos

### PRODUCTOS

#### GET - Listar todos
```http
GET /api/products
```

**Respuesta (200):**
```json
[
  {
    "id": 1,
    "name": "Tomate",
    "description": "Tomate fresco",
    "price": 1.25,
    "imageUrl": "/images/products/tomate.jpg",
    "category": {"id": 1, "name": "Verduras"}
  }
]
```

#### GET - Obtener uno
```http
GET /api/products/{id}
```

**Ejemplo:**
```http
GET /api/products/1
```

**Respuesta (200):**
```json
{
  "id": 1,
  "name": "Tomate",
  "description": "Tomate fresco",
  "price": 1.25,
  "imageUrl": "/images/products/tomate.jpg",
  "category": {"id": 1, "name": "Verduras"}
}
```

**Error (404):**
```json
{
  "estado": "error",
  "mensaje": "Producto con ID 999 no encontrado",
  "timestamp": 1699750065000
}
```

#### POST - Crear
```http
POST /api/products
Content-Type: application/json

{
  "name": "Pepino",
  "description": "Pepino fresco",
  "price": 1.99,
  "imageUrl": "/images/products/pepino.jpg",
  "categoryId": 1
}
```

**Respuesta (201):**
```json
{
  "id": 4,
  "name": "Pepino",
  "description": "Pepino fresco",
  "price": 1.99,
  "imageUrl": "/images/products/pepino.jpg",
  "category": {"id": 1, "name": "Verduras"}
}
```

**Error de validación (400):**
```json
{
  "estado": "error",
  "mensaje": "Error de validación",
  "errores": {
    "name": "El nombre del producto no puede estar vacío",
    "price": "El precio debe ser mayor a 0"
  },
  "timestamp": 1699750065000
}
```

#### PUT - Actualizar
```http
PUT /api/products/{id}
Content-Type: application/json

{
  "name": "Tomate Premium",
  "description": "Tomate orgánico",
  "price": 2.50,
  "imageUrl": "/images/products/tomate-premium.jpg",
  "categoryId": 1
}
```

**Respuesta (200):**
```json
{
  "id": 1,
  "name": "Tomate Premium",
  "description": "Tomate orgánico",
  "price": 2.50,
  "imageUrl": "/images/products/tomate-premium.jpg",
  "category": {"id": 1, "name": "Verduras"}
}
```

#### DELETE - Eliminar
```http
DELETE /api/products/{id}
```

**Respuesta (204):** Sin contenido (éxito)

**Error (404):**
```json
{
  "estado": "error",
  "mensaje": "Producto con ID 999 no encontrado",
  "timestamp": 1699750065000
}
```

---

### CATEGORÍAS

#### GET - Listar todas
```http
GET /api/categories
```

**Respuesta (200):**
```json
[
  {"id": 1, "name": "Verduras"},
  {"id": 2, "name": "Frutas"}
]
```

#### GET - Obtener una
```http
GET /api/categories/{id}
```

#### POST - Crear
```http
POST /api/categories
Content-Type: application/json

{
  "name": "Bebidas"
}
```

**Respuesta (201):**
```json
{
  "id": 3,
  "name": "Bebidas"
}
```

#### PUT - Actualizar
```http
PUT /api/categories/{id}
Content-Type: application/json

{
  "name": "Bebidas Naturales"
}
```

**Respuesta (200):**
```json
{
  "id": 3,
  "name": "Bebidas Naturales"
}
```

#### DELETE - Eliminar
```http
DELETE /api/categories/{id}
```

**Respuesta (204):** Sin contenido

---

## 🧪 Ejemplos con cURL

### PRODUCTOS

```bash
# Listar todos
curl http://localhost:8080/api/products

# Obtener uno
curl http://localhost:8080/api/products/1

# Crear
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pepino",
    "description": "Pepino fresco",
    "price": 1.99,
    "imageUrl": "/images/products/pepino.jpg",
    "categoryId": 1
  }'

# Actualizar
curl -X PUT http://localhost:8080/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tomate Premium",
    "description": "Tomate orgánico",
    "price": 2.50,
    "imageUrl": "/images/products/tomate-premium.jpg",
    "categoryId": 1
  }'

# Eliminar
curl -X DELETE http://localhost:8080/api/products/1
```

### CATEGORÍAS

```bash
# Listar todas
curl http://localhost:8080/api/categories

# Obtener una
curl http://localhost:8080/api/categories/1

# Crear
curl -X POST http://localhost:8080/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Bebidas"}'

# Actualizar
curl -X PUT http://localhost:8080/api/categories/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Verduras Orgánicas"}'

# Eliminar
curl -X DELETE http://localhost:8080/api/categories/1
```

---

## 💻 Ejemplos con Fetch API (React)

### Listar productos
```javascript
fetch('http://localhost:8080/api/products')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Obtener producto por ID
```javascript
const id = 1;
fetch(`http://localhost:8080/api/products/${id}`)
  .then(res => res.json())
  .then(product => console.log(product));
```

### Crear producto
```javascript
const newProduct = {
  name: 'Pepino',
  description: 'Pepino fresco',
  price: 1.99,
  imageUrl: '/images/products/pepino.jpg',
  categoryId: 1
};

fetch('http://localhost:8080/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newProduct)
})
  .then(res => res.json())
  .then(data => console.log('Creado:', data));
```

### Actualizar producto
```javascript
const id = 1;
const updatedProduct = {
  name: 'Tomate Premium',
  description: 'Tomate orgánico',
  price: 2.50,
  imageUrl: '/images/products/tomate-premium.jpg',
  categoryId: 1
};

fetch(`http://localhost:8080/api/products/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updatedProduct)
})
  .then(res => res.json())
  .then(data => console.log('Actualizado:', data));
```

### Eliminar producto
```javascript
const id = 1;
fetch(`http://localhost:8080/api/products/${id}`, {
  method: 'DELETE'
})
  .then(() => console.log('Eliminado'));
```

---

## 📊 Validación

Los datos se validan automáticamente:

### Crear/Actualizar Producto

| Campo | Validación | Mensaje |
|-------|-----------|---------|
| `name` | No vacío | "El nombre del producto no puede estar vacío" |
| `description` | No vacío | "La descripción no puede estar vacía" |
| `price` | > 0 | "El precio debe ser mayor a 0" |
| `imageUrl` | No vacío | "La URL de imagen no puede estar vacía" |
| `categoryId` | Debe existir | Error 404 si no existe |

### Crear/Actualizar Categoría

| Campo | Validación | Mensaje |
|-------|-----------|---------|
| `name` | No vacío | "El nombre de la categoría no puede estar vacío" |

---

## 📝 Códigos de Estado HTTP

| Código | Significado | Casos |
|--------|-----------|-------|
| **200 OK** | Éxito | GET, PUT exitosos |
| **201 Created** | Recurso creado | POST exitoso |
| **204 No Content** | Sin contenido | DELETE exitoso |
| **400 Bad Request** | Error de validación | Datos inválidos |
| **404 Not Found** | No encontrado | ID inexistente |
| **500 Internal Error** | Error del servidor | Excepción no manejada |

---

## 🔧 Estructura de Archivos Creados

```
backend/src/main/java/com/huertohogar/huerto_hogar_web/
├── dto/
│   ├── CreateProductDTO.java      ← Validación POST/PUT productos
│   └── CreateCategoryDTO.java     ← Validación POST/PUT categorías
├── exception/
│   ├── ResourceNotFoundException.java
│   └── GlobalExceptionHandler.java ← Manejo centralizado de errores
├── controller/
│   ├── ProductController.java     ← CRUD completo (modificado)
│   └── CategoryController.java    ← CRUD completo (modificado)
└── ... (otros archivos sin cambios)
```

---

## 🧠 Arquitectura de Validación

```
Request JSON
     ↓
@Valid annotation
     ↓
Jakarta Validation constraints
     ↓
ValidationException?
     ↓
YES → GlobalExceptionHandler.handleValidationError()
     ↓
NO → Controller method
     ↓
Repository operations
     ↓
Response JSON
```

---

## ⚡ Orden de Operaciones

### Crear Producto
1. ✅ Recibe JSON
2. ✅ Valida campos (@Valid)
3. ✅ Si error → 400 con detalles
4. ✅ Busca categoría por ID
5. ✅ Si no existe → 404
6. ✅ Crea producto
7. ✅ Guarda en BD
8. ✅ Retorna 201 con datos creados

### Actualizar Producto
1. ✅ Recibe ID + JSON
2. ✅ Busca producto existente
3. ✅ Si no existe → 404
4. ✅ Valida nuevos datos
5. ✅ Si error → 400
6. ✅ Busca categoría nueva
7. ✅ Si no existe → 404
8. ✅ Actualiza producto
9. ✅ Retorna 200 con datos actualizados

### Eliminar Producto
1. ✅ Recibe ID
2. ✅ Busca producto
3. ✅ Si no existe → 404
4. ✅ Elimina de BD
5. ✅ Retorna 204 (sin contenido)

---

## 🚀 Probar Endpoints en Postman/Insomnia

### Crear Collection
1. New Collection: "HuertoHogar API"

### Requests
```
GET    http://localhost:8080/api/products
GET    http://localhost:8080/api/products/1
POST   http://localhost:8080/api/products
PUT    http://localhost:8080/api/products/1
DELETE http://localhost:8080/api/products/1

GET    http://localhost:8080/api/categories
GET    http://localhost:8080/api/categories/1
POST   http://localhost:8080/api/categories
PUT    http://localhost:8080/api/categories/1
DELETE http://localhost:8080/api/categories/1
```

---

## 📊 Respuesta de Error Centralizada

Todos los errores siguen este formato:

```json
{
  "estado": "error",
  "mensaje": "Descripción del error",
  "timestamp": 1699750065000,
  "errores": { ... }  // Solo en validaciones
}
```

---

## ✨ Características Implementadas

✅ Validación con Jakarta Validation
✅ Mensajes de error en español
✅ DTOs para entrada de datos
✅ Manejo global de excepciones
✅ Respuestas JSON consistentes
✅ Códigos HTTP apropiados
✅ Relaciones entre entidades
✅ Transacciones automáticas con JPA

---

## 🎯 Próximas Mejoras (Opcional)

- [ ] Paginación en GET
- [ ] Búsqueda y filtros
- [ ] Ordenamiento
- [ ] Audit (createdAt, updatedAt)
- [ ] Soft delete
- [ ] Autenticación JWT
- [ ] Rate limiting

---

**CRUD completamente funcional!** 🎉

