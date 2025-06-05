import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useFilterStatus } from "../context/StatusFilterContext";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const FormTasks = () => {

  const navigate = useNavigate()

  const { projects, teams, owners, tags } = useFilterStatus();
  
  const [project, setProject] = useState("")
  const [task, setTask] = useState("")
  const [team, setTeam] = useState("")
  const [owner, setOwners] = useState([])
  const [tag, setTags] = useState([])
  const [dueDate, setDueDate] = useState("")
  const [timeToComplete, setTimeToComplete] = useState("")
  const [status, setStatus] = useState("")
  const [selectedPriority, setSelectedPriority] = useState("")

  const handleOwners = (e) => {

    const selectedOwners = Array.from(e.target.selectedOptions, option => option.value)
    setOwners(selectedOwners)

  }

   const handleTags = (e) => {

    const selectedTags = Array.from(e.target.selectedOptions, option => option.value)
    setTags(selectedTags)
    
  }

  console.log(project, task, team, owner, tag, dueDate, timeToComplete, status)



  const handleCancel = () => {
    navigate("/dashboard");
  };

  const statuses = ['To Do', 'In Progress', 'Completed', 'Blocked']
  const priorities = ["High", "Medium", "Low"]

  const handleSubmit = async(e) => {
    e.preventDefault()

    try{

      const response = await axios.post(BASE_URL + "/tasks", {
        project,
        name: task,
        team,
        owners: owner,
        tags: tag,
        status,
        priority: selectedPriority,
        timeToComplete,
        dueDate

      },
    {withCredentials: true})

      alert("Task Added successfull.")

      navigate("/dashboard")

      // console.log(response.data)

    }catch(err){
      console.error(err)
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center bg-black/10 h-screen">
        <div className="bg-white w-100 shadow rounded">
          <div className="flex justify-between items-center px-3">
            <h3 className="text-1xl font-semibold py-3">
              Create New Task | Create Moodboard
            </h3>
            <div className="cursor-pointer" onClick={handleCancel}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
          <div className="w-full my-1 text-gray-300">
            <hr />
          </div>

          <div className="py-1 px-3">
            <p className="text-gray-800 font-semibold mr-1.5 pb-1">
              Select Project
            </p>
            <select required value={project} onChange={(e) => setProject(e.target.value)} className="bg-gray-100 rounded w-full" name="project" id="">
              <option value="">Dropdown</option>
              {projects?.map((p) => (
                <option value={p._id} key={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <p className="text-gray-800 font-semibold px-3 pt-3">Task Name</p>
          <div className="pt-1.5 px-3">
            <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
              type="text"
              className="border w-full border-gray-200 rounded px-2 py-1"
              placeholder="Enter Task Name"
              required
            />
          </div>

          <div className="py-1 px-3">
            <p className="text-gray-800 font-semibold mr-1.5 mb-1">
              Select Team
            </p>
            <select required value={team} onChange={(e) => setTeam(e.target.value)} className="bg-gray-100 rounded w-full" name="teams" id="">
              <option value="">Dropdown</option>
              {teams?.map((t) => (
                <option value={t._id} key={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="py-1 px-3">
            <p className="text-gray-800 font-semibold mr-1.5 mb-1">
              Select Owners
            </p>
            <select required value={owner} multiple  onChange={handleOwners} className="bg-gray-100 rounded w-full" name="owners" id="">
              <option className="px-1.5" value="">Dropdown</option>
              {owners?.map((o) => (
                <option className="px-1.5" value={o._id} key={o._id}>
                  {o.firstName}
                </option>
              ))}
            </select>
          </div>

          <div className="py-1 px-3">
            <p className="text-gray-800 font-semibold mr-1.5 mb-1">
              Select Tags
            </p>
            <select required value={tag} multiple onChange={handleTags} className="bg-gray-100 rounded w-full" name="tags" id="">
              <option className="px-1.5" value="">Dropdown</option>
              {tags?.map((t) => (
                <option className="px-1.5" value={t.name} key={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="py-1 px-3">
            <p className="text-gray-800 font-semibold mr-1.5 mb-1">
              Select Priority
            </p>
            <select required value={selectedPriority}  onChange={(e) => setSelectedPriority(e.target.value)} className="bg-gray-100 rounded w-full" name="priority" id="">
              <option value="">Dropdown</option>
              {priorities?.map((p) => (
                <option value={p} key={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="py-1 px-3">
            <p className="text-gray-800 font-semibold mr-1.5 mb-1">
              Select Status
            </p>
            <select required value={status}  onChange={(e) => setStatus(e.target.value)} className="bg-gray-100 rounded w-full" name="status" id="">
              <option value="">Dropdown</option>
              {statuses?.map((s) => (
                <option value={s} key={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center gap-1 px-3  mt-3">
            <div className="w-full">
              <span className="text-gray-800 font-semibold">
                Select Due date
              </span>
              <input
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border border-gray-200 rounded mt-1.5 px-2"
                type="date"
                name=""
                id=""
                placeholder="Select date"
              />
            </div>
            <div className="w-full">
              <span className="text-gray-800 font-semibold">
                Estimated Time
              </span>
              <input
                required
                value={timeToComplete}
                onChange={(e) => setTimeToComplete(e.target.value)}
                className="border border-gray-200 rounded mt-1.5 px-2"
                type="number"
                name=""
                id=""
                placeholder="Enter Time in Days"
              />
            </div>
          </div>

          <div className="w-full mt-2 text-gray-300">
            <hr />
          </div>

          <div className="float-right px-3 py-2">
            <button
              onClick={handleCancel}
              className="bg-gray-600 font-semibold text-white p-1.5 rounded mr-1.5 cursor-pointer"
            >
              Cancel
            </button>
            <button className="bg-blue-600 font-semibold text-white p-1.5 rounded cursor-pointer">
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormTasks;
