import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  plugins,
  scales,
} from "chart.js";
import { useFilterStatus } from "../context/StatusFilterContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  plugins,
  scales
);

const PendindWorkChart = () => {
  const { tasks, loading } = useFilterStatus();

  if(loading){
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const taskFromLastWeek = tasks?.filter((task) => {
    const createdDate = new Date(task.createdAt);
    return createdDate >= oneWeekAgo && task.status !== "Completed";
  });

  // console.log("Pending task:", taskFromLastWeek);

  const dayCounts = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };

  taskFromLastWeek.forEach((task) => {
    const date = new Date(task.createdAt);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    dayCounts[dayName]++;
  });

  console.log(dayCounts);

  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Days of Work Pending",
        data: [
          dayCounts.Monday,
          dayCounts.Tuesday,
          dayCounts.Wednesday,
          dayCounts.Thursday,
          dayCounts.Friday,
          dayCounts.Saturday,
          dayCounts.Sunday,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.7)", // Teal
          "rgba(255, 99, 132, 0.7)", // Pink/Red
          "rgba(255, 205, 86, 0.7)", // Yellow
          "rgba(54, 162, 235, 0.7)", // Blue
          "rgba(153, 102, 255, 0.7)", // Purple
          "rgba(255, 159, 64, 0.7)", // Orange
        ],

        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false, position: "top" },
      title: {
        display: true,
        text: "Total Days of Work Pending",
        color: "blue",

        padding: {
          top: 20,
          bottom: 20,
        },

        font: {
          size: 25,
          weight: "bold",
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Days Pending",
          font: {
            size: 20,
            weight: "bold",
          },
        },
        ticks: {
          font: {
            size: 10,
            weight: "bold",
          },
        },
      },

      x: {
        title: { display: true, text: "Days", font: {
            size: 20,
            weight: "bold",
          },
        },

        ticks: {
            font: {
                size: 12,
                weight: 'bold'
            }
        }
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PendindWorkChart;
