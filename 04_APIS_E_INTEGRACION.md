# 🔌 Documento APIs e Integración
## HuertoHogar - Guía de Integración y Consumo de APIs

---

**Versión:** 1.0  
**Fecha:** 2024  
**Sistema:** HuertoHogar  
**Audiencia:** Desarrolladores e integradores

---

## ÍNDICE

1. [Introducción](#1-introducción)
2. [Arquitectura del Sistema](#2-arquitectura-del-sistema)
3. [Configuración del Entorno](#3-configuración-del-entorno)
4. [Integración Frontend-Backend](#4-integración-frontend-backend)
5. [Autenticación y Seguridad](#5-autenticación-y-seguridad)
6. [Ejemplos de Integración](#6-ejemplos-de-integración)
7. [Manejo de Errores](#7-manejo-de-errores)
8. [Mejores Prácticas](#8-mejores-prácticas)

---

## 1. INTRODUCCIÓN

### 1.1 Propósito
Este documento proporciona una guía completa para integrar y consumir las APIs de HuertoHogar, incluyendo ejemplos de código, patrones de integración y mejores prácticas.

### 1.2 Tecnologías
- **Backend:** Spring Boot 3.5.7 (Java 21)
- **Frontend:** React 18
- **API:** REST con JSON
- **Autenticación:** JWT (JSON Web Token)
- **Base de Datos:** H2 (desarrollo) / MySQL (producción)

### 1.3 URLs Base
- **Backend API:** `http://localhost:8080/api/v1`
- **Frontend:** `http://localhost:3000`
- **Swagger UI:** `http://localhost:8080/swagger-ui.html`

---

## 2. ARQUITECTURA DEL SISTEMA

### 2.1 Diagrama de Arquitectura

```
┌─────────────────┐
│   Frontend      │
│   (React)       │
│   Port: 3000    │
└────────┬────────┘
         │ HTTP/REST
         │ JSON
         │ JWT Token
         ▼
┌─────────────────┐
│   Backend API   │
│  (Spring Boot)  │
│   Port: 8080    │
└────────┬────────┘
         │ JPA/Hibernate
         ▼
┌─────────────────┐
│  Base de Datos  │
│  H2 / MySQL     │
└─────────────────┘
```

### 2.2 Flujo de Comunicación

1. **Cliente (Frontend)** realiza petición HTTP
2. **Backend** valida autenticación (si es requerida)
3. **Backend** procesa la solicitud
4. **Backend** consulta/modifica la base de datos
5. **Backend** retorna respuesta JSON
6. **Frontend** procesa y muestra la respuesta

---

## 3. CONFIGURACIÓN DEL ENTORNO

### 3.1 Variables de Entorno Frontend

Crea un archivo `.env` en `frontend/`:

```env
REACT_APP_API_URL=http://localhost:8080/api/v1
REACT_APP_API_IMAGE_URL=http://localhost:8080
```

### 3.2 Configuración Backend

Archivo: `backend/src/main/resources/application.properties`

```properties
# API Base
spring.application.name=huerto-hogar-web

# Base de datos (H2 para desarrollo)
spring.datasource.url=jdbc:h2:mem:huertohogar
spring.datasource.username=sa
spring.datasource.password=

# JWT
jwt.secret=mySecretKeyThatIsAtLeast256BitsLongForHS256Algorithm
jwt.expiration=86400000

# CORS
# Configurado en SecurityConfig.java
```

---

## 4. INTEGRACIÓN FRONTEND-BACKEND

### 4.1 Servicio de API (apiService.js)

El frontend incluye un servicio centralizado para todas las peticiones:

**Ubicación:** `frontend/src/services/apiService.js`

**Funcionalidades:**
- Manejo centralizado de URLs
- Gestión de tokens JWT
- Normalización de respuestas
- Manejo de errores

### 4.2 Ejemplo de Uso Básico

```javascript
import { getProducts, login, createOrder } from './services/apiService';

// Obtener productos (público)
const productos = await getProducts();
console.log(productos);

// Login
const response = await login({
  email: 'admin@huertohogar.com',
  password: 'admin123'
});
// El token se guarda automáticamente en localStorage

// Crear orden (requiere autenticación)
const orden = await createOrder({
  nombre: 'Juan',
  apellidos: 'Pérez',
  correo: 'juan@example.com',
  calle: 'Calle Principal 123',
  region: 'Región Metropolitana',
  comuna: 'Santiago',
  total: 150.50
});
```

### 4.3 Componente React de Ejemplo

```jsx
import React, { useState, useEffect } from 'react';
import { getProducts, getToken } from '../services/apiService';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error cargando productos:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Productos</h2>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <img src={product.imageUrl} alt={product.name} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
```

---

## 5. AUTENTICACIÓN Y SEGURIDAD

### 5.1 Flujo de Autenticación

```
1. Usuario ingresa credenciales
   ↓
2. Frontend envía POST /api/v1/auth/login
   ↓
3. Backend valida credenciales
   ↓
4. Backend genera token JWT
   ↓
5. Frontend recibe token y lo guarda en localStorage
   ↓
6. Frontend incluye token en headers de peticiones siguientes
   Header: Authorization: Bearer <token>
```

### 5.2 Implementación en Frontend

```javascript
// Login y guardar token
const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  const data = await handleResponse(response);
  
  // Guardar token
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  
  return data;
};

// Agregar token a peticiones autenticadas
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return { 'Authorization': `Bearer ${token}` };
  }
  return {};
};

// Ejemplo de uso
const createOrder = async (order) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(order),
  });
  
  return await handleResponse(response);
};
```

### 5.3 Validación de Token

El backend valida automáticamente el token JWT en cada petición autenticada. Si el token es inválido o expirado, retorna `401 Unauthorized`.

**Manejo en Frontend:**
```javascript
const handleResponse = async (response) => {
  if (response.status === 401) {
    // Token expirado o inválido
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirigir al login
    window.location.href = '/login';
    throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
  }
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.mensaje || 'Error en la petición');
  }
  
  return response.status === 204 ? null : await response.json();
};
```

---

## 6. EJEMPLOS DE INTEGRACIÓN

### 6.1 Integración con Fetch API

```javascript
// Obtener productos
async function obtenerProductos() {
  try {
    const response = await fetch('http://localhost:8080/api/v1/products');
    const productos = await response.json();
    return productos;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Crear producto (requiere autenticación)
async function crearProducto(producto, token) {
  try {
    const response = await fetch('http://localhost:8080/api/v1/admin/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(producto)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.mensaje);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### 6.2 Integración con Axios

```javascript
import axios from 'axios';

// Configurar axios
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Uso
const productos = await api.get('/products');
const orden = await api.post('/orders', orderData);
```

### 6.3 Integración con React Hooks

```jsx
import { useState, useEffect } from 'react';
import { getProducts, createOrder } from '../services/apiService';

function CheckoutPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCheckout = async (orderData) => {
    try {
      setLoading(true);
      const order = await createOrder(orderData);
      alert(`Orden creada: ${order.codigo}`);
      setCart([]);
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* UI del checkout */}
    </div>
  );
}
```

---

## 7. MANEJO DE ERRORES

### 7.1 Estrategia de Manejo de Errores

```javascript
// Servicio centralizado de manejo de errores
const handleResponse = async (response) => {
  if (!response.ok) {
    let message = `Error ${response.status}: ${response.statusText}`;
    
    try {
      const error = await response.json();
      message = error.mensaje || error.message || message;
      
      // Errores de validación
      if (error.errores) {
        const validationErrors = Object.values(error.errores).join(', ');
        message = `Errores de validación: ${validationErrors}`;
      }
    } catch (e) {
      // Si no se puede parsear JSON, usar mensaje por defecto
    }
    
    throw new Error(message);
  }
  
  return response.status === 204 ? null : await response.json();
};
```

### 7.2 Componente de Manejo de Errores

```jsx
function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = (event) => {
      setError(event.error);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (error) {
    return (
      <div className="error-boundary">
        <h2>Algo salió mal</h2>
        <p>{error.message}</p>
        <button onClick={() => setError(null)}>Reintentar</button>
      </div>
    );
  }

  return children;
}
```

---

## 8. MEJORES PRÁCTICAS

### 8.1 Seguridad

✅ **Hacer:**
- Siempre usar HTTPS en producción
- Validar todos los datos en el frontend y backend
- No almacenar información sensible en localStorage
- Implementar expiración de tokens
- Validar permisos en cada petición

❌ **Evitar:**
- Enviar contraseñas en texto plano
- Exponer tokens en URLs
- Confiar solo en validación del frontend
- Ignorar errores de autenticación

### 8.2 Rendimiento

✅ **Hacer:**
- Implementar caché cuando sea apropiado
- Usar paginación para listas grandes
- Optimizar imágenes
- Minimizar peticiones HTTP

❌ **Evitar:**
- Cargar todos los datos a la vez
- Hacer peticiones innecesarias
- Ignorar estados de carga

### 8.3 Código

✅ **Hacer:**
- Usar servicios centralizados para APIs
- Implementar manejo de errores consistente
- Documentar funciones complejas
- Usar TypeScript para tipado (opcional)

❌ **Evitar:**
- Duplicar lógica de peticiones
- Ignorar errores silenciosamente
- Hardcodear URLs
- Mezclar lógica de negocio con UI

---

## 9. TESTING DE INTEGRACIÓN

### 9.1 Pruebas con cURL

```bash
# Test de endpoints públicos
curl http://localhost:8080/api/v1/products
curl http://localhost:8080/api/v1/categories

# Test de autenticación
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@huertohogar.com","password":"admin123"}'

# Test con token
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/v1/vendedor/orders
```

### 9.2 Pruebas con Postman

1. Importar colección desde Swagger UI
2. Configurar variable de entorno `base_url`
3. Configurar variable `token` después del login
4. Usar `{{token}}` en headers de peticiones autenticadas

---

## 10. DEPLOYMENT

### 10.1 Configuración de Producción

**Backend:**
```properties
# application-prod.properties
spring.datasource.url=jdbc:mysql://localhost:3306/huertohogar
spring.datasource.username=usuario
spring.datasource.password=contraseña
jwt.secret=SECRET_KEY_MUY_SEGURA_EN_PRODUCCION
```

**Frontend:**
```env
# .env.production
REACT_APP_API_URL=https://api.huertohogar.com/api/v1
REACT_APP_API_IMAGE_URL=https://api.huertohogar.com
```

### 10.2 CORS en Producción

Asegúrate de configurar CORS correctamente en `SecurityConfig.java`:

```java
configuration.setAllowedOrigins(List.of(
    "https://huertohogar.com",
    "https://www.huertohogar.com"
));
```

---

## 11. RECURSOS ADICIONALES

- **Swagger UI:** `http://localhost:8080/swagger-ui.html`
- **Documentación de APIs:** Ver `03_DOCUMENTACION_APIS.md`
- **Manual de Usuario:** Ver `02_MANUAL_DE_USUARIO.md`
- **ERS:** Ver `01_DOCUMENTO_ERS.md`

---

**Documento APIs e Integración - Versión 1.0**

