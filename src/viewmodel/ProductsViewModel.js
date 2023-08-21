import { mapState, mapActions } from "vuex";
import ProductModel from "@/model/Product"; // Ubah impor ini sesuai dengan nama yang benar

export default {
  computed: {
    ...mapState(['products']),
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    ...mapActions(['fetchProducts', 'addProduct', 'updateProduct', 'deleteProduct']), // Ubah "editProduct" menjadi "updateProduct"
    async fetchProducts() {
      try {
        console.log("Fetching products from ProductsViewModel...");
        await this.getProducts();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async fetchProductsByShop(shop_id) {
      try {
        const products = await ProductModel.getProducts(shop_id);
        this.setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },    
    async addProduct(productData) {
      try {
        await ProductModel.addProduct(productData); // Gunakan nama Model yang benar
        this.fetchProducts();
      } catch (error) {
        console.error('Error adding product:', error);
      }
    },
    async editProduct(productId, productData) {
      try {
        await ProductModel.updateProduct(productId, productData); // Gunakan nama Model yang benar
        this.fetchProducts();
      } catch (error) {
        console.error('Error editing product:', error);
      }
    },
    async deleteProduct(productId) {
      try {
        await ProductModel.deleteProduct(productId); // Gunakan nama Model yang benar
        this.fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  },
};
