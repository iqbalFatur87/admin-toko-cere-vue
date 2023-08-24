<template>
  <div class="top-selling-products-table">
    <h2 class="text-center mb-4">Top Selling Products</h2>
    <v-table>
      <thead>
        <tr>
          <th scope="col" class="text-left">#</th>
          <th scope="col" class="text-left">Product Name</th>
          <th scope="col" class="text-left">Quantity Sold</th>
          <th scope="col" class="text-left">Revenue</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ product.name }}</td>
          <td>{{ product.quantitySold }}</td>
          <td>{{ product.revenue }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.top-selling-products-table {
  margin-top: 20px;
}
</style>
