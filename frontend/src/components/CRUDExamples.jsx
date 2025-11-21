/**
 * Ejemplos de Uso del CRUD en React
 * Componentes que demuestran cómo consumir la API REST completa
 */

import React, { useEffect, useState } from 'react';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/apiService';

// ==================== EJEMPLO 1: Listar Productos ====================

export const ProductListCRUD = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Productos ({products.length})</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - ${product.price}
            <br />
            {product.description}
            <br />
            <em>Categoría: {product.category.name}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ==================== EJEMPLO 2: Crear Producto ====================

export const CreateProductForm = ({ onProductCreated }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    categoryId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };
    loadCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'categoryId' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const newProduct = await createProduct(formData);
      alert(`✅ Producto "${newProduct.name}" creado exitosamente`);
      setFormData({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        categoryId: '',
      });
      if (onProductCreated) onProductCreated(newProduct);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px' }}>
      <h2>Crear Producto</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', marginTop: '5px' }}
        />
      </label>
      <br />

      <label>
        Descripción:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{ width: '100%', marginTop: '5px' }}
        />
      </label>
      <br />

      <label>
        Precio:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          min="0.01"
          required
          style={{ width: '100%', marginTop: '5px' }}
        />
      </label>
      <br />

      <label>
        URL Imagen:
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          style={{ width: '100%', marginTop: '5px' }}
        />
      </label>
      <br />

      <label>
        Categoría:
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
          style={{ width: '100%', marginTop: '5px' }}
        >
          <option value="">Seleccionar categoría...</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>
      <br />

      <button type="submit" disabled={loading}>
        {loading ? 'Creando...' : 'Crear Producto'}
      </button>
    </form>
  );
};

// ==================== EJEMPLO 3: Actualizar Producto ====================

export const UpdateProductForm = ({ productId, onProductUpdated }) => {
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    categoryId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productData, categoriesData] = await Promise.all([
          getProductById(productId),
          getCategories(),
        ]);
        setProduct(productData);
        setCategories(categoriesData);
        setFormData({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          imageUrl: productData.imageUrl,
          categoryId: productData.category.id,
        });
      } catch (err) {
        setError(err.message);
      }
    };
    loadData();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'categoryId' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updated = await updateProduct(productId, formData);
      alert(`✅ Producto actualizado`);
      if (onProductUpdated) onProductUpdated(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px' }}>
      <h2>Actualizar Producto #{productId}</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', marginTop: '5px' }}
        />
      </label>
      <br />

      <label>
        Descripción:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{ width: '100%', marginTop: '5px' }}
        />
      </label>
      <br />

      <label>
        Precio:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          min="0.01"
          required
          style={{ width: '100%', marginTop: '5px' }}
        />
      </label>
      <br />

      <label>
        Categoría:
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
          style={{ width: '100%', marginTop: '5px' }}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>
      <br />

      <button type="submit" disabled={loading}>
        {loading ? 'Actualizando...' : 'Actualizar'}
      </button>
    </form>
  );
};

// ==================== EJEMPLO 4: Eliminar Producto ====================

export const DeleteProductButton = ({ productId, productName, onDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!window.confirm(`¿Eliminar producto "${productName}"?`)) return;

    try {
      setLoading(true);
      await deleteProduct(productId);
      alert(`✅ Producto eliminado`);
      if (onDeleted) onDeleted();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <button onClick={handleDelete} disabled={loading} style={{ background: 'red', color: 'white' }}>
        {loading ? 'Eliminando...' : 'Eliminar'}
      </button>
    </div>
  );
};

// ==================== EJEMPLO 5: Categorías ====================

export const CategoriesCRUD = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      setLoading(true);
      const newCategory = await createCategory({ name: newCategoryName });
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
      alert('✅ Categoría creada');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id, name) => {
    if (!window.confirm(`¿Eliminar categoría "${name}"?`)) return;

    try {
      await deleteCategory(id);
      setCategories(categories.filter((cat) => cat.id !== id));
      alert('✅ Categoría eliminada');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px' }}>
      <h2>Categorías ({categories.length})</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <div>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Nueva categoría..."
        />
        <button onClick={handleAddCategory} disabled={loading}>
          {loading ? 'Agregando...' : 'Agregar'}
        </button>
      </div>

      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            {cat.name}
            <button
              onClick={() => handleDeleteCategory(cat.id, cat.name)}
              style={{ marginLeft: '10px', background: 'red', color: 'white' }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default {
  ProductListCRUD,
  CreateProductForm,
  UpdateProductForm,
  DeleteProductButton,
  CategoriesCRUD,
};
