<template>
  <v-form @submit.prevent="updateProduct">
    <v-text-field
      v-model="editedProduct.name"
      label="Nama Produk"
    ></v-text-field>
    <v-text-field
      v-model="editedProduct.description"
      label="Deskripsi Produk"
    ></v-text-field>
    <v-text-field
      v-model="editedProduct.price"
      label="Harga Produk"
    ></v-text-field>
    <v-btn type="submit" color="primary">Update</v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editedProduct: {
        id: this.product.id,
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
      },
    };
  },
  methods: {
    updateProduct() {
      this.$emit("productUpdated");
      this.$store.dispatch("product/updateProduct", this.editedProduct);
    },
  },
};
</script>
