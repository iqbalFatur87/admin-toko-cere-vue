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
  extends: Bar,
  data() {
    return {
      chartData: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Yearly Sales",
            backgroundColor: "#3498db",
            data: [250, 380, 470, 350, 550, 480],
          },
        ],
      },
      chartOptions: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Months",
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
            text: "Yearly Sales",
            font: {
              size: 18,
            },
          },
          legend: {
            display: true,
            position: "bottom",
          },
        },
      },
    };
  },
};
</script>
