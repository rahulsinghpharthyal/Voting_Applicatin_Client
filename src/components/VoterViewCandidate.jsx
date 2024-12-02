import React, { useState } from "react";
import { axiosPrivate } from "../customAxios/privateAxios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const VoterViewCandidates = ({ candidates }) => {
  const [votedCandidates, setVotedCandidates] = useState({});
  const {user} = useSelector((state)=>state.auth);

  const giveVote = async({index, userId, candidateId}) => {
    try{
      const {data, status} = await axiosPrivate.post(`/api/v1/create-vote/${userId}/${candidateId}`);
      if(data?.success){
        toast.success(data?.message);
        setVotedCandidates({
          ...votedCandidates,
          [index]: true,
        });
        setTimeout(() => {
          setVotedCandidates((prev) => ({
            ...prev,
            [index]: false,
          }));
        }, 2000); 
      }else{
        
      }
    }catch(error){
      toast.info(error?.response?.data?.message || error?.message)
    }
  }

  return (
    <div className="overflow-x-auto mt-20 rounded-lg">
      <table className="min-w-full bg-gray-100 shadow-xl">
        <thead>
          <tr className="bg-gray-800 text-white rounded-lg">
            <th className="py-3 px-4 text-left">Election-ID</th>
            <th className="py-3 px-4 text-left">Election Symbol</th>
            <th className="py-3 px-4 text-left">Candidate Name</th>
            <th className="py-3 px-4 text-left">Vote</th>
            <th className="py-3 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {candidates?.map((candidate, index) => (
            <tr key={index} className="border-b hover:bg-gray-300 rounded-lg">
              <td className="py-3 px-4">{candidate.candidateElectionId.slice(-6)}</td>
              <td className="py-3 px-4">
                <img
                  src={candidate.electionSymbol}
                  alt="Election Symbol"
                  className="w-8 h-8"
                />
              </td>
              <td className="py-3 px-4">{candidate.candidatename}</td>
              <td className="py-3 px-4">
                <button
                  className="p-2 border rounded bg-gray-100 hover:bg-gray-300 hover:shadow-lg hover:translate-x-0 hover:transform-gpu"
                  onClick={() => giveVote({index, userId: user._id, candidateId: candidate._id})}
                >
                  Vote
                </button>
              </td>
              <td className="py-3 px-4">
                <div
                  className={`h-5 w-5 rounded-full border ${
                    votedCandidates[index]
                      ? "bg-green-500 border-green-500"
                      : "bg-gray-200"
                  }`}
                ></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoterViewCandidates;
