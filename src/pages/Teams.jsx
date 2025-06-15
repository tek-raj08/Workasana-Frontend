import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Plus } from "lucide-react";
import { useFilterStatus } from "../context/StatusFilterContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Teams = () => {
  const navigate = useNavigate();
  const { teams, tasks, owners, loading} = useFilterStatus();
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const allTeam = teams?.map((team) => team.name);
  //   console.log("All team:", allTeam);

  const taskTeam = tasks?.filter((task) => allTeam.includes(task.team.name));
  //   console.log("TaskTeam:", taskTeam);

  const getTeamName = taskTeam?.map((t) => t.team.name);

  const uniqueTeamName = [...new Set(getTeamName)];

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
    const index = name?.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleNavigateTeamForm = () => {
    navigate("/team-form");
  };

  const handleNavigate = (teamId) => {
    navigate(`/team-details/${teamId}`);
  };

  return (
    <div className="flex m-30 gap-6">
      <Sidebar />

      <div className="w-full">
        <div className="flex justify-between items-center mt-6">
          <div>
            <h5 className="text-2xl font-medium">Teams</h5>
          </div>
          <div
            onClick={handleNavigateTeamForm}
            className="flex items-center bg-blue-800 p-1.5 rounded gap-1 cursor-pointer text-white"
          >
            <Plus />
            <button className="cursor-pointer">New Team</button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6">
          {teams?.map((team) => {
            const task = taskTeam?.filter(
              (task) => task.team.name === team.name
            );
            // console.log("Unique Task:", task);

            const allOwners = task.flatMap((t) => t.owners || []);
            // console.log("ALL owners:", allOwners);

            const uniqueOwers = [
              ...new Map(
                allOwners.map((owners) => [owners._id, owners])
              ).values(),
            ];
            // console.log("Unique Owners:", uniqueOwers);

            return (
              <div
                onClick={() => handleNavigate(team._id)}
                key={team._id}
                className="bg-white rounded-2xl shadow p-6 flex-wrap"
              >
                <h2 className="text-lg font-bold px-1 py-2">{team.name} </h2>
                <div className="flex items-center -space-x-1">
                  <FontAwesomeIcon icon={faUser} />

                  {uniqueOwers?.length > 0 ? (
                    uniqueOwers?.map((owner) => (
                      <div
                        key={owner._id}
                        title={owner.firstName}
                        className={`w-5 h-5 rounded-full ${getOwnerColor(
                          owner.firstName
                        )}  text-orange-800 flex items-center justify-center text-xs font-semibold border border-white cursor-pointer`}
                      >
                        {owner.firstName.charAt(0).toUpperCase()}
                      </div>
                    ))
                  ) : (
                    <p>No owners found.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Teams;
