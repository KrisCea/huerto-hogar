# Guía de Integración Frontend-Backend REST

## 📋 Descripción

Este documento explica cómo integrar el **Frontend React** con el **Backend Spring Boot REST**.

## 🚀 Quick Start

### 1. Iniciar Backend
```bash
cd backend
java -jar target/huerto-hogar-web-0.0.1-SNAPSHOT.jar
```
O con Maven:
```bash
cd backend
./mvnw spring-boot:run
```

Backend estará disponible en: `http://localhost:8080`

### 2. Iniciar Frontend
```bash
cd frontend
npm start
```

Frontend estará disponible en: `http://localhost:3000`

## 📂 Archivos Creados

### Backend (`backend/`)
- `src/main/java/com/huertohogar/huerto_hogar_web/model/Product.java` - Entidad Producto
- `src/main/java/com/huertohogar/huerto_hogar_web/model/Category.java` - Entidad Categoría
- `src/main/java/com/huertohogar/huerto_hogar_web/repository/ProductRepository.java` - DAO de Productos
- `src/main/java/com/huertohogar/huerto_hogar_web/repository/CategoryRepository.java` - DAO de Categorías
- `src/main/java/com/huertohogar/huerto_hogar_web/controller/ProductController.java` - API REST Productos
- `src/main/java/com/huertohogar/huerto_hogar_web/controller/CategoryController.java` - API REST Categorías
- `src/main/java/com/huertohogar/huerto_hogar_web/config/WebConfig.java` - Configuración CORS
- `src/main/java/com/huertohogar/huerto_hogar_web/DataLoader.java` - Datos de prueba
- `REST_API.md` - Documentación completa de API

### Frontend (`frontend/`)
- `src/services/apiService.js` - Servicio de API (fetch)
- `src/components/ExamplesAPIREST.jsx` - Ejemplos de componentes React

## 🔌 Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products/{id}` | Obtener un producto por ID |
| GET | `/api/categories` | Obtener todas las categorías |

## 💡 Ejemplos de Uso en React

### Opción 1: Usando el servicio `apiService.js`

```jsx
import { useEffect, useState } from 'react';
import { getProducts } from '../services/apiService';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### Opción 2: Usando fetch directamente

```jsx
const [products, setProducts] = useState([]);

useEffect(() => {
  fetch('http://localhost:8080/api/products')
    .then(res => res.json())
    .then(data => setProducts(data))
    .catch(err => console.error(err));
}, []);
```

### Opción 3: Con async/await

```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchData();
}, []);
```

## 🔒 CORS

La configuración CORS permite peticiones desde `http://localhost:3000` a `http://localhost:8080/api/*`.

Si necesitas cambiar los orígenes permitidos, edita `backend/src/main/java/com/huertohogar/huerto_hogar_web/config/WebConfig.java`:

```java
registry.addMapping("/api/**")
    .allowedOrigins("http://localhost:3000", "http://tu-dominio.com")
    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
    .allowedHeaders("*")
    .allowCredentials(true);
```

## 📊 Estructura de Datos

### Producto

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

### Categoría

```json
{
  "id": 1,
  "name": "Verduras"
}
```

## 🧪 Pruebas

### Con cURL

```bash
# Productos
curl http://localhost:8080/api/products

# Categorías
curl http://localhost:8080/api/categories

# Producto específico
curl http://localhost:8080/api/products/1
```

### Con Postman

1. Importar colección o crear requests manualmente
2. Base URL: `http://localhost:8080`
3. Endpoints: `/api/products`, `/api/categories`, etc.

### Con el Frontend

Abre la consola del navegador (F12) y verifica que los datos se cargan desde la API.

## 🔄 Flujo de Datos

```
React Component
        ↓
  apiService.js
        ↓
  Fetch/HTTP
        ↓
Spring Boot Backend
        ↓
  ProductController
        ↓
  ProductRepository (JPA)
        ↓
  H2 Database
```

## 📝 Próximos Pasos

- [ ] Conectar el carrito de compras con el backend
- [ ] Implementar órdenes
- [ ] Agregar autenticación (JWT)
- [ ] Crear endpoints POST/PUT/DELETE para admin
- [ ] Paginación y filtros
- [ ] Validación de datos en backend

## 🆘 Troubleshooting

### Error: CORS policy blocked

**Problema**: `Access to XMLHttpRequest blocked by CORS policy`

**Solución**: Asegúrate de que:
1. El backend está corriendo en `http://localhost:8080`
2. El frontend hace requests a `http://localhost:8080/api/*`
3. La configuración CORS en `WebConfig.java` permite `http://localhost:3000`

### Error: Backend no accesible

**Problema**: `Failed to fetch` o conexión rechazada

**Solución**:
1. Verifica que el backend está corriendo: `curl http://localhost:8080/api/products`
2. Revisa que estás usando el puerto correcto (8080)
3. Revisa los logs del backend para errores

### Datos no se cargan

**Problema**: Los componentes muestran "Cargando..." pero no llegan datos

**Solución**:
1. Abre las DevTools del navegador (F12)
2. Ve a la pestaña "Network"
3. Verifica que los requests a `/api/*` tengan estado 200
4. Revisa la respuesta JSON en la pestaña "Response"

## 📚 Referencias

- [REST_API.md](./REST_API.md) - Documentación completa de API
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [Fetch API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [CORS MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

