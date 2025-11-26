/**
 * API Service - Integración con Backend REST
 * Maneja todas las peticiones HTTP al backend en http://localhost:8080/api
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';
// Base URL to serve static assets (images). Prefer explicit REACT_APP_API_IMAGE_URL
// or derive from REACT_APP_API_URL by removing trailing `/api` segment.
const IMAGE_BASE = (process.env.REACT_APP_API_IMAGE_URL
  || (process.env.REACT_APP_API_URL || 'http://localhost:8080/api').replace(/\/api\/?$/i, '')
).replace(/\/$/, '');

/**
 * Normalize an image path coming from the API or mockData.
 * - If the value is already an absolute URL (http/https) return as-is.
 * - If it starts with `/` treat it as relative to the backend host and prefix IMAGE_BASE.
 * - If falsy, return a default placeholder path under IMAGE_BASE.
 */
const normalizeImage = (imgPath) => {
  if (!imgPath) return `${IMAGE_BASE}/images/products/default.jpg`;
  if (/^https?:\/\//i.test(imgPath)) return imgPath;
  if (imgPath.startsWith('/')) return `${IMAGE_BASE}${imgPath}`;
  // relative paths without leading slash: assume under /images/products/
  return `${IMAGE_BASE}/${imgPath}`;
};

/**
 * Manejo centralizado de respuestas
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    // Try to read JSON error body, fallback to text
    let message = `Error ${response.status}: ${response.statusText}`;
    try {
      const error = await response.json();
      // If backend returns structured error, prefer its message
      if (error && (error.mensaje || error.message)) {
        message = error.mensaje || error.message;
      } else {
        message = JSON.stringify(error);
      }
    } catch (e) {
      try {
        const text = await response.text();
        if (text) message = text;
      } catch (ee) {
        // ignore
      }
    }
    console.error('API error response:', response.status, message);
    throw new Error(message);
  }
  return response.status === 204 ? null : await response.json();
};

// ==================== PRODUCTOS ====================

/**
 * Obtener lista de todos los productos
 * @returns {Promise<Array>} Lista de productos
 */
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    const data = await handleResponse(response);
    // normalize image URLs so the frontend always uses absolute URLs pointing to the backend
    if (Array.isArray(data)) {
      return data.map((p) => ({
        ...p,
        imageUrl: normalizeImage(p.imageUrl || p.imagen || '/images/products/default.jpg'),
      }));
    }
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Obtener un producto específico por ID
 * @param {number} id - ID del producto
 * @returns {Promise<Object>} Datos del producto
 */
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    const data = await handleResponse(response);
    if (data) {
      data.imageUrl = normalizeImage(data.imageUrl || data.imagen || '/images/products/default.jpg');
    }
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

/**
 * Crear nuevo producto
 * @param {Object} product - Datos del producto
 * @returns {Promise<Object>} Producto creado
 */
export const createProduct = async (product) => {
  try {
    console.debug('createProduct - payload:', product);
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    console.debug('createProduct - raw response status:', response.status);
    const data = await handleResponse(response);
    console.debug('createProduct - parsed response:', data);
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * Actualizar producto
 * @param {number} id - ID del producto
 * @param {Object} product - Datos actualizados
 * @returns {Promise<Object>} Producto actualizado
 */
export const updateProduct = async (id, product) => {
  try {
    console.debug('updateProduct - id:', id, 'payload:', product);
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    console.debug('updateProduct - raw response status:', response.status);
    const data = await handleResponse(response);
    console.debug('updateProduct - parsed response:', data);
    return data;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
};

/**
 * Eliminar producto
 * @param {number} id - ID del producto
 * @returns {Promise<void>}
 */
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
};

// ==================== CATEGORÍAS ====================

/**
 * Obtener lista de todas las categorías
 * @returns {Promise<Array>} Lista de categorías
 */
export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Obtener categoría por ID
 * @param {number} id - ID de la categoría
 * @returns {Promise<Object>} Datos de la categoría
 */
export const getCategoryById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    throw error;
  }
};

/**
 * Crear nueva categoría
 * @param {Object} category - Datos de la categoría
 * @returns {Promise<Object>} Categoría creada
 */
export const createCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

/**
 * Actualizar categoría
 * @param {number} id - ID de la categoría
 * @param {Object} category - Datos actualizados
 * @returns {Promise<Object>} Categoría actualizada
 */
export const updateCategory = async (id, category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error updating category ${id}:`, error);
    throw error;
  }
};

/**
 * Eliminar categoría
 * @param {number} id - ID de la categoría
 * @returns {Promise<void>}
 */
export const deleteCategory = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error deleting category ${id}:`, error);
    throw error;
  }
};

// ==================== ORDENES ====================

/**
 * Crear nueva orden (checkout)
 * @param {Object} order - Payload de la orden
 * @returns {Promise<Object>} Orden creada
 */
export const createOrder = async (order) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(order),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// ==================== AUTENTICACIÓN ====================

/**
 * Agregar token a las peticiones autenticadas
 * @returns {Object} Headers con Authorization
 */
const getAuthHeaders = () => {
  const token = getToken();
  if (token) {
    return { 'Authorization': `Bearer ${token}` };
  }
  return {};
};

/**
 * Registrar nuevo usuario
 * @param {Object} userData - Datos del usuario (name, email, password, role)
 * @returns {Promise<Object>} Token y datos del usuario
 */
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await handleResponse(response);
    // Guardar token en localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * Iniciar sesión
 * @param {Object} credentials - Credenciales (email, password)
 * @returns {Promise<Object>} Token y datos del usuario
 */
export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await handleResponse(response);
    // Guardar token en localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

/**
 * Cerrar sesión
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Obtener token del localStorage
 * @returns {string|null} Token JWT
 */
export const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Obtener usuario actual del localStorage
 * @returns {Object|null} Datos del usuario
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Verificar si el usuario está autenticado
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!getToken();
};

export default {
  // Productos
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  // Categorías
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  // Órdenes
  createOrder,
  // Autenticación
  register,
  login,
  logout,
  getToken,
  getCurrentUser,
  isAuthenticated,
};
