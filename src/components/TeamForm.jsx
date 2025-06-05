import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useFilterStatus } from "../context/StatusFilterContext";

const TeamForm = () => {
  const { owners } = useFilterStatus();
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([]);

  console.log("Selected Members:", members);

  const handleMultipleMembers = (e) => {
    const selectedMembers = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setMembers(selectedMembers);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        BASE_URL + "/teams",
        {
          name: teamName,
          member: members,
        },
        {
          withCredentials: true,
        }
      );

      alert("New Added successfully.");
      navigate("/teams");

      console.log("RES:", res);
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/teams");
  };
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-full max-w-md py-3 bg-white shadow-lg rounded">
        <div className="flex justify-between items-center px-3 pt-2 pb-3">
          <h5 className="text-xl font-medium">Create New Team</h5>
          <X onClick={handleBack} className="cursor-pointer" />
        </div>
        <hr className="border-t border-gray-300" />

        <form onSubmit={handleFormSubmit}>
          <p className="px-3 pt-3 text-lg font-mono">Team Name</p>

          <div className="px-3">
            <input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              type="text"
              name=""
              id=""
              placeholder="Enter Team Name"
              className="px-3 py-2 border  border-gray-300 w-full rounded-lg"
            />
          </div>

          <hr className="mt-3 mb-2 border-t border-gray-300" />

          <div className="float-right px-3">
            <button className="px-2 py-1 mr-1 bg-gray-800 text-white rounded-lg cursor-pointer">
              Cancel
            </button>
            <button
              type="submit"
              className="px-2 py-1 bg-blue-800 text-white rounded-lg cursor-pointer"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamForm;
