# Guía Completa de CRUD en React

## 📋 Tabla de Contenidos
1. [Configuración Inicial](#configuración-inicial)
2. [Componentes Disponibles](#componentes-disponibles)
3. [Ejemplos de Uso](#ejemplos-de-uso)
4. [Manejo de Errores](#manejo-de-errores)
5. [Validaciones](#validaciones)
6. [Mejores Prácticas](#mejores-prácticas)

---

## Configuración Inicial

### 1. Importar el Servicio API

```javascript
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/apiService';
```

### 2. Variables de Entorno

Crear archivo `.env.development` en la raíz del proyecto:

```
REACT_APP_API_URL=http://localhost:8080/api
```

### 3. Asegurar que el Backend está Corriendo

```bash
# En terminal desde /backend
./mvnw spring-boot:run
# o en Windows
mvnw.cmd spring-boot:run
```

---

## Componentes Disponibles

### 1. **ProductListCRUD** - Listar Todos los Productos

Muestra un listado de todos los productos con sus detalles básicos.

```javascript
import { ProductListCRUD } from '../components/CRUDExamples';

function App() {
  return <ProductListCRUD />;
}
```

**Props:** Ninguna

**Muestra:**
- Nombre del producto
- Precio
- Descripción
- Categoría

**Estados Manejados:**
- ✅ Cargando
- ✅ Error de conexión
- ✅ Lista vacía

---

### 2. **CreateProductForm** - Crear Nuevo Producto

Formulario para crear un nuevo producto con validaciones en tiempo real.

```javascript
import { CreateProductForm } from '../components/CRUDExamples';

function AdminPanel() {
  const handleProductCreated = (newProduct) => {
    console.log('Nuevo producto:', newProduct);
    // Actualizar lista, mostrar notificación, etc.
  };

  return <CreateProductForm onProductCreated={handleProductCreated} />;
}
```

**Props:**
- `onProductCreated` (función, opcional): Callback cuando se crea un producto

**Campos del Formulario:**
| Campo | Tipo | Validación | Requerido |
|-------|------|-----------|-----------|
| Nombre | text | No vacío | ✅ |
| Descripción | textarea | No vacío | ✅ |
| Precio | number | > 0, decimales | ✅ |
| URL Imagen | text | No vacío | ✅ |
| Categoría | select | Debe existir | ✅ |

**Ejemplo de Respuesta:**
```json
{
  "id": 4,
  "name": "Tomates Frescos",
  "description": "Tomates orgánicos de la huerta",
  "price": 45.99,
  "imageUrl": "https://...",
  "category": {
    "id": 1,
    "name": "Verduras"
  }
}
```

---

### 3. **UpdateProductForm** - Actualizar Producto

Formulario precargado con los datos del producto para editar.

```javascript
import { UpdateProductForm } from '../components/CRUDExamples';

function EditProduct() {
  const productId = 1; // Obtener del URL o contexto
  
  const handleUpdated = (updatedProduct) => {
    console.log('Producto actualizado:', updatedProduct);
  };

  return (
    <UpdateProductForm 
      productId={productId} 
      onProductUpdated={handleUpdated}
    />
  );
}
```

**Props:**
- `productId` (número, requerido): ID del producto a editar
- `onProductUpdated` (función, opcional): Callback después de actualizar

**Carga Automática:**
- Datos actuales del producto
- Lista de categorías disponibles

---

### 4. **DeleteProductButton** - Eliminar Producto

Botón para eliminar un producto con confirmación.

```javascript
import { DeleteProductButton } from '../components/CRUDExamples';

function ProductCard({ product }) {
  const handleDeleted = () => {
    console.log('Producto eliminado');
    // Actualizar lista, navegar, etc.
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <DeleteProductButton
        productId={product.id}
        productName={product.name}
        onDeleted={handleDeleted}
      />
    </div>
  );
}
```

**Props:**
- `productId` (número, requerido): ID del producto
- `productName` (string, requerido): Nombre para mostrar en confirmación
- `onDeleted` (función, opcional): Callback después de eliminar

**Comportamiento:**
1. Muestra confirmación: "¿Eliminar producto 'xxx'?"
2. Si confirma → elimina en backend
3. Ejecuta callback onDeleted
4. Muestra alerta de éxito

---

### 5. **CategoriesCRUD** - Gestionar Categorías

Componente completo para listar, crear y eliminar categorías.

```javascript
import { CategoriesCRUD } from '../components/CRUDExamples';

function AdminPanel() {
  return <CategoriesCRUD />;
}
```

**Props:** Ninguna

**Funcionalidades:**
- ✅ Listar todas las categorías
- ✅ Crear nueva categoría
- ✅ Eliminar categoría

**Interfaz:**
```
Categorías (3)
┌─────────────────────────────┐
│ Nueva categoría... [Agregar] │
└─────────────────────────────┘

• Verduras [Eliminar]
• Frutas [Eliminar]
• Hierbas [Eliminar]
```

---

## Ejemplos de Uso

### Caso 1: Página de Admin Completa

```javascript
import React, { useState } from 'react';
import {
  ProductListCRUD,
  CreateProductForm,
  CategoriesCRUD,
} from '../components/CRUDExamples';

function AdminPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>Panel de Administración</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Columna izquierda: Crear y Gestionar */}
        <div>
          <CreateProductForm
            onProductCreated={() => setRefreshKey(k => k + 1)}
          />
          <hr />
          <CategoriesCRUD />
        </div>

        {/* Columna derecha: Listar */}
        <div>
          <ProductListCRUD key={refreshKey} />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
```

### Caso 2: Carrito de Compras con CRUD

```javascript
import { useState, useEffect } from 'react';
import { getProducts, updateProduct } from '../services/apiService';

function CartWithStock() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const addToCart = async (product) => {
    // Decrementar stock en backend
    const updated = await updateProduct(product.id, {
      ...product,
      // Aquí iría lógica de stock si existe
    });
    
    setCart([...cart, product]);
    alert(`${product.name} agregado al carrito`);
  };

  return (
    <div>
      <h2>Productos ({products.length})</h2>
      {products.map(p => (
        <div key={p.id}>
          <h4>{p.name} - ${p.price}</h4>
          <button onClick={() => addToCart(p)}>
            Agregar al carrito
          </button>
        </div>
      ))}

      <h3>Carrito ({cart.length})</h3>
      {/* Mostrar carrito */}
    </div>
  );
}

export default CartWithStock;
```

### Caso 3: Búsqueda y Filtrado

```javascript
import { useState, useEffect } from 'react';
import { getProducts } from '../services/apiService';

function SearchProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getProducts().then(setAllProducts);
  }, []);

  useEffect(() => {
    const results = allProducts.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
  }, [search, allProducts]);

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <p>Resultados: {filtered.length}</p>
      
      {filtered.map(p => (
        <div key={p.id}>
          <h4>{p.name}</h4>
          <p>{p.description}</p>
          <p>Precio: ${p.price}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchProducts;
```

---

## Manejo de Errores

### Estructura de Errores

El servidor devuelve errores en este formato:

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

### Manejo en Componentes

```javascript
import { useState } from 'react';
import { createProduct } from '../services/apiService';

function SafeCreateForm() {
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors({});
      setGlobalError('');
      
      const result = await createProduct(formData);
      alert('Éxito: ' + result.name);
    } catch (err) {
      // apiService.handleResponse() extrae errores automáticamente
      if (err.errores) {
        // Errores de validación por campo
        setErrors(err.errores);
      } else {
        // Error general
        setGlobalError(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {globalError && <p style={{color: 'red'}}>❌ {globalError}</p>}
      
      <label>
        Nombre:
        <input name="name" />
        {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
      </label>

      <label>
        Precio:
        <input type="number" name="price" />
        {errors.price && <p style={{color: 'red'}}>{errors.price}</p>}
      </label>

      <button type="submit">Crear</button>
    </form>
  );
}
```

### Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Network Error` | Backend no está corriendo | Iniciar backend: `mvnw spring-boot:run` |
| `404 Not Found` | Producto/Categoría no existe | Verificar ID en la URL |
| `400 Bad Request` | Validación fallida | Revisar errores en `err.errores` |
| `500 Internal Error` | Error en el servidor | Ver logs del backend |

---

## Validaciones

### Del lado del cliente (HTML5)

```javascript
<input type="text" required placeholder="No vacío" />
<input type="number" min="0.01" step="0.01" />
<select required>
  <option value="">Seleccionar...</option>
</select>
```

### Del lado del servidor (Jakarta Validation)

| Constraint | Mensaje | Aplica a |
|-----------|---------|----------|
| `@NotBlank` | "no debe estar vacío" | name, description, imageUrl |
| `@NotNull` | "no debe ser nulo" | price, categoryId |
| `@DecimalMin("0.01")` | "debe ser mayor que 0.01" | price |
| Validación de FK | "Categoría no encontrada" | categoryId |

### Validar en Componente

```javascript
function validateProduct(product) {
  const errors = {};

  if (!product.name?.trim()) {
    errors.name = 'El nombre es obligatorio';
  }

  if (!product.description?.trim()) {
    errors.description = 'La descripción es obligatoria';
  }

  if (product.price <= 0) {
    errors.price = 'El precio debe ser mayor a 0';
  }

  if (!product.categoryId) {
    errors.categoryId = 'Debe seleccionar una categoría';
  }

  return Object.keys(errors).length > 0 ? errors : null;
}
```

---

## Mejores Prácticas

### ✅ DO: Lo que debes hacer

```javascript
// 1. Usar async/await
const handleCreate = async (data) => {
  try {
    const result = await createProduct(data);
    console.log('Éxito:', result);
  } catch (err) {
    console.error('Error:', err);
  }
};

// 2. Separar lógica de presentación
function useFetchProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { products, loading, error };
}

// 3. Manejar confirmaciones para DELETE
const handleDelete = () => {
  if (!window.confirm('¿Estás seguro?')) return;
  deleteProduct(id);
};

// 4. Actualizar estados después de operaciones
const handleCreate = async (data) => {
  const newProduct = await createProduct(data);
  setProducts([...products, newProduct]);
};
```

### ❌ DON'T: Lo que debes evitar

```javascript
// ❌ NO: Llamadas síncronas a API (no existe)
const products = getProducts(); // ❌ Esto no funciona

// ❌ NO: No manejar errores
await createProduct(data); // ❌ Si falla, se cae la app

// ❌ NO: Estado duplicado
const [product, setProduct] = useState(data);
// Si 'data' cambio, no se actualiza automáticamente

// ❌ NO: Condiciones de carrera
useEffect(() => {
  getProducts().then(setProducts);
}, []); // Sin dependencias específicas puede causar problemas

// ❌ NO: Dejar estados de loading indefinidos
const [loading, setLoading] = useState(true);
// Si nunca se actualiza, queda cargando para siempre
```

### 📊 Hook Personalizado Recomendado

```javascript
/**
 * Hook para operaciones CRUD con manejo completo de estado
 * @param {Function} apiCall - Función API (getProducts, createProduct, etc)
 * @param {*} initialData - Datos iniciales
 */
function useCRUD(apiCall, initialData = null) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiCall(payload);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute };
}

// Uso:
function MyComponent() {
  const { data: products, loading, error, execute: fetchProducts } = 
    useCRUD(getProducts, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}
```

---

## 🔗 Rutas de API Disponibles

```
GET    /api/products              → Obtener todos los productos
GET    /api/products/:id          → Obtener producto por ID
POST   /api/products              → Crear nuevo producto
PUT    /api/products/:id          → Actualizar producto
DELETE /api/products/:id          → Eliminar producto

GET    /api/categories            → Obtener todas las categorías
GET    /api/categories/:id        → Obtener categoría por ID
POST   /api/categories            → Crear nueva categoría
PUT    /api/categories/:id        → Actualizar categoría
DELETE /api/categories/:id        → Eliminar categoría
```

---

## 📞 Soporte

- **Documentación de API**: Ver `CRUD_API.md`
- **Backend**: `/backend` - Spring Boot
- **Frontend**: `/frontend` - React
- **Base de datos**: H2 en memoria (se resetea al reiniciar)

---

**Última actualización:** 2024-01-15
**Versión:** 1.0
