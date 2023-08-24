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
    async getProductById({ commit }, productId) {
      try {
        const response = await ProductModel.getProductById(productId);
        const product = response.data;
        console.log("Received product:", product);
        commit("setProduct", product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    },
    async addProduct({ commit }, productData) {
      try {
        const shopId = 'shop_id';
        await ProductModel.addProduct(productData, shopId);

        console.log("Committing addProduct mutation");
        commit("addProduct", productData);
        console.log("addProduct mutation committed");
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },
    async addShop({ commit }, shopData){
      try {
        console.log("Before adding shop");
        await ProductModel.addShop(shopData);
        console.log("Shop added successfully");
        
        console.log("Committing addShop mutation");
        commit("addShop", shopData);
        console.log("addShop mutation committed");
      } catch (error) {
        console.error("Error adding shop:", error);
      }
    },
    // getShops()
    async getShops({ commit }) {
      try {
        console.log("Fetching shops from API...");
        const response = await ProductModel.getShops(); // Ambil seluruh respons
        const shops = response.data; // Ambil array produk dari respons
        console.log("Received shops:", shops);
        commit("setShops", shops); // Simpan array produk di state
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    },
    async getShopById({ commit }, shopId) {
      try {
        const response = await ProductModel.getShopById(shopId);
        const shop = response.data;
        console.log("Received shop:", shop);
        commit("setShop", shop);
      } catch (error) {
        console.error("Error fetching shop:", error);
      }
    },
    async updateProduct({ commit }, { productId, productData, headers}) {
      try {
        console.log("Before updating product");
        await ProductModel.updateProduct(productId, productData, headers);
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
