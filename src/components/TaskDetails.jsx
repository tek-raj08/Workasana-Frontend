import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFilterStatus } from "../context/StatusFilterContext";
import Sidebar from "./Sidebar";
import { format, formatDistanceToNow } from "date-fns";

const TaskDetails = () => {
  const { taskId } = useParams();
  const { tasks } = useFilterStatus();
  const navigate = useNavigate()

  const selectedTask = tasks.find((task) => task._id === taskId);
  // console.log("Selected Task:", selectedTask);

    const dueDate = selectedTask?.dueDate ? new Date(selectedTask?.dueDate) : null
    
  const daysLeft = dueDate && !isNaN(dueDate) ?  formatDistanceToNow(new Date(dueDate), {
    addSuffix: true,
  }) : "Due date not available."

  const handleUpdateForm = () => {
    alert("Marking for status Completed.")
    navigate(`/task-status-update/${taskId}`)
  }

  return (
    <div>
    <h1 className="text-3xl font-bold text-blue-700 pt-5 flex justify-center items-center ">
          Task: {selectedTask?.name}
        </h1>
    <div className="flex gap-6 mx-30 my-10">
        
      <Sidebar />

      <div className="w-full mt-6 p-6 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">
          Task Details
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p>
              <strong>Project:</strong> {selectedTask?.project.name}
            </p>
            <p>
              <strong>Teams:</strong> {selectedTask?.team.name}
            </p>
            <p>
              <strong>Owners:</strong>{" "}
              {selectedTask?.owners
                ?.map((o) => `${o.firstName} ${o.lastName}`)
                .join(", ")}
            </p>
            <p>
              <strong>Tags:</strong> {selectedTask?.tags.join(",") || "None"}
            </p>
          </div>

          <div>
            <p>
              <strong>Due Date:</strong>{" "}
              {format(new Date(dueDate), "do MMM yyyy")}
            </p>
            <p>
              <strong>Status:</strong> {selectedTask?.status}
            </p>
            <p>
              <strong>Time Remaining:</strong> {daysLeft}
            </p>

            {selectedTask?.status !== "Completed" && (
              <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                onClick={handleUpdateForm} 
              >
                Mark as Complete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};


export default TaskDetails;
