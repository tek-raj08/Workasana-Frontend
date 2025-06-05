import axios from "axios";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useFilterStatus } from "../context/StatusFilterContext";

const AddMemberForm = () => {
  const { teamId } = useParams();
  const { owners, tasks } = useFilterStatus();

  const [newMember, setNewMember] = useState("");
  console.log("NEwMember:", newMember);

  const taskTeam = tasks?.filter((t) => t.team._id === teamId);
  console.log("Task Team:", taskTeam);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (const task of taskTeam) {
        const res = await axios.post(
          BASE_URL + `/tasks/${task._id}/add-member`,
          { ownerId: newMember },
          { withCredentials: true }
        );

        console.log("Res: ", res)
      }

      alert("Member added to all tasks successfully!");
      navigate(`/teams`);
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`/teams`);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md pt-3  shadow-lg bg-white rounded">
        <div className="flex justify-between px-2">
          <h5 className="text-lg font-semibold">Add New Member</h5>
          <X className="cursor-pointer" onClick={handleBack} />
        </div>

        <hr className="my-2.5 border-gray-200" />

        <form onSubmit={handleSubmit}>
          <p className="px-2 text-base">Members Name</p>
          <div className="mx-2 my-2">
            <select
              name=""
              id=""
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              className="border border-gray-200 px-2 w-full py-1.5 rounded"
            >
              <option value="">Add Member</option>
              {owners?.map((o) => (
                <option key={o._id} value={o._id}>
                  {o?.firstName}
                </option>
              ))}
            </select>
          </div>

          <hr className="my-2.5 border-gray-200" />

          <div className="float-end mx-2 my-2 gap-2 text-white">
            <button
              type="button"
              className="bg-gray-700 p-2 rounded mr-1.5 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-700 px-3 py-2 rounded cursor-pointer"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberForm;
