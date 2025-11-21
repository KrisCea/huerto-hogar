// src/pages/Ofertas/Ofertas.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getProducts } from '../../services/apiService';

const Ofertas = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const products = await getProducts();
        const ofert = products.filter(p => p.precioOferta && p.precioOferta < p.price).map(p => ({
          id: p.id,
          nombre: p.name,
          descripcion: p.description,
          precio: p.price,
          precioOferta: p.precioOferta,
          imagen: p.imageUrl || '/images/products/default.jpg',
          categoria: p.category ? p.category.name : '',
          stock: p.stock || 0,
          enOferta: !!p.precioOferta,
          destacado: p.destacado || false,
          unidad: p.unidad || 'kg'
        }));
        setOffers(ofert);
      } catch (err) {
        console.error('Error loading offers:', err);
        setOffers([]);
      }
    };
    loadOffers();
  }, []);

  return (
    <Container className="py-5">
      <h1 className="mb-4">🔥 Ofertas Especiales</h1>
      <p className="lead mb-5">Aprovecha nuestras mejores ofertas en productos frescos</p>
      
      <Row>
        {offers.length > 0 ? (
          offers.map(product => (
            <Col key={product.id} md={4} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center text-muted">No hay ofertas disponibles en este momento.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Ofertas;
