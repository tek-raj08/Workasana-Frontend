import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useFilterStatus } from "../context/StatusFilterContext";
import { useParams } from "react-router-dom";
import TaskFilter from "./TaskFilter";
import TaskFormIcon from "./TaskFormIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong, faUser } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

const ProjectDetails = () => {
  const { projects, tasks, taskStatus } = useFilterStatus();
  const { projectId } = useParams();

  const project = projects?.find((p) => p._id === projectId);
  const matchedTask = tasks?.filter((t) => t.project.name === project.name);
  console.log("From Pro-Details:", matchedTask);

  const [displayedTasks, setDisplayedTasks] = useState(matchedTask || []);
  const [originalTasks, setOriginalTasks] = useState(matchedTask || [])

  const handleHighLow = () => {
    const sortedBy = { High: 3, Medium: 2, Low: 1 };

    const sorted = [...displayedTasks].sort(
      (a, b) => sortedBy[b.priority] - sortedBy[a.priority]
    );

    setDisplayedTasks(sorted);
  };

  const handleLowHigh = () => {
    const sortedBy = { High: 3, Medium: 2, Low: 1 };

    const sorted = [...displayedTasks].sort(
      (a, b) => sortedBy[a.priority] - sortedBy[b.priority]
    );
    setDisplayedTasks(sorted);
  };

  const handleNewestFirst = () => {
    const sorted = [...displayedTasks].sort((a,b) => new Date(b.dueDate) - new Date(a.dueDate))

    setDisplayedTasks(sorted)
  }

  const handleOldestFirst = () => {
    const sorted = [...displayedTasks].sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate))

    setDisplayedTasks(sorted)
  }

  useEffect(() => {
    if(!taskStatus || taskStatus===""){
      setDisplayedTasks(originalTasks)
    }else{
      const filtered = originalTasks.filter((task) => task.status === taskStatus)
      setDisplayedTasks(filtered)
    }
  }, [taskStatus, originalTasks])


  // console.log("Task High To Low sorted:", displayedTasks);
  // console.log("Task Low To High sorted:", displayedTasks);

  const colors = [
    "bg-green-200",
    "bg-red-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-orange-200",
  ];

  const getOwnersColor = (name) => {
    const index = name?.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="flex gap-6 m-30">
      <Sidebar />
      <div className="mt-8 w-full">
        <div>
          <h2 className="text-2xl font-semi-bold">{project?.name}</h2>
          <p className="text-sm text-gray-500">{project?.description}</p>
        </div>

        <div className="flex justify-between items-center mt-7">
          <div className="flex justify-between items-center gap-2">
            <h5 className="">Sort by:</h5>
            <div

              onClick={handleHighLow}
              className="border border-gray-800 px-2 py-1 rounded-2xl text-gray-600"
            >
              <button className="cursor-pointer ">Priority High-Low</button>
            </div>

            <div
              onClick={handleLowHigh}
              className="border border-gray-800 px-2 py-1 rounded-2xl text-gray-600 "
            >
              <button className="cursor-pointer ">Priority Low-High</button>
            </div>

            <div onClick={handleNewestFirst} className="border border-gray-800 px-2 py-1 rounded-2xl text-gray-600 ">
              <button className="cursor-pointer ">Newest First</button>
            </div>

            <div onClick={handleOldestFirst} className="border border-gray-800 px-2 py-1 rounded-2xl text-gray-600">
              <button className="cursor-pointer ">Oldest First</button>
            </div>
          </div>

          <div className="flex justify-center items-center gap-1">
            <TaskFilter/>
            <TaskFormIcon />
          </div>
        </div>

        <div>
          {displayedTasks && displayedTasks.length > 0 ? (
            <table className="table-auto border-collapse border border-gray-300 mt-3 rounded-4xl w-full">
            <thead className="bg-sky-100 p-1">
              <tr>
                <th className="text-left px-3 py-0.5">TASKS</th>
                <th className="text-left px-3 py-0.5">OWNERS</th>
                <th className="text-left px-3 py-0.5">PRIORITY</th>
                <th className="text-left px-3 py-0.5">DUE ON</th>
                <th className="text-left px-3 py-0.5">STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {displayedTasks?.map((task, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {task?.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center -space-x-1">
                      <FontAwesomeIcon icon={faUser} />
                      {task.owners.map((owner, index) => (
                        <div
                          key={index}
                          title={owner.firstName}
                          className={`w-5 h-5 rounded-full ${getOwnersColor(
                            owner.firstName
                          )} text-orange-800 flex items-center justify-center text-xs font-semibold border border-white cursor-pointer`}
                        >
                          {owner.firstName.charAt(0).toUpperCase()}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task?.priority}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {format(new Date(task?.dueDate), "do MMMM yyyy")}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task?.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <FontAwesomeIcon icon={faRightLong} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          ) : (
            <div className="text-center text-gray-600 mt-6 text-lg font-medium">
              No tasks found for {taskStatus} status.
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
