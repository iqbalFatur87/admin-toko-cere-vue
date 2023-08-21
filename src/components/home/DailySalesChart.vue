<template>
  <Bar id="daily-sales-chart" :options="chartOptions" :data="chartData" />
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
      const data = this.data || [
        { date: "2023-08-01", sales: 100 },
        { date: "2023-08-02", sales: 150 },
        { date: "2023-08-03", sales: 120 },
        // Add more data points...
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
#daily-sales-chart {
  width: 100%;
}
</style>
