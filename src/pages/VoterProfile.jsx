import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const VoterProfile = () => {
  const voter = {
    name: "John Doe",
    email: "john.doe@example.com",
    aadhaarId: "123456789012",
    registrationDate: "2023-01-01",
  };

  const {user} = useSelector((state)=>state.auth);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-20">
      <h2 className="text-2xl font-bold mb-4">Voter Profile</h2>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4 font-bold">Name:</label>
          <span className="w-2/3">{user.username}</span>
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4 font-bold">Email:</label>
          <span className="w-2/3">{user.email}</span>
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4 font-bold">Age:</label>
          <span className="w-2/3">{user.age}</span>
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-right pr-4 font-bold">
            Registration Date:
          </label>
          <span className="w-2/3">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VoterProfile;
