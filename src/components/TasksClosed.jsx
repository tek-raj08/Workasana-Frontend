
import React from 'react'
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { useFilterStatus } from '../context/StatusFilterContext';

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend, Title);


const TasksClosed = () => {

    const {tasks, teams} = useFilterStatus()
    console.log(tasks)

    const closedTasks = tasks?.filter((task) => task.status === "Completed")

    const teamTaskCount = {}

    closedTasks?.forEach((task) => {
        const teamName = task.team.name || "Unknown"

        teamTaskCount[teamName] = (teamTaskCount[teamName] || 0) + 1
    })

    const teamName = Object.keys(teamTaskCount)
    const teamCount = Object.values(teamTaskCount)

     const data = {
    labels: teamName,
    datasets: [
      {
        label: 'Tasks Closed',
        data: teamCount, // Replace with your real data
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 99, 132, 0.7)'
        ],
        borderColor: '#fff',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Tasks Closed by Team',
        color: "blue",

        padding: {
          top: 20,
          bottom: 20,
        },

        font: {
          size: 25,
          weight: "bold",
        },
      }
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        {teamName.length > 0 ? (

      <Pie data={data} options={options}/>
        ) : (
            <p className='text-xl font-bold flex items-center'>No Closed tasks to display.</p>
        )}
    </div>
  )
}

export default TasksClosed
