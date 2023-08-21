<template>
  <v-card>
    <v-card-title> Tambah Produk </v-card-title>
    <v-card-text>
      <add-product-form @productAdded="onProductAdded" />
    </v-card-text>
  </v-card>
</template>

<script>
import AddProductForm from "./AddProductForm.vue"; // Sesuaikan pathnya
import { mapActions } from "vuex";

export default {
  components: {
    AddProductForm,
  },
  methods: {
    ...mapActions("product", ["addProduct"]),
    onProductAdded() {
      this.$router.push({ name: "Product" }); // Kembali ke halaman daftar produk setelah tambah produk
    },
  },
};
</script>
