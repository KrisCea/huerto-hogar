/**
 * AdminDashboard.jsx
 * Página de administración completa con CRUD de productos y categorías
 * Integra todos los componentes CRUD en una interfaz profesional
 */

import React, { useState } from 'react';
import {
  ProductListCRUD,
  CreateProductForm,
  UpdateProductForm,
  DeleteProductButton,
  CategoriesCRUD,
} from './CRUDExamples';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('productos');
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleProductCreated = () => {
    // Fuerza re-render de la lista
    setRefreshKey((prev) => prev + 1);
    alert('✅ Producto creado. Actualizando lista...');
  };

  const handleProductUpdated = () => {
    setRefreshKey((prev) => prev + 1);
    setEditMode(false);
    setSelectedProductId(null);
  };

  const handleProductDeleted = () => {
    setRefreshKey((prev) => prev + 1);
    setSelectedProductId(null);
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <h1>🌱 Panel de Administración - Huerto Hogar</h1>
        <p>Gestión de Productos y Categorías</p>
      </header>

      {/* Tabs Navigation */}
      <nav className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'productos' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('productos');
            setEditMode(false);
          }}
        >
          📦 Productos
        </button>
        <button
          className={`tab-button ${activeTab === 'categorias' ? 'active' : ''}`}
          onClick={() => setActiveTab('categorias')}
        >
          🏷️ Categorías
        </button>
        <button
          className={`tab-button ${activeTab === 'crear' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('crear');
            setEditMode(false);
          }}
        >
          ➕ Crear Producto
        </button>
      </nav>

      {/* Content */}
      <div className="admin-content">
        {/* Tab: Productos */}
        {activeTab === 'productos' && (
          <div className="tab-content">
            <div className="content-section">
              <h2>📦 Gestión de Productos</h2>

              {editMode && selectedProductId ? (
                <div className="edit-section">
                  <button
                    className="btn-close-edit"
                    onClick={() => {
                      setEditMode(false);
                      setSelectedProductId(null);
                    }}
                  >
                    ✕ Cerrar edición
                  </button>
                  <UpdateProductForm
                    productId={selectedProductId}
                    onProductUpdated={handleProductUpdated}
                  />
                </div>
              ) : (
                <div className="products-list-container">
                  <ProductListCRUDExtended
                    key={refreshKey}
                    onEdit={(id) => {
                      setSelectedProductId(id);
                      setEditMode(true);
                    }}
                    onDelete={handleProductDeleted}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab: Categorías */}
        {activeTab === 'categorias' && (
          <div className="tab-content">
            <div className="content-section">
              <h2>🏷️ Gestión de Categorías</h2>
              <CategoriesCRUD key={refreshKey} />
            </div>
          </div>
        )}

        {/* Tab: Crear Producto */}
        {activeTab === 'crear' && (
          <div className="tab-content">
            <div className="content-section">
              <h2>➕ Crear Nuevo Producto</h2>
              <CreateProductForm onProductCreated={handleProductCreated} />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="admin-footer">
        <p>© 2024 Huerto Hogar - Sistema de Administración</p>
      </footer>
    </div>
  );
};

/**
 * Componente ProductListCRUDExtended
 * Extiende ProductListCRUD con botones de editar y eliminar
 */
const ProductListCRUDExtended = ({ onEdit, onDelete }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
        if (!response.ok) throw new Error('Error al cargar productos');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <div className="loading">⏳ Cargando productos...</div>;
  if (error) return <div className="error">❌ Error: {error}</div>;
  if (products.length === 0) return <div className="empty">No hay productos</div>;

  return (
    <table className="products-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>#{product.id}</td>
            <td>
              <strong>{product.name}</strong>
            </td>
            <td>{product.description.substring(0, 30)}...</td>
            <td className="price">${product.price.toFixed(2)}</td>
            <td>
              <span className="category-badge">{product.category.name}</span>
            </td>
            <td className="actions">
              <button
                className="btn-edit"
                onClick={() => onEdit(product.id)}
                title="Editar"
              >
                ✏️ Editar
              </button>
              <button
                className="btn-delete"
                onClick={() => {
                  if (window.confirm(`¿Eliminar "${product.name}"?`)) {
                    // Simulación de eliminar, en real usaría el componente DeleteProductButton
                    fetch(`${process.env.REACT_APP_API_URL}/products/${product.id}`, {
                      method: 'DELETE',
                    })
                      .then(() => {
                        alert('✅ Producto eliminado');
                        onDelete();
                      })
                      .catch((err) => alert('❌ Error: ' + err.message));
                  }
                }}
                title="Eliminar"
              >
                🗑️ Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminDashboard;
