<template>
  <div class="daily-sales-chart">
    <h2 class="text-center mb-4">Daily Sales</h2>
    <v-card>
      <Bar id="daily-sales-chart" :options="chartOptions" :data="chartData" />
    </v-card>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "DailySalesChart",
  components: { Bar },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    chartData() {
      const data = [
        { date: "2023-08-01", sales: 100 },
        { date: "2023-08-02", sales: 150 },
        { date: "2023-08-03", sales: 120 },
        { date: "2023-08-04", sales: 110 },
        { date: "2023-08-05", sales: 90 },
        { date: "2023-08-06", sales: 80 },
        { date: "2023-08-07", sales: 130 },
        { date: "2023-08-08", sales: 140 },
        { date: "2023-08-09", sales: 160 },
      ];

      const labels = data.map((d) => d.date);
      const datasets = [
        {
          label: "Sales",
          backgroundColor: "steelblue",
          data: data.map((d) => d.sales),
        },
      ];

      return {
        labels,
        datasets,
      };
    },
    chartOptions() {
      return {
        responsive: true,
        scales: {
          x: {
            type: "category",
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            title: {
              display: true,
              text: "Sales",
            },
            beginAtZero: true,
          },
        },
      };
    },
  },
};
</script>

<style scoped>
/* Generate Daily Sales Chart Grid System */
</style>
