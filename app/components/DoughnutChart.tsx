import { Doughnut } from "react-chartjs-2";

import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DoughnutChart = ({ data }: any) => {
  const chartData = {
    // backgroundColor: [
    //   "#FF6384",
    //   "#36A2EB",
    //   "#FFCE56",
    //   // Add more colors if needed
    // ],
    labels: data.map((item: any) => `${item.category}`),
    datasets: [
      {
        data: data.map((item: any) => item._sum.amount),
        backgroundColor: [
          "#34D399",
          "#A78BFA",
          "#F87171",
          "#FB923C",
          "#A3E635",
          "#65A30D",
          "#2DD4BF",
          "#94A3B8",
          "#60A5FA",
          "#FDA4AF",
          "#A7F3D0",
          "#06B6D4",
          // Add more colors if needed
        ],
        hoverBackgroundColor: [
          "#34D399",
          "#A78BFA",
          "#F87171",
          "#FB923C",
          "#A3E635",
          "#65A30D",
          "#2DD4BF",
          "#94A3B8",
          "#60A5FA",
          "#FDA4AF",
          "#A7F3D0",
          "#06B6D4",
          // Add more colors if needed
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options: any = {
    elements: {
      arc: {
        weight: 1,
        borderWidth: 3,
      },
    },
    cutout: "60",
    plugins: {
      // Add the plugins property here
      legend: {
        position: "bottom", // Change the position of the legend to the bottom
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default DoughnutChart;
