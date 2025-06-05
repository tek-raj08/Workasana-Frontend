import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const FormProject = () => {
    const [projectName, setProjectName] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("")
    const navigate = useNavigate()

    const statuses = ["Completed", "In Progress"]

    const handleCancel = () => {
        navigate("/dashboard")
    }

    const handleSubmit = async(e) => {
        try{
            e.preventDefault()

            const response = await axios.post(BASE_URL + "/projects", {name: projectName, description, status}, {withCredentials: true})

            alert("Project Added successful.")

            navigate("/dashboard")
            // console.log(response)
        }catch(err){
            console.error(err)
        }
        
    }
  return (

    <form onSubmit={handleSubmit}>
    <div className="flex justify-center items-center bg-black/10 h-screen">
      <div className="bg-white w-full max-w-md shadow rounded">
        <div className="flex justify-between items-center px-3">
          <h3 className="text-2xl font-medium py-3">Create New Project</h3>
          <div className="cursor-pointer" onClick={handleCancel}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <div className="w-full my-1 text-gray-300">
          <hr />
        </div>

        <p className="text-gray-800 font-semibold px-3 pt-3">Project Name</p>
        <div className="pt-1.5 px-3">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            type="text"
            className="border w-full border-gray-200 rounded px-2 py-2"
            placeholder="Enter Project Name"
            required
          />
        </div>

        <p className="text-gray-800 font-semibold mt-3.5 px-3">
          Project Description
        </p>
        <div className="pt-1.5 px-3">
          <textarea
            name=""
            id=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border w-full border-gray-200 rounded px-2 py-2"
            placeholder="Enter Project Description"
            required
          ></textarea>
        </div>

        <div className="py-1 px-3">
            <label className="text-gray-800 font-semibold mr-1.5" htmlFor="status">Status</label>
            <select className="bg-gray-300 rounded" name="status" id="" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select Status</option>
                {statuses.map((s) => (
                    <option value={s} key={s}>{s}</option>
                ))}
            </select>
        </div>

        <div className="w-full my-1 text-gray-300">
          <hr />
        </div>

        <div className="float-right px-3 py-3">
          <button onClick={handleCancel} className="bg-gray-600 font-semibold text-white p-1.5 rounded mr-1.5 cursor-pointer">
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

export default FormProject;
