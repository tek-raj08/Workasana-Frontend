import React from "react";
import ReportTotalWorkDone from "../components/ReportTotalWorkDone";
import Sidebar from "../components/Sidebar";
import PendindWorkChart from "../components/PendindWorkChart";
import TasksClosed from "../components/TasksClosed";
import TaksClosedByOwners from "../components/TaksClosedByOwners";

const Report = () => {
  return (
    <div className="flex gap-6 m-30">
      <Sidebar />
      <div className="w-full">
        <div className="bg-gray-50 mt-3 mb-5 p-2">
          <ReportTotalWorkDone />
        </div>

        <div className="bg-gray-50 mt-3 mb-5 p-2">
          <PendindWorkChart />
        </div>

        <div className="bg-gray-50 mt-3 mb-5 p-2">
          <TasksClosed />
        </div>

        <div className="bg-gray-50 mt-3 mb-5 p-2">
          <TaksClosedByOwners />
        </div>
      </div>
    </div>
  );
};

export default Report;
