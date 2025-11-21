// src/pages/Admin/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, createProduct, updateProduct, getCategories } from '../../services/apiService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoriaId: '',
    imagen: '/images/products/manzanas.jpg',
    enOferta: false,
    precioOferta: '',
    destacado: false,
    unidad: 'kg'
  });

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const cats = await getCategories();
        // categories state will be set below
        setCategories(cats);

        if (isEditMode) {
          const product = await getProductById(id);
          if (product) {
            setFormData({
              nombre: product.name || '',
              descripcion: product.description || '',
              precio: product.price ? product.price.toString() : '',
              stock: product.stock ? product.stock.toString() : '',
              categoriaId: product.category ? product.category.id : (cats[0] ? cats[0].id : ''),
              imagen: product.imageUrl || '/images/products/manzanas.jpg',
              enOferta: product.enOferta || false,
              precioOferta: product.precioOferta ? product.precioOferta.toString() : '',
              destacado: product.destacado || false,
              unidad: product.unidad || 'kg'
            });
          } else {
            navigate('/admin/productos');
          }
        }
      } catch (err) {
        console.error('Error loading categories or product:', err);
      }
    };
    load();
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.descripcion.trim()) newErrors.descripcion = 'La descripción es requerida';
    if (!formData.precio || parseFloat(formData.precio) <= 0) newErrors.precio = 'El precio debe ser mayor a 0';
    if (!formData.stock || parseInt(formData.stock) < 0) newErrors.stock = 'El stock debe ser 0 o mayor';
    if (formData.enOferta && (!formData.precioOferta || parseFloat(formData.precioOferta) <= 0)) newErrors.precioOferta = 'El precio de oferta es requerido si está en oferta';
    if (formData.enOferta && parseFloat(formData.precioOferta) >= parseFloat(formData.precio)) newErrors.precioOferta = 'El precio de oferta debe ser menor al precio regular';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Por favor corrige los errores del formulario', {
        icon: "❌"
      });
      return;
    }

    // Map local form fields to API payload
    const productData = {
      name: formData.nombre,
      description: formData.descripcion,
      price: parseFloat(formData.precio),
      imageUrl: formData.imagen,
      categoryId: parseInt(formData.categoriaId),
      stock: formData.stock ? parseInt(formData.stock) : 0,
      precioOferta: formData.enOferta ? parseFloat(formData.precioOferta) : null,
      destacado: formData.destacado,
      unidad: formData.unidad
    };

    try {
      if (isEditMode) {
        await updateProduct(id, productData);
        toast.success(
          <div>
            <strong>Producto actualizado</strong>
            <div className="small mt-1">{formData.nombre}</div>
          </div>,
          { icon: "✅" }
        );
        setTimeout(() => navigate('/admin/productos'), 1500);
      } else {
        await createProduct(productData);
        toast.success(
          <div>
            <strong>Producto creado exitosamente</strong>
            <div className="small mt-1">{formData.nombre}</div>
          </div>,
          { icon: "✨" }
        );
        setTimeout(() => navigate('/admin/productos'), 1500);
      }
    } catch (err) {
      console.error('Error saving product:', err);
      toast.error('Error al guardar el producto: ' + (err.message || ''), { icon: '❌' });
    }
  };

  return (
    <Container className="py-5">
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>{isEditMode ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            <Button variant="outline-secondary" onClick={() => navigate('/admin/productos')}>
              ← Volver
            </Button>
          </div>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Producto *</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    isInvalid={!!errors.nombre}
                  />
                  <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Categoría *</Form.Label>
                  <Form.Select name="categoriaId" value={formData.categoriaId} onChange={handleChange} required>
                    <option value="">Seleccionar categoría...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Descripción *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                isInvalid={!!errors.descripcion}
              />
              <Form.Control.Feedback type="invalid">{errors.descripcion}</Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio Regular ($) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    isInvalid={!!errors.precio}
                  />
                  <Form.Control.Feedback type="invalid">{errors.precio}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock *</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    isInvalid={!!errors.stock}
                  />
                  <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Unidad de Medida</Form.Label>
                  <Form.Select name="unidad" value={formData.unidad} onChange={handleChange}>
                    <option value="kg">Kilogramo (kg)</option>
                    <option value="unidad">Unidad</option>
                    <option value="litro">Litro</option>
                    <option value="500g">500 gramos</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>URL de Imagen</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                placeholder="/images/products/nombre.jpg"
              />
              <Form.Text className="text-muted">
                Coloca la imagen en public/images/products/ y usa la ruta relativa
              </Form.Text>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="enOferta"
                    label="¿Está en oferta?"
                    checked={formData.enOferta}
                    onChange={handleChange}
                  />
                </Form.Group>

                {formData.enOferta && (
                  <Form.Group className="mb-3">
                    <Form.Label>Precio de Oferta ($) *</Form.Label>
                    <Form.Control
                      type="number"
                      name="precioOferta"
                      value={formData.precioOferta}
                      onChange={handleChange}
                      isInvalid={!!errors.precioOferta}
                    />
                    <Form.Control.Feedback type="invalid">{errors.precioOferta}</Form.Control.Feedback>
                  </Form.Group>
                )}
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="destacado"
                    label="¿Es producto destacado?"
                    checked={formData.destacado}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid gap-2 mt-4">
              <Button variant="success" type="submit" size="lg">
                {isEditMode ? '💾 Guardar Cambios' : '➕ Crear Producto'}
              </Button>
              <Button variant="outline-secondary" onClick={() => navigate('/admin/productos')}>
                Cancelar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductForm;
