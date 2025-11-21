// src/utils/cartStorage.js
import { getProductById as apiGetProductById } from '../services/apiService';

const STORAGE_KEY = 'huerto_cart';

export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (e) {
    console.warn('Error reading cart from localStorage', e);
    return [];
  }
};

/**
 * Add product to cart. This function is async because it may fetch product details from the API.
 * It stores items in localStorage using the same shape expected across the app.
 */
export const addToCart = async (productId, quantity = 1) => {
  const cart = getCart();

  // Try to get product details from API
  let product = null;
  try {
    product = await apiGetProductById(productId);
  } catch (e) {
    console.warn('Could not fetch product details for cart addition', e);
  }

  // If API didn't return, try to keep at least minimal info
  const nombre = product ? (product.name || product.nombre) : `Producto ${productId}`;
  const precio = product ? (product.price ?? product.precio ?? 0) : 0;
  const imagen = product ? (product.imageUrl || product.imagen) : '/images/products/default.jpg';
  const unidad = product ? (product.unidad || 'kg') : 'unidad';

  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      productId,
      nombre,
      precio,
      quantity,
      imagen,
      unidad
    });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  return cart;
};

export const updateCartItem = (productId, quantity) => {
  const cart = getCart();
  const item = cart.find(i => i.productId === productId);
  if (item) {
    item.quantity = quantity;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    return cart;
  }
  return null;
};

export const removeFromCart = (productId) => {
  const cart = getCart();
  const filtered = cart.filter(i => i.productId !== productId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return filtered;
};

export const clearCart = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  return [];
};

export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + ((item.precio || 0) * item.quantity), 0);
};

export default {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartTotal
};
