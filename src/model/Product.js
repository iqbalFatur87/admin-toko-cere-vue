import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
});

export default {
  async getProducts(shop_id = null) {
    try {
      const url = shop_id ? `/shop/product/${shop_id}` : '/products';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },
  
  async addProduct(productData) {
    try {
      await api.post('/products', productData);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  },
  async editProduct(productId, productData) {
    try {
      await api.put(`/products/${productId}`, productData);
    } catch (error) {
      console.error('Error editing product:', error);
    }
  },
  async deleteProduct(productId) {
    try {
      await api.delete(`/products/${productId}`);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  },
};
