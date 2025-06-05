import React from "react";
import { useFilterStatus } from "../context/StatusFilterContext";

const ProjectFilter = () => {
    const statuses = ["In Progress", "Completed"];
    const {projectStatus, setProjectStatus} = useFilterStatus()
  return (
    <div className="bg-gray-100 p-1 rounded">
      <label htmlFor="filter">Filter </label>
      <select
        name="filter"
        id="filter"
        value={projectStatus}
        onChange={(e) => setProjectStatus(e.target.value)}
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

export default ProjectFilter;
