<template>
  <div class="sales-overview-panel">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Sales Overview</h5>
        <div class="row">
          <div class="col-md-4">
            <p class="card-text">Daily Sales</p>
            <p class="card-number">{{ dailySales }}</p>
          </div>
          <div class="col-md-4">
            <p class="card-text">Weekly Sales</p>
            <p class="card-number">{{ weeklySales }}</p>
          </div>
          <div class="col-md-4">
            <p class="card-text">Yearly Sales</p>
            <p class="card-number">{{ yearlySales }}</p>
          </div>
        </div>
      </div>
    </div>
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
