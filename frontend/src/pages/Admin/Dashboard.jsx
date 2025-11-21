// src/pages/Admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/apiService';
import './Admin.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStock: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const products = await getProducts();
        const lowStockProducts = products.filter(p => (p.stock || 0) < 10).length;
        // Orders are not yet on backend; keep totalOrders/totalRevenue as 0
        setStats({
          totalProducts: products.length,
          totalOrders: 0,
          totalRevenue: 0,
          lowStock: lowStockProducts
        });
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      }
    };
    loadStats();
  }, []);

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Panel de Administración</h1>
        <Button as={Link} to="/" variant="outline-secondary">
          Volver a la tienda
        </Button>
      </div>

      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="stat-card stat-card-blue">
            <Card.Body>
              <div className="stat-icon">📦</div>
              <h3>{stats.totalProducts}</h3>
              <p>Productos Totales</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stat-card stat-card-green">
            <Card.Body>
              <div className="stat-icon">🛒</div>
              <h3>{stats.totalOrders}</h3>
              <p>Órdenes Totales</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stat-card stat-card-purple">
            <Card.Body>
              <div className="stat-icon">💰</div>
              <h3>${stats.totalRevenue.toLocaleString()}</h3>
              <p>Ingresos Totales</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stat-card stat-card-orange">
            <Card.Body>
              <div className="stat-icon">⚠️</div>
              <h3>{stats.lowStock}</h3>
              <p>Stock Bajo</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={4} className="mb-3">
          <Card className="admin-action-card">
            <Card.Body className="text-center">
              <div className="action-icon">📝</div>
              <h4>Gestionar Productos</h4>
              <p>Agregar, editar o eliminar productos del catálogo</p>
              <Button as={Link} to="/admin/productos" variant="success" className="w-100">
                Ir a Productos
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="admin-action-card">
            <Card.Body className="text-center">
              <div className="action-icon">📋</div>
              <h4>Ver Órdenes</h4>
              <p>Revisar y gestionar las órdenes de los clientes</p>
              <Button as={Link} to="/admin/ordenes" variant="success" className="w-100">
                Ver Órdenes
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="admin-action-card">
            <Card.Body className="text-center">
              <div className="action-icon">➕</div>
              <h4>Agregar Producto</h4>
              <p>Añadir un nuevo producto al catálogo</p>
              <Button as={Link} to="/admin/productos/nuevo" variant="success" className="w-100">
                Crear Producto
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
