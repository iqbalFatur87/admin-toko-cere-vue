<template>
  <div class="dashboard">
    <!-- Daily Sales Chart -->
    <v-container class="mt-5">
      <v-row>
        <v-col>
          <v-carousel
            hide-delimiters
            hide-delimiter-background
            show-arrows="hover"
          >
            <v-carousel-item>
              <daily-sales-chart :data="dailySalesData" />
            </v-carousel-item>
            <v-carousel-item>
              <monthly-sales-chart :data="monthlySalesData" />
            </v-carousel-item>
            <v-carousel-item>
              <yearly-sales-chart :data="yearlySalesData" />
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col>
          <sales-overview-panel
            :daily-sales="dailyTotalSales"
            :weekly-sales="weeklyTotalSales"
            :yearly-sales="yearlyTotalSales"
          />
        </v-col>
      </v-row>
    </v-container>
    <!-- Top Selling Products Table -->
    <v-container class="flex">
      <top-selling-products-table :products="topSellingProducts" />
    </v-container>
  </div>
</template>

<script>
import DailySalesChart from "../home/DailySalesChart.vue";
import MonthlySalesChart from "../home/MonthlySalesChart.vue";
import YearlySalesChart from "../home/YearlySalesChart.vue";
import SalesOverviewPanel from "../home/SalesOverviewPanel.vue";
import TopSellingProductsTable from "../home/TopSellingProductsTable.vue";

export default {
  components: {
    DailySalesChart,
    MonthlySalesChart,
    YearlySalesChart,
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
.dashboard {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
}

top-selling-products-table {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
