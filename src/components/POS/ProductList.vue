<template>
  <div class="product-list">
    <h2>Product List</h2>
    <v-row>
      <v-col cols="6" v-for="product in productList" :key="product.id">
        <v-card class="mb-3">
          <v-card-text>
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.price }}</p>
            <v-btn color="primary" @click="addToCart(product)"
              >Add to Cart</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    productList: Array, // Terima properti productList dari komponen induk
  },
  methods: {
    addToCart(product) {
      // Panggil metode addToCart dari komponen induk
      this.$emit("add-to-cart", product);
    },
  },
};
</script>

<style scoped>
/* Gaya CSS untuk ProductList.vue */
</style>
