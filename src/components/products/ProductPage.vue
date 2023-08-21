<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div>
    <v-card>
      <v-card-title class="headline">Daftar Produk</v-card-title>
      <v-card-text>
        <v-button>
          <!-- 'Add Product' Button and Modals -->
          <v-icon>mdi-plus</v-icon>
          Add Product
          <v-modal
            title="Add Product"
            :show="show"
            @close="show = false"
          >
            <template v-slot:default>
              <AddProductForm />
            </template>
          </v-modal>
        </v-button>
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
                </td>
                <!-- Add Trash Icon and Pencil Icon with Font Awesome or MDI-->
                <td class="custom-td">
                  <v-btn @click="editProduct(product)" color="primary" small>
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
  </div>
</template>

<script>
import AddProductForm from "./AddProductForm.vue";
// import AddProductPage from "./AddProductPage.vue";
import { mapActions } from "vuex";

export default {
  components: {
    AddProductForm,
    // AddProductPage,
  },
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
