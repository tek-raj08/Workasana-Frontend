import React from "react";
import { useFilterStatus } from "../context/StatusFilterContext";

const TaskFilter = () => {

    const statuses = ["In Progress", "Completed", "To Do", "Blocked"];
    const {taskStatus ,setTaskStatus} = useFilterStatus()

  return (
    <div className="bg-gray-100 p-1 rounded">
      <label htmlFor="filter">Filter </label>
      <select
        name="filter"
        id="filter"
        value={taskStatus}
        onChange={(e) => setTaskStatus(e.target.value)}
      >
        <option value="">All</option>
        {statuses.map((s) => (
          <option value={s} key={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskFilter;
