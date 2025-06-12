import React from "react";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFilterStatus } from "../context/StatusFilterContext";

const FetchProjects = ({ searchProject }) => {
  const navigate = useNavigate()
  const {projectStatus} = useFilterStatus()
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true)


  const handleNavgate = (p) => {
    navigate(`/project-details/${p._id}`)
  }

  const fetchProject = async () => {
    // const token = localStorage.getItem("token")

    try {
      const res = await axios.get(`${BASE_URL}/projects`, {
        withCredentials: true,
      });
      setProjects(res?.data?.projects);
      // {headers: {"Authorization": `Bearer ${token}`}}
    } catch (err) {
      if (err?.response?.data?.ERROR === "jwt expired") {
        console.warn("JWT expired. Redirecting to login...");

        navigate("/login");
        // window.location.href = '/login'
      }
      console.error(err);
    } finally {
      setLoading(false)
    }
  };

  

  useEffect(() => {
    fetchProject();
  }, []);

  if (loading) {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}


  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6">
      {projects?.filter((p) =>
        p.name.toLowerCase().includes(searchProject?.toLowerCase() || "")
      )
      .filter((p) => projectStatus? p.status === projectStatus : true)
      .length === 0 ? (
        <p className="text-gray-500 text-sm col-span-full">No projects found.</p>
      ) : (
        projects
          ?.filter((p) =>
            p.name.toLowerCase().includes(searchProject?.toLowerCase() || "")
          )
          .filter((p) => projectStatus ? p.status === projectStatus : true)
          .map((p) => (
            
            <div onClick={() =>  handleNavgate(p)}
              key={p._id}
              className="bg-white rounded-2xl shadow p-6 flex-wrap"
            >
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  p.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : p.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                } `}
              >
                {p.status}
              </span>

              <h2 className="text-lg font-bold px-1 py-2">{p.name}</h2>

              <p className="px-2 py-1 text-sm text-gray-600 line-clamp-3">
                {p.description}
              </p>
            </div>
            
          ))
      )}
    </div>
  );
};

export default FetchProjects;
