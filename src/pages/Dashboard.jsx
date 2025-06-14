import {
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "../components/Sidebar";
import FetchProjects from "../components/FetchProjects";
import FetchTasks from "../components/FetchTasks";
import ProjectHeader from "../components/ProjectHeader";
import TaskHeader from "../components/TaskHeader";
import { useEffect, useState } from "react";

const Dashboard = () => {

  const [searchProject, setSearchProject] = useState("")
  
  // useEffect(() => {
  //   if(!sessionStorage.getItem("reloadedAfterLogin")){
  //     sessionStorage.setItem("reloadedAfterLogin", "true");
  //     window.location.reload()
  //   }
  // }, [])

  const handleSearch  = (e) => {
    setSearchProject(e.target.value)
  }

  return (
    <div className="flex gap-6 m-30">
      <Sidebar />

      <div className="w-full">
        <div className="flex items-center border rounded mt-1">
          <input
            type="text"
            value={searchProject || ""}
            onChange={handleSearch}
            placeholder="Search"
            className="w-full focus: outline-0 px-2"
          />
          <div className="bg-gray-300 px-1.5 py-1">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>

        <div>
          <ProjectHeader/>
        </div>

        <div>
          <FetchProjects searchProject={searchProject}/>
        </div>

        <div>
          <TaskHeader/>
        </div>

        <div>
        <FetchTasks searchProject={searchProject}/>
      </div>
      </div>

      
    </div>
  );
};

export default Dashboard;
