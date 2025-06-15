import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { authCheck } from "../utils/authCheck";
import { useNavigate } from "react-router-dom";

const StatusFilterContext = createContext();

export const StatusFilterProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [teams, setTeams] = useState([]);
  const [owners, setOwners] = useState([]);
  const [tags, setTags] = useState([]);
  const [projectStatus, setProjectStatus] = useState();
  const [taskStatus, setTaskStatus] = useState();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const navigate = useNavigate();

  // const response = await axios.get(BASE_URL + "/projects", {withCredentials: true})
  // console.log("From Context:", response.data)

  useEffect(() => {

    
      const fetchAndCheck = async () => {
      const result = await authCheck();

      setIsAuthenticated(result.isAuthenticated)

      if (!result.isAuthenticated) {
        navigate("/");
        return;
      }

      
    };
    
    const timer = setTimeout(fetchAndCheck, 300);
    return () => clearTimeout(timer);
   
    
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Promise.all([
          axios.get(BASE_URL + "/projects", {
            withCredentials: true,
          }),

          axios.get(BASE_URL + "/tasks", {
            withCredentials: true,
          }),

          axios.get(BASE_URL + "/teams", {
            withCredentials: true,
          }),

          axios.get(BASE_URL + "/users", {
            withCredentials: true,
          }),

          axios.get(BASE_URL + "/tags", {
            withCredentials: true,
          }),
        ]);
        setProjects(res[0]?.data?.projects);
        setTasks(res[1]?.data?.tasks);
        setTeams(res[2]?.data?.teams);
        setOwners(res[3]?.data?.users);
        setTags(res[4]?.data?.tags);
        setLoading(false);
      } catch (err) {
        console.error("Error loading data: ", err);
        setLoading(false);
      }
    };

      if(isAuthenticated){

        fetchData()
      }
    
    

    
  }, [isAuthenticated]);

  return (
    <StatusFilterContext.Provider
      value={{
        projectStatus,
        setProjectStatus,
        taskStatus,
        setTaskStatus,
        projects,
        teams,
        owners,
        tags,
        tasks,
        loading,
      }}
    >
      {children}
    </StatusFilterContext.Provider>
  );
};

export const useFilterStatus = () => useContext(StatusFilterContext);
