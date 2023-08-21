import { createStore } from 'vuex';
import ProductModel from './model/Product';

export default createStore({
  state: {
    userData: null,
    authToken: null,
    products: [],
  },
  mutations: {
    setUserData(state, userData) {
      state.userData = userData;
    },
    setAuthToken(state, authToken) {
      state.authToken = authToken;
    },
    setProducts(state, products){ 
      state.products = products;
    },
    addProduct(state, productData) {
      state.products.push(productData);
    },
    updateProduct(state, { productId, productData }) {
      const index = state.products.findIndex(product => product.id === productId );
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...productData };
      }
    },
    deleteProduct(state, productId) {
      state.products = state.products.filter(product => product.id !== productId);
    },
    clearUserData(state) {
      state.userData = null;
      state.authToken = null;
    },
  },
  actions: {
    async getProducts({ commit }) {
      try {
        console.log("Fetching products from API...");
        const response = await ProductModel.getProducts(); // Ambil seluruh respons
        const products = response.data; // Ambil array produk dari respons
        console.log("Received products:", products);
        commit("setProducts", products); // Simpan array produk di state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async addProduct({ commit }, productData) {
      try {
        console.log("Adding product:", productData);
        await ProductModel.addProduct(productData);
        commit("addProduct", productData); // Use "addProduct" mutation here
        console.log("Product added successfully");
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },
    async updateProduct({ commit }, { productId, productData }) {
      try {
        console.log("Before updating product");
        await ProductModel.updateProduct(productId, productData);
        console.log("Product updated successfully");
        
        console.log("Committing updateProduct mutation");
        commit("updateProduct", { productId, productData });
        console.log("updateProduct mutation committed");
      } catch (error) {
        console.error("Error editing product:", error);
      }
    },
    async deleteProduct({ commit }, productId) {
      try {
        await ProductModel.deleteProduct(productId);
        commit("deleteProduct", productId); // Use "deleteProduct" mutation here
      } catch (error) {
        console.error("Error deleting product:", error);
      }
      console.log("Product deleted successfully"); // Add console.log statement
    },
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getAuthToken(state) {
      return state.authToken;
    },
    getUserData(state) {
      return state.userData;
    },
  }
});
