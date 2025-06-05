import React from "react";
import Sidebar from "./Sidebar";
import { MoveLeft, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useFilterStatus } from "../context/StatusFilterContext";

const TeamDetails = () => {
  const { tasks, teams } = useFilterStatus();
  const navigate = useNavigate();
  const { teamId } = useParams();

  const team = teams?.find((t) => t._id === teamId);
  console.log("selectedTeam:", team);

  const taskTeam = tasks?.filter((task) => task.team._id === teamId);
  console.log("Selected Task:", taskTeam);

  const allOwners = taskTeam.flatMap((task) => task.owners);
  console.log("All Owners:", allOwners);

  const uniqueOwners = [...new Map(allOwners.map((o) => [o._id, o])).values()];
  console.log("All Unique Owners:", uniqueOwners);

  const handleNavigate = () => {
    navigate("/teams");
  };

  const handleNavigateToAddMemberForm = () => {
    navigate(`/add-member-form/${teamId}`)
  }


  const colors = [
    "bg-green-200",
    "bg-red-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-orange-200",
  ];

  const getOwnerColor = (name) => {
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <div className="flex gap-6 m-30">
      <Sidebar />
      <div className="w-full max-w-sm">
        <div
          className="flex mt-10 mb-5 gap-2 cursor-pointer"
          onClick={handleNavigate}
        >
          <MoveLeft className="text-blue-400" />
          <p className="text-base font-medium text-blue-600">Back to Teams</p>
        </div>
        <div className="my-5">
        

          <h2 className="text-xl font-semibold">{team?.name}</h2>
          
        </div>

        <h5 className="text-gray-500 text-base font-medium mb-4">MEMBERS</h5>

        <div>
          {uniqueOwners?.map((u, index) => {
           
            const initials = `${u.firstName.charAt(0).toUpperCase()}${u.lastName
              .charAt(0)
              .toUpperCase()}`;

            return (
              <div key={index} className="flex gap-1.5 my-1.5">
                <div  className={`w-7 h-7 rounded-full ${getOwnerColor(u?.firstName)} text-orange-800 flex justify-center items-center`}>
                  {initials}
                </div>
                {`${u.firstName} ${u.lastName}`}
              </div>
            );
          })}
        </div>

        <div className="gap-1 mt-7 bg-blue-800 inline-flex p-1 text-white rounded cursor-pointer">
            <Plus/>
            <button onClick={handleNavigateToAddMemberForm}>Member</button>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
