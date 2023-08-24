import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': true,
  },
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
  async getProductById(productId) {
    try {
      const response = await api.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },
  async addShop(shopData) {
    try {
      console.log('Adding shop:', shopData);
      await api.post('/shops', shopData);
    } catch (error) {
      console.error('Error adding shop:', error);
    }
  },
  async getShops() {
    try {
      const response = await api.get('/shops');
      return response.data;
    } catch (error) {
      console.error('Error fetching shops:', error);
      return [];
    }
  },
  async getShopById(shopId) {
    try {
      const response = await api.get(`/shops/${shopId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching shop:', error);
      return null;
    }
  },
  // addProduct : conditions = Shop Id is required
  async addProduct(productData, shopId) {
    try {
      console.log('Adding product:', productData);
      productData.shop_id = shopId;
      await api.post('/products', productData);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  },
  async updateProduct(productId, productData) {
    try {
      console.log(`Updating product with ID: ${productId}`);
      console.log('Product data:', productData);
      
      const response = await api.put(`/products/${productId}`, productData);
      return response.data;
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
