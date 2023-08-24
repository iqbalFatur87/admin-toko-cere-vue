<template>
  <div class="monthly-sales-chart">
    <h2 class="text-center mb-4">Monthly Sales</h2>
    <Bar id="monthly-sales-chart" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarController,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarController,
  CategoryScale,
  LinearScale
);

export default {
  // TODO : Call API from Laravel
  name: "monthlySalesChart",
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
        // Weekly Sales Chart Dummy
        {
          week: "Week 1 - M1",
          sales: 100,
        },
        {
          week: "Week 2 - M1",
          sales: 150,
        },
        {
          week: "Week 3 - M1",
          sales: 120,
        },
        {
          week: "Week 4 - M1",
          sales: 110,
        },
      ];

      const labels = data.map((d) => d.week);
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
        scales: {
          x: {
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
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Monthly Sales",
          },
        },
      };
    },
  },
};
</script>

<style scoped>
.monthly-sales-chart {
  max-width: 800px;
  margin: 0 auto;
}
</style>
