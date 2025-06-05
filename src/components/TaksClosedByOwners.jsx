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
} from "chart.js";
import { useFilterStatus } from "../context/StatusFilterContext";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TaksClosedByOwners = () => {
  const { tasks } = useFilterStatus();

  const closedTasks = tasks?.filter((task) => task.status === "Completed");

  const ownersTaskCount = {};

  closedTasks?.forEach((task) => {
    const owners = task.owners || [];
    // console.log("Owners:", owners)
    owners.forEach((owner) => {
      const ownerName = owner.firstName;
      if (ownerName) {
        ownersTaskCount[ownerName] = (ownersTaskCount[ownerName] || 0) + 1;
      }
    });
  });

  // console.log("ownersTaskCount:", ownersTaskCount)
  const ownerName = Object.keys(ownersTaskCount);
  const closedCounts = Object.values(ownersTaskCount);

  // console.log("OwnerName:", ownerName)
  // console.log("Closed Count:", closedCounts)

  const data = {
    labels: ownerName,
    datasets: [
      {
        label: "Tasks Closed",
        data: closedCounts, // Replace with your real data
        backgroundColor: [
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 205, 86, 0.7)",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text: "Tasks Closed by Owner",
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
          text: "Tasks Closed",
          font: {
            size: 20,
            weight: "bold",
          },
        },
        ticks: {
          font: {
            size:10,
            weight: 'bold'
          }
        },
      },
      x: {
        title: {
          display: true,
          text: "Owners",
       font: {
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
      {ownerName.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p className="text-xl font-bold flex items-center">
          No completed tasks to display.
        </p>
      )}
    </div>
  );
};

export default TaksClosedByOwners;
