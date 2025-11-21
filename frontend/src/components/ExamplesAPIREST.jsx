/**
 * Ejemplo: ProductList Component usando API REST
 * 
 * Este es un ejemplo de cómo usar el apiService.js para consumir
 * los datos del backend REST en lugar de mockData.js
 */

import React, { useEffect, useState } from 'react';
import { getProducts, getCategories } from '../services/apiService';

export const ProductListExample = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Obtener productos y categorías del backend
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="products-container">
      <h2>Productos desde REST API</h2>
      
      <div className="categories">
        <h3>Categorías:</h3>
        <ul>
          {categories.map((cat) => (
            <li key={cat.id}>{cat.name}</li>
          ))}
        </ul>
      </div>

      <div className="products">
        <h3>Productos:</h3>
        {products.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          <div className="grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.name} />
                <h4>{product.name}</h4>
                <p>{product.description}</p>
                <p className="category">Categoría: {product.category.name}</p>
                <p className="price">${product.price}</p>
                <button>Agregar al carrito</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Ejemplo 2: ProductDetail Component
 * 
 * Obtiene los datos de un producto específico por ID
 */

import { useParams } from 'react-router-dom';
import { getProductById } from '../services/apiService';

export const ProductDetailExample = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Error loading product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Cargando producto...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Producto no encontrado</div>;

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '400px' }} />
      <p>{product.description}</p>
      <p>Categoría: {product.category.name}</p>
      <h3>${product.price}</h3>
      <button>Agregar al carrito</button>
    </div>
  );
};

export default ProductListExample;
