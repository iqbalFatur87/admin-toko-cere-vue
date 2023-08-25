<template>
  <div class="yearly-sales-chart">
    <h2 class="text-center mb-4">Yearly Sales</h2>
    <Bar id="yearly-sales-chart" :options="chartOptions" :data="chartData" />
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
  name: "YearlySalesChart",
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
        { month: "Jan", sales: 100 },
        { month: "Feb", sales: 150 },
        { month: "Mar", sales: 120 },
        { month: "Apr", sales: 110 },
        { month: "May", sales: 90 },
        { month: "Jun", sales: 80 },
        { month: "Jul", sales: 130 },
        { month: "Aug", sales: 140 },
        { month: "Sep", sales: 160 },
        { month: "Oct", sales: 170 },
        { month: "Nov", sales: 180 },
        { month: "Dec", sales: 190 },
      ];

      const labels = data.map((d) => d.month);
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
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    },
  },
};
</script>
