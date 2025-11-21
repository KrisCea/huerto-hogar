// src/pages/Admin/ProductsList.jsx
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(p =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoria.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const loadProducts = async () => {
    try {
      const apiProducts = await getProducts();
      // Map API product shape to UI-friendly shape used in this component
      const mapped = apiProducts.map(p => ({
        id: p.id,
        nombre: p.name,
        descripcion: p.description,
        precio: p.price,
        imagen: p.imageUrl || '/images/products/default.jpg',
        categoria: p.category ? p.category.name : '',
        stock: p.stock || 0,
        enOferta: p.precioOferta ? true : false,
        precioOferta: p.precioOferta || null,
        destacado: p.destacado || false
      }));
      setProducts(mapped);
    } catch (err) {
      console.error('Error loading products:', err);
      setProducts([]);
    }
  };

  const handleDelete = async (id, nombre) => {
    if (!window.confirm(`¿Estás seguro de eliminar "${nombre}"?`)) return;
    try {
      await deleteProduct(id);
      await loadProducts();
      toast.success(
        <div>
          <strong>Producto eliminado</strong>
          <div className="small mt-1">{nombre}</div>
        </div>,
        { icon: "🗑️" }
      );
    } catch (err) {
      console.error('Error deleting product:', err);
      toast.error('No se pudo eliminar el producto: ' + (err.message || ''));
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Productos</h1>
        <div>
          <Button as={Link} to="/admin" variant="outline-secondary" className="me-2">
            ← Volver
          </Button>
          <Button as={Link} to="/admin/productos/nuevo" variant="success">
            ➕ Nuevo Producto
          </Button>
        </div>
      </div>

      <InputGroup className="mb-4">
        <Form.Control
          type="text"
          placeholder="Buscar productos por nombre o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Table responsive striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img 
                  src={product.imagen} 
                  alt={product.nombre}
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                />
              </td>
              <td>
                <strong>{product.nombre}</strong>
                {product.enOferta && (
                  <Badge bg="danger" className="ms-2">OFERTA</Badge>
                )}
              </td>
              <td>
                <Badge bg="info">{product.categoria}</Badge>
              </td>
              <td>
                {product.enOferta ? (
                  <>
                    <span className="text-decoration-line-through text-muted">
                      ${product.precio.toLocaleString()}
                    </span>
                    <br />
                    <strong className="text-success">
                      ${product.precioOferta.toLocaleString()}
                    </strong>
                  </>
                ) : (
                  <strong>${product.precio.toLocaleString()}</strong>
                )}
              </td>
              <td>
                <Badge bg={product.stock < 10 ? 'danger' : product.stock < 20 ? 'warning' : 'success'}>
                  {product.stock}
                </Badge>
              </td>
              <td>
                {product.destacado && (
                  <Badge bg="warning" text="dark">⭐ Destacado</Badge>
                )}
              </td>
              <td>
                <Button 
                  as={Link} 
                  to={`/admin/productos/editar/${product.id}`}
                  variant="outline-primary" 
                  size="sm"
                  className="me-2"
                >
                  ✏️ Editar
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => handleDelete(product.id, product.nombre)}
                >
                  🗑️ Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {filteredProducts.length === 0 && (
        <div className="text-center text-muted py-5">
          No se encontraron productos
        </div>
      )}
    </Container>
  );
};

export default ProductsList;
