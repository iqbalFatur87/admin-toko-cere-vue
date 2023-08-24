<template>
  <div class="sales-overview-panel">
    <h2 class="text-center mb-4">Sales Overview</h2>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <p class="card-text">Daily Sales</p>
            <p class="card-number">{{ dailySales }}</p>
          </v-col>
          <v-col cols="4">
            <p class="card-text">Weekly Sales</p>
            <p class="card-number">{{ weeklySales }}</p>
          </v-col>
          <v-col cols="4">
            <p class="card-text">Yearly Sales</p>
            <p class="card-number">{{ yearlySales }}</p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    dailySales: {
      type: Number,
      required: true,
    },
    weeklySales: {
      type: Number,
      required: true,
    },
    yearlySales: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.sales-overview-panel {
  margin-top: 20px;
}
.card {
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.card-body {
  padding: 20px;
}
.card-text {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}
.card-number {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
</style>
