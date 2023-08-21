<template>
  <v-card>
    <v-card-title> Edit Produk </v-card-title>
    <v-card-text>
      <edit-product-form
        :product="product"
        @productUpdated="onProductUpdated"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import EditProductForm from "@/components/EditProductForm.vue"; // Sesuaikan pathnya
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    EditProductForm,
  },
  computed: {
    ...mapGetters("product", ["getProductById"]),
  },
  methods: {
    ...mapActions("product", ["updateProduct"]),
    onProductUpdated() {
      this.$router.push({ name: "Product" }); // Kembali ke halaman daftar produk setelah update produk
    },
  },
  created() {
    const productId = this.$route.params.id;
    this.product = this.getProductById(productId);
  },
  data() {
    return {
      product: {},
    };
  },
};
</script>
