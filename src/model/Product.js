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
      console.log('Adding product:', productData);
      await api.post('/products', productData);
      console.log('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  },
  async updateProduct(productId, productData) {
    try {
      console.log(`Updating product with ID: ${productId}`);
      console.log('Product data:', productData);
      
      await api.put(`/products/${productId}`, productData);
      console.log('Product updated successfully');
    } catch (error) {
      console.error('Error editing product:', error);
    }
  },
  async deleteProduct(productId) {
    try {
      console.log('Deleting product:', productId);
      await api.delete(`/products/${productId}`);
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  },
};
