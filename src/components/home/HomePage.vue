<template>
  <div class="dashboard">
    <!-- Header -->
    <v-jumbotron class="text-center bg-primary text-white">
      <h1 class="display-4">Sales Dashboard</h1>
      <p class="lead">Visualize and analyze your sales data</p>
    </v-jumbotron>

    <!-- Daily Sales Chart -->
    <v-container class="mt-5">
      <h2 class="text-center mb-4">Daily Sales Trend</h2>
      <daily-sales-chart :data="dailySalesData" />
    </v-container>

    <!-- Sales Overview Panel -->
    <v-container class="mt-5">
      <sales-overview-panel
        :daily-sales="dailyTotalSales"
        :weekly-sales="weeklyTotalSales"
        :yearly-sales="yearlyTotalSales"
      />
    </v-container>

    <!-- Top Selling Products Table -->
    <v-container class="mt-5">
      <h2 class="text-center mb-4">Top Selling Products</h2>
      <top-selling-products-table :products="topSellingProducts" />
    </v-container>
  </div>
</template>

<script>
import DailySalesChart from "../home/DailySalesChart.vue";
import SalesOverviewPanel from "../home/SalesOverviewPanel.vue";
import TopSellingProductsTable from "../home/TopSellingProductsTable.vue";

export default {
  components: {
    DailySalesChart,
    SalesOverviewPanel,
    TopSellingProductsTable,
  },
  data() {
    return {
      dailySalesData: [], // Dummy data for daily sales chart
      dailyTotalSales: 1500, // Dummy data for daily total sales
      weeklyTotalSales: 9500, // Dummy data for weekly total sales
      yearlyTotalSales: 120000, // Dummy data for yearly total sales
      topSellingProducts: [
        // Dummy data for top selling products
        { name: "Product A", quantitySold: 120, revenue: 2400 },
        { name: "Product B", quantitySold: 90, revenue: 1800 },
        { name: "Product C", quantitySold: 80, revenue: 1600 },
        // Add more products...
      ],
    };
  },
};
</script>

<style scoped>
/* Add custom styling here to make the Dashboard visually appealing */
</style>
