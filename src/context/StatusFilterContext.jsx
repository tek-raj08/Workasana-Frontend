import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const StatusFilterContext = createContext();

export const StatusFilterProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [teams, setTeams] = useState([]);
  const [owners, setOwners] = useState([]);
  const [tags, setTags] = useState([]);
  const [projectStatus, setProjectStatus] = useState();
  const [taskStatus, setTaskStatus] = useState();

  // const response = await axios.get(BASE_URL + "/projects", {withCredentials: true})
  // console.log("From Context:", response.data)
  const fetchProject = async () => {
    try {
      const res = await axios.get(BASE_URL + "/projects", {
        withCredentials: true,
      });
      setProjects(res?.data?.projects);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(BASE_URL + "/tasks", {
        withCredentials: true,
      });
      setTasks(res?.data?.tasks);
      // console.log("Task from Context: ", res?.data?.tasks)
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTeams = async () => {
    try {
      const res = await axios.get(BASE_URL + "/teams", {
        withCredentials: true,
      });
      setTeams(res?.data?.teams);
      // console.log("From COntext:", res?.data?.teams)
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(BASE_URL + "/users", {
        withCredentials: true,
      });
      setOwners(res?.data?.users);
      // console.log("From COntext users:", res?.data?.users)
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTags = async () => {
    try {
      const res = await axios.get(BASE_URL + "/tags", {
        withCredentials: true,
      });
      setTags(res?.data?.tags);
      // console.log("From COntext tags:", res?.data?.tags)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchTasks();
    fetchTeams();
    fetchUsers();
    fetchTags();
  }, []);

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
      }}
    >
      {children}
    </StatusFilterContext.Provider>
  );
};

export const useFilterStatus = () => useContext(StatusFilterContext);
