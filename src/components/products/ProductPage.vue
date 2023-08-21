<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div>
    <v-card>
      <v-card-title class="headline">Daftar Produk</v-card-title>
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
                    :src="product.image"
                    alt="Product Image"
                    height="50px"
                  />
                  {{ product.image }}
                </td>
                <td class="custom-td">
                  <v-btn @click="openEditModal(product)" color="primary" small>
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
    <v-dialog v-model="editModal" max-width="500px">
      <v-card>
        <v-card-title>Edit Produk</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveEdit">
            <v-text-field
              v-model="editedProduct.name"
              label="Nama"
              outlined
              required
            />
            <v-text-field
              v-model="editedProduct.price"
              label="Harga"
              outlined
              required
            />
            <!-- Add more fields here if needed -->
            <v-text-field
              v-model="editedProduct.image"
              class="invisible"
              label="Gambar"
              outlined
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="closeEditModal">Batal</v-btn>
          <v-btn type="submit" @click="saveEdit" color="success">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

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
      editModal: false,
      editedProduct: {
        shop_id: "",
        name: "",
        price: "",
        image: null, // Initialize to null
      },
    };
  },
  computed: {
    products() {
      return this.$store.getters.getProducts;
    },
  },
  methods: {
    ...mapActions(["deleteProduct"]),
    editProduct(product) {
      this.$router.push({ name: "EditProduct", params: { id: product.id } });
    },
    openEditModal(product) {
      this.editedProduct = { ...product };
      this.editModal = true;
    },

    closeEditModal() {
      this.editedProduct = null;
      this.editModal = false;
    },

    async saveEdit() {
      console.log("editedProduct:", this.editedProduct);

      const { id, name, price, image } = this.editedProduct;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("image", image); // Append the image data to the FormData

      try {
        await this.$store.dispatch("updateProduct", {
          productId: id,
          productData: formData,
        });
        this.closeEditModal();
      } catch (error) {
        console.error("Error editing product:", error);
      }
    },
  },
  created() {
    console.log("ProductPage.vue: Component created. Fetching products...");
    this.$store
      .dispatch("getProducts")
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
