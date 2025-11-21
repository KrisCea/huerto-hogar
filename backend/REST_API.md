# REST API - HuertoHogar Backend

## Descripción General

Backend CSR (Client-Side Rendering) construido con **Spring Boot 3.5.7** + **Spring Data JPA** + **H2 In-Memory Database**.

Proporciona endpoints REST para:
- Productos
- Categorías
- Integración futura: Carrito, Órdenes, Autenticación

## Configuración

### Puertos
- **Backend**: `http://localhost:8080`
- **Frontend (React)**: `http://localhost:3000`

### CORS
Configurado para permitir peticiones desde `http://localhost:3000` a `/api/**`

### Base de Datos
- **Driver**: H2 In-Memory
- **URL**: `jdbc:h2:mem:huertohogar`
- **Console H2**: `http://localhost:8080/h2-console` (user: `sa`, password: vacío)

## Endpoints

### 1. Productos

#### Listar todos los productos
```http
GET /api/products
```

**Respuesta (JSON):**
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
  {
    "id": 2,
    "name": "Lechuga",
    "description": "Lechuga natural",
    "price": 0.99,
    "imageUrl": "/images/products/lechuga.jpg",
    "category": {
      "id": 1,
      "name": "Verduras"
    }
  },
  {
    "id": 3,
    "name": "Manzana",
    "description": "Manzana roja",
    "price": 1.50,
    "imageUrl": "/images/products/manzana.jpg",
    "category": {
      "id": 2,
      "name": "Frutas"
    }
  }
]
```

#### Obtener producto por ID
```http
GET /api/products/{id}
```

**Ejemplo:**
```http
GET /api/products/1
```

**Respuesta:**
```json
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
```

### 2. Categorías

#### Listar todas las categorías
```http
GET /api/categories
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Verduras"
  },
  {
    "id": 2,
    "name": "Frutas"
  }
]
```

## Ejemplos con cURL

### Obtener lista de productos
```bash
curl -X GET http://localhost:8080/api/products \
  -H "Content-Type: application/json"
```

### Obtener producto específico
```bash
curl -X GET http://localhost:8080/api/products/1 \
  -H "Content-Type: application/json"
```

### Obtener categorías
```bash
curl -X GET http://localhost:8080/api/categories \
  -H "Content-Type: application/json"
```

## Ejemplos con Fetch API (Desde el Frontend React)

### Obtener lista de productos
```javascript
fetch('http://localhost:8080/api/products')
  .then(response => response.json())
  .then(data => console.log('Productos:', data))
  .catch(error => console.error('Error:', error));
```

### Obtener producto por ID
```javascript
const productId = 1;
fetch(`http://localhost:8080/api/products/${productId}`)
  .then(response => response.json())
  .then(product => console.log('Producto:', product))
  .catch(error => console.error('Error:', error));
```

### Obtener categorías
```javascript
fetch('http://localhost:8080/api/categories')
  .then(response => response.json())
  .then(categories => console.log('Categorías:', categories))
  .catch(error => console.error('Error:', error));
```

## Código con Axios (alternativa)

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Obtener productos
axios.get(`${API_BASE_URL}/products`)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

// Obtener producto por ID
axios.get(`${API_BASE_URL}/products/1`)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

// Obtener categorías
axios.get(`${API_BASE_URL}/categories`)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

## Cómo Ejecutar

### 1. Compilar y Empaquetar
```bash
cd backend
./mvnw clean package -DskipTests
```

### 2. Ejecutar el JAR
```bash
java -jar target/huerto-hogar-web-0.0.1-SNAPSHOT.jar
```

O con Maven directamente:
```bash
./mvnw spring-boot:run
```

### 3. Verificar que esté corriendo
```bash
curl http://localhost:8080/api/products
```

## Datos de Prueba

El DataLoader carga automáticamente 3 productos de ejemplo al arrancar:

| ID | Nombre   | Descripción      | Precio | Categoría |
|----|----------|------------------|--------|-----------|
| 1  | Tomate   | Tomate fresco    | 1.25   | Verduras  |
| 2  | Lechuga  | Lechuga natural  | 0.99   | Verduras  |
| 3  | Manzana  | Manzana roja     | 1.50   | Frutas    |

## Estructura del Código

```
backend/src/main/java/com/huertohogar/huerto_hogar_web/
├── HuertoHogarWebApplication.java      # Clase principal
├── DataLoader.java                     # Carga datos de prueba
├── config/
│   └── WebConfig.java                  # Configuración CORS
├── controller/
│   ├── ProductController.java
│   └── CategoryController.java
├── model/
│   ├── Product.java
│   └── Category.java
└── repository/
    ├── ProductRepository.java
    └── CategoryRepository.java
```

## Características

✅ REST API con Spring Boot
✅ Base de datos H2 in-memory
✅ CORS habilitado para localhost:3000
✅ Datos de prueba precargados
✅ H2 Console para inspeccionar datos

## Próximas Características (Opcionales)

- [ ] Autenticación JWT
- [ ] Endpoints POST/PUT/DELETE para productos (Admin)
- [ ] Carrito de compras
- [ ] Órdenes
- [ ] Validación de datos
- [ ] Paginación de productos

