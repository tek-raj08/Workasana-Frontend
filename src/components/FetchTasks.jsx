import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useState } from "react";
import DateFormat from "./DateFormat";
import { useFilterStatus } from "../context/StatusFilterContext";
import { useNavigate } from "react-router-dom";

const FetchTasks = ({ searchProject }) => {
  const navigate = useNavigate();
  const { taskStatus } = useFilterStatus();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await axios(`${BASE_URL}/tasks`, {
        withCredentials: true,
      });
      setTasks(response?.data?.tasks);
    } catch (error) {
      if (error?.response?.status === 401) {
        console.warn("JWT expired. Redirecting to login...");

        navigate("/");
        // window.location.href = '/login'
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskNavigate = (t) => {
    navigate(`/task-details/${t._id}`);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6">
      {tasks
        ?.filter((t) =>
          t.name.toLowerCase().includes(searchProject.toLowerCase() || "")
        )
        .filter((t) => (taskStatus ? t.status === taskStatus : true)).length ===
      0 ? (
        <p className="text-gray-500 text-sm col-span-full">No tasks found</p>
      ) : (
        tasks
          ?.filter((t) =>
            t.name.toLowerCase().includes(searchProject.toLowerCase() || "")
          )
          .filter((t) => (taskStatus ? t.status === taskStatus : true))
          .map((t) => (
            <div
              onClick={() => handleTaskNavigate(t)}
              key={t._id}
              className="bg-white rounded-2xl shadow p-6 flex-wrap"
            >
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  t.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : t.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                } `}
              >
                {t.status}
              </span>

              <h2 className="text-lg font-bold px-1 py-2">{t.name}</h2>

              <p className="flex items-center gap-1 font-bold px-2 py-1 text-sm text-gray-400 line-clamp-3">
                Due on: <DateFormat date={t} />
              </p>
            </div>
          ))
      )}
    </div>
  );
};

export default FetchTasks;
