# 🎯 Casos de Uso Avanzados - CRUD Huerto Hogar

> Ejemplos prácticos para casos complejos de uso del sistema CRUD

## 📋 Tabla de Contenidos

1. [Estados Compartidos con Context](#-estados-compartidos-con-context)
2. [Paginación y Búsqueda](#-paginación-y-búsqueda)
3. [Carrito de Compras](#-carrito-de-compras)
4. [Validaciones Avanzadas](#-validaciones-avanzadas)
5. [Manejo de Errores Profesional](#-manejo-de-errores-profesional)
6. [Optimizaciones de Performance](#-optimizaciones-de-performance)

---

## 🔄 Estados Compartidos con Context

Compartir estado de productos entre componentes sin prop drilling:

### ProductContext.jsx

```javascript
import React, { createContext, useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/apiService';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [prods, cats] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(
      products.map(p => (p.id === id ? updatedProduct : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const value = {
    products,
    categories,
    loading,
    error,
    loadData,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
```

### Uso en Componentes

```javascript
import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

function MyComponent() {
  const { products, categories, loading, error } = useContext(ProductContext);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Productos ({products.length})</h1>
      {/* Usar productos */}
    </div>
  );
}
```

### App.js con Provider

```javascript
import { ProductProvider } from './context/ProductContext';
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() {
  return (
    <ProductProvider>
      <AdminDashboard />
    </ProductProvider>
  );
}

export default App;
```

---

## 🔍 Paginación y Búsqueda

### Componente con Paginación

```javascript
import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/apiService';

export const ProductsPaginated = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    getProducts().then(setAllProducts);
  }, []);

  // Filtrar por búsqueda
  const filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  // Calcular paginación
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1); // Reset a página 1
        }}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />

      {/* Results Count */}
      <p>
        Mostrando {currentItems.length} de {filtered.length} resultados
      </p>

      {/* Products List */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ textAlign: 'left', padding: '10px' }}>Nombre</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Precio</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product) => (
            <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{product.name}</td>
              <td style={{ padding: '10px' }}>${product.price}</td>
              <td style={{ padding: '10px' }}>{product.category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ← Anterior
        </button>
        <span style={{ margin: '0 20px' }}>
          Página {currentPage} de {totalPages || 1}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};

export default ProductsPaginated;
```

---

## 🛒 Carrito de Compras

### useCart Hook

```javascript
import { useState } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getItemCount,
  };
};
```

### Componente Cart

```javascript
import { useCart } from '../hooks/useCart';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } =
    useCart();

  if (cart.length === 0) {
    return <p>El carrito está vacío</p>;
  }

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ textAlign: 'left', padding: '10px' }}>Producto</th>
            <th style={{ textAlign: 'center', padding: '10px' }}>Cantidad</th>
            <th style={{ textAlign: 'right', padding: '10px' }}>Precio</th>
            <th style={{ textAlign: 'center', padding: '10px' }}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{product.name}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    updateQuantity(product.id, parseInt(e.target.value))
                  }
                  style={{ width: '60px' }}
                />
              </td>
              <td style={{ padding: '10px', textAlign: 'right' }}>
                ${(product.price * quantity).toFixed(2)}
              </td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <button onClick={() => removeFromCart(product.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
        <button onClick={clearCart} style={{ marginRight: '10px' }}>
          Vaciar Carrito
        </button>
        <button style={{ background: 'green', color: 'white' }}>
          Proceder al Pago
        </button>
      </div>
    </div>
  );
};
```

---

## ✅ Validaciones Avanzadas

### Validador Personalizado

```javascript
export const productValidator = {
  validateName: (name) => {
    if (!name || name.trim().length === 0) {
      return 'El nombre es obligatorio';
    }
    if (name.length < 3) {
      return 'El nombre debe tener al menos 3 caracteres';
    }
    if (name.length > 100) {
      return 'El nombre no puede exceder 100 caracteres';
    }
    return null;
  },

  validatePrice: (price) => {
    if (!price || isNaN(price)) {
      return 'El precio es obligatorio y debe ser un número';
    }
    if (price <= 0) {
      return 'El precio debe ser mayor a 0';
    }
    if (price < 0.01) {
      return 'El precio mínimo es 0.01';
    }
    if (price > 1000000) {
      return 'El precio máximo es 1,000,000';
    }
    return null;
  },

  validateDescription: (description) => {
    if (!description || description.trim().length === 0) {
      return 'La descripción es obligatoria';
    }
    if (description.length < 10) {
      return 'La descripción debe tener al menos 10 caracteres';
    }
    if (description.length > 500) {
      return 'La descripción no puede exceder 500 caracteres';
    }
    return null;
  },

  validateProduct: (product) => {
    const errors = {};

    const nameError = productValidator.validateName(product.name);
    if (nameError) errors.name = nameError;

    const priceError = productValidator.validatePrice(product.price);
    if (priceError) errors.price = priceError;

    const descError = productValidator.validateDescription(product.description);
    if (descError) errors.description = descError;

    if (!product.categoryId) {
      errors.categoryId = 'Debe seleccionar una categoría';
    }

    if (!product.imageUrl || product.imageUrl.trim().length === 0) {
      errors.imageUrl = 'La URL de la imagen es obligatoria';
    }

    return Object.keys(errors).length > 0 ? errors : null;
  },
};
```

### Uso en Formulario

```javascript
import { useState } from 'react';
import { productValidator } from '../validators/productValidator';
import { createProduct } from '../services/apiService';

export const ValidatedProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    categoryId: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validar campo individual si ya fue tocado
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = null;

    switch (name) {
      case 'name':
        error = productValidator.validateName(value);
        break;
      case 'price':
        error = productValidator.validatePrice(value);
        break;
      case 'description':
        error = productValidator.validateDescription(value);
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = productValidator.validateProduct(formData);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      const created = await createProduct(formData);
      alert('✅ Producto creado exitosamente');
      setFormData({
        name: '',
        price: '',
        description: '',
        imageUrl: '',
        categoryId: '',
      });
      setErrors({});
      setTouched({});
    } catch (err) {
      alert('❌ Error: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name Field */}
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            borderColor: errors.name && touched.name ? 'red' : '#ddd',
          }}
        />
        {errors.name && touched.name && (
          <p style={{ color: 'red' }}>{errors.name}</p>
        )}
      </div>

      {/* Price Field */}
      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            borderColor: errors.price && touched.price ? 'red' : '#ddd',
          }}
        />
        {errors.price && touched.price && (
          <p style={{ color: 'red' }}>{errors.price}</p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{
            borderColor: errors.description && touched.description ? 'red' : '#ddd',
          }}
        />
        {errors.description && touched.description && (
          <p style={{ color: 'red' }}>{errors.description}</p>
        )}
      </div>

      <button type="submit">Crear Producto</button>
    </form>
  );
};
```

---

## 🚨 Manejo de Errores Profesional

### Error Boundary Component

```javascript
import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          background: '#ffebee',
          color: '#c62828',
          borderRadius: '4px',
        }}>
          <h2>⚠️ Algo salió mal</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Recargar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Error Handler Centralizado

```javascript
export class APIError extends Error {
  constructor(message, statusCode, errors = {}) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export const errorHandler = {
  handle: (error) => {
    if (error instanceof APIError) {
      return {
        title: 'Error de API',
        message: error.message,
        statusCode: error.statusCode,
        fieldErrors: error.errors,
      };
    }

    if (error instanceof TypeError) {
      return {
        title: 'Error de Red',
        message: 'No se pudo conectar al servidor',
        statusCode: 0,
      };
    }

    return {
      title: 'Error',
      message: error.message || 'Ocurrió un error desconocido',
      statusCode: 500,
    };
  },

  show: (error) => {
    const handled = errorHandler.handle(error);
    console.error(`[${handled.statusCode}] ${handled.title}: ${handled.message}`);
    // Mostrar notificación al usuario
    alert(`${handled.title}: ${handled.message}`);
  },
};
```

### Uso en Componentes

```javascript
import { errorHandler } from '../utils/errorHandler';
import { createProduct } from '../services/apiService';

async function handleCreate(data) {
  try {
    const result = await createProduct(data);
    // Éxito
  } catch (error) {
    errorHandler.show(error);
  }
}
```

---

## ⚡ Optimizaciones de Performance

### useMemo para Listas

```javascript
import { useMemo } from 'react';

export const OptimizedProductList = ({ products, sortBy = 'name' }) => {
  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    
    return sorted;
  }, [products, sortBy]);

  return (
    <div>
      {sortedProducts.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};
```

### useCallback para Funciones

```javascript
import { useCallback } from 'react';

export const OptimizedProductForm = () => {
  const handleSubmit = useCallback(async (formData) => {
    try {
      const result = await createProduct(formData);
      return result;
    } catch (error) {
      throw error;
    }
  }, []);

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
};
```

### Lazy Loading

```javascript
import { lazy, Suspense } from 'react';

const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const ProductList = lazy(() => import('./components/ProductList'));

export const App = () => (
  <Suspense fallback={<div>Cargando...</div>}>
    <AdminDashboard />
  </Suspense>
);
```

---

## 📚 Resumen

| Caso de Uso | Técnica | Archivo |
|------------|---------|---------|
| Compartir estado | Context API | `ProductContext.jsx` |
| Búsqueda y filtrado | Array methods | `ProductsPaginated.jsx` |
| Carrito de compras | Custom Hook | `useCart.js` |
| Validaciones complejas | Validador centralizado | `productValidator.js` |
| Manejo de errores | Error Boundary + handler | `ErrorBoundary.jsx` |
| Performance | useMemo/useCallback | `Optimized*.jsx` |

---

**Última actualización:** Enero 2024
**Versión:** 1.0
