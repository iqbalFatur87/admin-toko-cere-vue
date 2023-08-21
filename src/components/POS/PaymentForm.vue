<template>
  <div class="payment-form">
    <h2>Payment Form</h2>
    <v-form @submit.prevent="processPayment">
      <v-select v-model="paymentMethod" label="Payment Method">
        <v-list-item
          v-for="(method, index) in paymentMethods"
          :key="index"
          :value="method"
          >{{ method }}</v-list-item
        >
      </v-select>
      <v-text-field
        v-model="amountTendered"
        label="Amount Tendered"
      ></v-text-field>
      <v-btn color="primary" type="submit">Submit Payment</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paymentMethod: "cash",
      amountTendered: "",
      paymentMethods: ["cash", "credit"],
    };
  },
  methods: {
    processPayment() {
      // Panggil metode processPayment dari komponen induk
      this.$emit("process-payment", this.paymentMethod, this.amountTendered);
    },
  },
};
</script>

<style scoped>
/* Gaya CSS untuk PaymentForm.vue */
</style>
