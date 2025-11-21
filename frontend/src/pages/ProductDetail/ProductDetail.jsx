// src/pages/ProductDetail/ProductDetail.jsx (ACTUALIZADO)
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProductById } from '../../services/apiService';
import { addToCart } from '../../utils/cartStorage'; // cart storage

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const load = async () => {
      try {
        const p = await getProductById(id);
        if (!p) {
          toast.error('Producto no encontrado');
          navigate('/productos');
          return;
        }
        // Map API product to UI shape expected below
        const mapped = {
          id: p.id,
          nombre: p.name,
          descripcion: p.description,
          precio: p.price,
          imagen: p.imageUrl || '/images/products/default.jpg',
          categoria: p.category ? p.category.name : '',
          stock: p.stock || 0,
          enOferta: !!p.precioOferta,
          precioOferta: p.precioOferta || null,
          destacado: p.destacado || false,
          unidad: p.unidad || 'kg'
        };
        setProduct(mapped);
      } catch (err) {
        console.error('Error loading product:', err);
        toast.error('Error al cargar el producto');
        navigate('/productos');
      }
    };
    load();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    await addToCart(product.id, quantity);
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast.success(
      <div>
        <strong>{quantity} x {product.nombre}</strong>
        <div className="mt-1 small">agregado(s) al carrito</div>
      </div>,
      {
        icon: "✅",
        position: "bottom-right"
      }
    );
  };

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </Container>
    );
  }

  const precioFinal = product.enOferta ? product.precioOferta : product.precio;

  return (
    <Container className="py-5">
      <Row>
        <Col md={6}>
          <Image 
            src={product.imagen} 
            alt={product.nombre} 
            fluid 
            rounded
            style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }}
          />
        </Col>
        <Col md={6}>
          {product.enOferta && (
            <Badge bg="danger" className="mb-3 fs-6">
              ¡OFERTA ESPECIAL!
            </Badge>
          )}
          {product.destacado && (
            <Badge bg="warning" text="dark" className="mb-3 ms-2 fs-6">
              ⭐ Destacado
            </Badge>
          )}
          <h1 className="mb-3">{product.nombre}</h1>
          <p className="text-muted lead">{product.descripcion}</p>
          
          <div className="my-4">
            {product.enOferta && (
              <div className="text-decoration-line-through text-muted mb-2 fs-5">
                Precio regular: ${product.precio.toLocaleString()}
              </div>
            )}
            <h3 className="text-success">
              ${precioFinal.toLocaleString()} 
              <span className="text-muted fs-6 ms-2">/ {product.unidad}</span>
            </h3>
            {product.enOferta && (
              <div className="text-danger fw-bold">
                ¡Ahorra ${(product.precio - product.precioOferta).toLocaleString()}!
              </div>
            )}
          </div>

          <div className="mb-3">
            <strong>Categoría:</strong> 
            <Badge bg="info" className="ms-2">{product.categoria}</Badge>
          </div>

          <div className="mb-4">
            <strong>Stock disponible:</strong> 
            <span className={`ms-2 fw-bold ${product.stock < 10 ? 'text-danger' : 'text-success'}`}>
              {product.stock} {product.unidad}
            </span>
          </div>

          <div className="mb-4">
            <label className="form-label"><strong>Cantidad:</strong></label>
            <div className="d-flex align-items-center">
              <Button 
                variant="outline-secondary"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </Button>
              <span className="mx-4 fs-4 fw-bold">{quantity}</span>
              <Button 
                variant="outline-secondary"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              >
                +
              </Button>
            </div>
          </div>

          <div className="d-grid gap-2">
            <Button 
              variant="success" 
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? '❌ Sin Stock' : '🛒 Agregar al carrito'}
            </Button>
            <Button 
              variant="outline-success"
              onClick={() => navigate('/productos')}
            >
              ← Seguir comprando
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
