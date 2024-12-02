import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVoter } from "../../redux/actions/authAction";

const VotersTable = () => {
 
  const dispatch = useDispatch();
  const {allVoter} = useSelector((state)=>state.auth);
console.log(allVoter)
  useEffect(()=>{
    dispatch(getAllVoter());
  }, dispatch)
  return (
    <div className="overflow-x-auto mt-20 rounded-lg">
      <table className="min-w-full bg-white shadow-md">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="w-1/4 py-3 px-4 text-left">S.No.</th>
            <th className="w-1/4 py-3 px-4 text-left">Voter Name</th>
            <th className="w-1/4 py-3 px-4 text-left">Email</th>
            <th className="w-1/4 py-3 px-4 text-left">Registration Date</th>
            {/* <th className="w-1/4 py-3 px-4 text-left">Voting Date</th> */}
            <th className="w-1/4 py-3 px-4 text-left">Has Voted</th>
          </tr>
        </thead>
        <tbody>
          {allVoter?.map((voter, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-3 px-4">{index+1}</td>
              <td className="py-3 px-4">{voter.username}</td>
              <td className="py-3 px-4">{voter.email}</td>
              <td className="py-3 px-4">{new Date(voter.createdAt).toLocaleDateString()}</td>
              {/* <td className="py-3 px-4">{voter.}</td> */}
              <td className={`py-3 px-4 ${voter.hasVoted ? 'text-green-500' : 'text-red-500'}`}>{voter.hasVoted ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VotersTable;
