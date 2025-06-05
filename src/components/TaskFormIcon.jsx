import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

const TaskFormIcon = () => {
    const navigate = useNavigate()

    const handleTaskForm = () => {
        navigate("/form-task")

    }
  return (
    <div
      onClick={handleTaskForm}
      className="flex items-center bg-blue-800 p-1 rounded gap-1 cursor-pointer"
    >
      <div className="text-white">
        <FontAwesomeIcon icon={faPlus} />
      </div>
      <p className="text-white">New Task</p>
    </div>
  );
};

export default TaskFormIcon;
