<template>
  <v-form @submit.prevent="addProduct">
    <v-text-field v-model="name" label="Nama Produk"></v-text-field>
    <v-text-field v-model="description" label="Deskripsi Produk"></v-text-field>
    <v-text-field v-model="price" label="Harga Produk"></v-text-field>
    <v-btn type="submit" color="primary">Tambah</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      description: "",
      price: "",
    };
  },
  methods: {
    addProduct() {
      const newProduct = {
        name: this.name,
        description: this.description,
        price: this.price,
      };
      this.$emit("productAdded", newProduct);
      this.$store.dispatch("product/addProduct", newProduct);
      this.name = "";
      this.description = "";
      this.price = "";
    },
  },
};
</script>
