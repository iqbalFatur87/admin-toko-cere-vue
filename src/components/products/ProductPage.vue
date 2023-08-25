<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div>
    <v-card>
      <v-card-title class="headline">Daftar Produk</v-card-title>
      <!-- Add "Add Product" button-->
      <v-btn color="primary" @click="openProductModal(products)">
        <v-icon>mdi-plus</v-icon>
        Tambah Produk
      </v-btn>
      <!-- Modal For Add Product-->
      <v-dialog v-model="addModal" max-width="600px">
        <v-card>
          <v-card-title class="headline">Tambah Produk</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="saveProduct">
              <v-combobox
                v-model="addedProduct.shop_id"
                :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                label="ID Toko"
                required
              />
              <v-text-field
                v-model="addedProduct.name"
                label="Nama Produk"
                required
              />
              <v-text-field
                v-model="addedProduct.price"
                label="Harga Produk"
                required
              />
              <v-text-field
                v-model="addedProduct.image"
                label="Gambar"
                required
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="danger" @click="closeProductModal">Batal</v-btn>
            <v-btn type="submit" @click="addProduct" color="success"
              >Simpan</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-card-text>
        <v-table>
          <template v-slot:default>
            <thead class="custom-thead">
              <tr>
                <th class="text-left">Shop ID</th>
                <th class="text-left">Nama</th>
                <th class="text-left">Harga</th>
                <th class="text-left">Gambar</th>
                <th class="text-left">Aksi</th>
              </tr>
            </thead>
            <tbody class="custom-tbody">
              <tr
                v-for="product in products"
                :key="product.id"
                class="custom-tr"
              >
                <td class="custom-td">{{ product.shop_id }}</td>
                <td class="custom-td">{{ product.name }}</td>
                <td class="custom-td">Rp {{ product.price }}</td>
                <td class="custom-td">
                  <v-img
                    src="../../assets/logo-cere.png"
                    alt="Product Image"
                    height="50px"
                  />
                </td>
                <td class="custom-td">
                  <v-btn @click="openEditModal(products)" color="primary" small>
                    Edit
                  </v-btn>
                  <v-btn @click="deleteProduct(product.id)" color="error" small>
                    Delete
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-table>
      </v-card-text>
    </v-card>
    <!-- Modal for Edit -->
    <v-dialog v-model="editModal" max-width="600px">
      <v-card>
        <v-card-title class="headline">Edit Produk</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="updateProduct">
            <v-combobox
              v-model="editedProduct.shop_id"
              :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
              label="ID Toko"
              required
            />
            <v-text-field
              v-model="editedProduct.name"
              label="Nama Produk"
              required
            />
            <v-text-field
              v-model="editedProduct.price"
              label="Harga Produk"
              required
            />
            <v-file-input
              v-model="editedProduct.image"
              label="Gambar"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="danger" @click="closeEditModal">Batal</v-btn>
          <v-btn type="submit" @click="updateProduct" color="success"
            >Simpan</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  components: {},
  data() {
    return {
      dialog: false,
      headers: [
        { text: "Shop ID", value: "shop_id" },
        { text: "Nama", value: "name" },
        { text: "Harga", value: "price" },
        { text: "Gambar", value: "image" },
        { text: "Aksi", value: "actions", sortable: false },
      ],
      addModal: false,
      addedProduct: {
        shop_id: "",
        name: "",
        price: "",
        image: "",
      },
      editModal: false,
      editedProduct: {
        shop_id: "",
        name: "",
        price: "",
        image: "",
      },
    };
  },
  computed: {
    products() {
      return this.$store.getters.getProducts;
    },
  },
  methods: {
    ...mapState(["products"]),
    ...mapActions([
      "addProduct",
      "getShops",
      "getShopById",
      "updateProduct",
      "deleteProduct",
    ]),
    ...mapMutations(["addProduct", "updateProduct"]),
    openProductModal(products) {
      this.$store.dispatch("addProduct", products);
      this.addModal = true;
      this.addedProduct = {
        shop_id: "1",
        name: "",
        price: "",
        image: "",
      };
    },
    closeProductModal() {
      this.addModal = false;
    },
    openEditModal(products) {
      this.$store.dispatch("updateProduct", products);
      this.editModal = true;
      this.editedProduct = {
        shop_id: products.shop_id,
        name: products.name,
        price: products.price,
        image: products.image,
      };
    },
    closeEditModal() {
      this.editModal = false;
    },
    async addProduct(productData) {
      try {
        await this.$store.dispatch("addProduct", productData);
        this.addModal = false;
        this.addedProduct = {
          shop_id: "",
          name: "",
          price: "",
          image: "",
        };
      } catch (error) {
        console.log("Error adding product:", error);
      }
    },
    async updateProduct(productData) {
      try {
        await this.$store.dispatch("updateProduct", productData);
        this.editModal = false;
        this.editedProduct = {
          shop_id: "",
          name: "",
          price: "",
          image: "",
        };
      } catch (error) {
        console.log("Error updating product:", error);
      }
    },
    async deleteProduct(productId) {
      try {
        await this.$store.dispatch("deleteProduct", productId);
      } catch (error) {
        console.log("Error deleting product:", error);
      }
    },
  },
  created() {
    console.log("ProductPage.vue: Component created. Fetching products...");
    this.$store
      .dispatch("getProductByShopId")
      .then(() => {
        console.log("ProductPage.vue: Products fetched successfully!");
      })
      .catch((error) => {
        console.error("ProductPage.vue: Error fetching products:", error);
      });
  },
};
</script>

<style scoped>
.headline {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}

.custom-thead {
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: bold;
}

.custom-tbody {
  font-size: 16px;
}

.custom-tr {
  background-color: #f5f5f5;
  transition: background-color 0.2s;
}

.custom-tr:hover {
  background-color: #e0e0e0;
}

.custom-td {
  padding: 10px 20px;
  vertical-align: middle;
}

.v-btn {
  padding-left: 1cm;
  margin: 2%;
}
</style>
