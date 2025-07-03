"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Filler,
  Tooltip,
  Legend,
  ChartDataLabels
);

// Common options for line charts
const lineChartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      bottom: 0, // Removes extra bottom spacing
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#FFFFFF",
      titleColor: "#666",
      bodyColor: "#666",
      borderColor: "#CCCCCC",
      borderWidth: 1,
      padding: 8,
      displayColors: false,
    },
    datalabels: {
      color: "#4D4D4D", // Color of the text
      anchor: "end", // Position above bars
      align: "top",
      font: {
        size: 9.5,
        weight: "normal",
      },
    },
  },

  scales: {
    x: {
      border: {
        dash: [3, 2],
      },
      grid: {
        color: "#CCCCCC",
      },
      ticks: {
        color: "#4D4D4D",
        font: {
          size: 9.5,
        },
      },
    },
    y: {
      min: 10,
      max: 50,
      border: {
        dash: [3, 2],
      },
      grid: {
        color: "#CCCCCC",
      },
      ticks: {
        stepSize: 10,
        color: "#4D4D4D",
        font: {
          size: 9.5,
        },
      },
    },
  },
  elements: {
    line: {
      borderWidth: 1.5,
      tension: 0.2,
    },
    point: {
      radius: 1,
      borderWidth: 1,
      backgroundColor: "white",
    },
  },
};

// Bar chart options
const barChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      bottom: 0, // Removes extra bottom spacing
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#FFFFFF",
      titleColor: "#666",
      bodyColor: "#666",
      borderColor: "#CCCCCC",
      borderWidth: 1,
      padding: 8,
      displayColors: false,
    },
    datalabels: {
      color: "#4D4D4D", // Color of the text
      anchor: "end", // Position above bars
      align: "top",
      font: {
        size: 9.5,
        weight: "normal",
      },
    },
  },
  scales: {
    x: {
      border: {
        dash: [3, 2],
      },
      grid: {
        color: "#CCCCCC",
      },
      ticks: {
        color: "#4D4D4D",
        font: {
          size: 9.5,
        },
      },
    },
    y: {
      min: 0,
      max: 100,
      border: {
        dash: [3, 2],
      },
      grid: {
        color: "#CCCCCC",
      },
      ticks: {
        stepSize: 25,
        color: "#4D4D4D",
        font: {
          size: 9.5,
        },
      },
    },
  },
};

// Weekly Appointments Bar Chart
export const WeeklyAppointmentsChart = () => {
  const data = {
    labels: ["M", "T", "W", "TH", "F", "ST", "S"],
    datasets: [
      {
        data: [40, 20, 10, 29, 11, 71, 83],
        backgroundColor: "#B3DB8A", // Light green color
        barThickness: 25, // Controls the bar width directly (Reduce this for thinner bars)
        maxBarThickness: 20, //  Prevents bars from becoming too wide
        categoryPercentage: 0.9, //  Adjusts spacing between bars (Lower value = Thinner bars)
        barPercentage: 0.9, // Controls bar width relative to category
      },
    ],
  };

  return (
    <div
      style={{
        height: "184px",
        width: "100%",
        paddingLeft: "7px",
        paddingTop: "3px",
      }}
    >
      <Bar data={data} options={barChartOptions} />
    </div>
  );
};

// New Patients Line Chart
export const NewPatientsChart = () => {
  const data = {
    labels: ["M", "T", "W", "TH", "F", "ST", "S"],
    datasets: [
      {
        data: [10, 30, 15, 25, 20, 10, 20],
        borderColor: "#B3DB8A", // Green color
        pointBackgroundColor: "#FB009C",
        pointBorderColor: "#FB009C",
        fill: true, // Enable filling
        backgroundColor: "#FAFCF7", // Light green color with transparency
      },
    ],
  };

  return (
    <div
      style={{
        height: "184px",
        width: "100%",
        paddingLeft: "5px",
        paddingTop: "3px",
      }}
    >
      <Line data={data} options={lineChartOptions} />
    </div>
  );
};

// Test Data Line Chart
export const TestDataChart = () => {
  const data = {
    labels: ["M", "T", "W", "TH", "F", "ST", "S"],
    datasets: [
      {
        data: [10, 30, 15, 25, 20, 10, 20],
        borderColor: "#B3DB8A", // Green color
        pointBackgroundColor: "#FB009C",
        pointBorderColor: "#FB009C",
        fill: true, // Enable filling
        backgroundColor: "#FAFCF7", // Light green color with transparency
      },
    ],
  };

  return (
    <div
      style={{
        height: "184px",
        width: "100%",
        paddingLeft: "7px",
        paddingTop: "3px",
      }}
    >
      <Line data={data} options={lineChartOptions} />
    </div>
  );
};
