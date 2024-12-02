import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCandidate,
  getAllCandidate,
} from "../../redux/actions/candidateAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CandidatesTable = () => {
  const { candidates } = useSelector((state) => state.candidate);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCandidates = candidates?.filter(
    (candidate) =>
      candidate?.candidateElectionId.includes(searchTerm) ||
      candidate?.candidatename
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      new Date(candidate?.createdAt)
        .toLocaleDateString()
        .includes(searchTerm) ||
      candidate?.votes?.includes(searchTerm)
  );

  const handleDelete = async (candidateId) => {
    try {
      const { payload } = await dispatch(deleteCandidate(candidateId));
      if (payload?.success) {
        toast.success(payload?.message);
        dispatch(getAllCandidate());
      } else {
        toast.error(payload?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (candidate) => {
    navigate('/admin/add-candidate', {state: {candidate}} )
  };

  useEffect(() => {
    dispatch(getAllCandidate());
  }, [dispatch]);

  return (
    <div className="mt-20">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="w-1/6 py-3 px-4 text-left">Election ID</th>
              <th className="w-1/6 py-3 px-4 text-left">Election Sign</th>
              <th className="w-1/6 py-3 px-4 text-left">Party</th>
              <th className="w-1/4 py-3 px-4 text-left">Candidate Name</th>
              <th className="w-1/6 py-3 px-4 text-left">Registration Date</th>
              <th className="w-1/6 py-3 px-4 text-left">Total Votes</th>
              <th className="w-1/6 py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates?.map((candidate, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">
                  {candidate?.candidateElectionId.slice(-6)}
                </td>
                <td className="py-3 px-4">
                  <img
                    src={candidate?.electionSymbol}
                    alt="Election Sign"
                    className="w-12 h-12 rounded-full object-fill"
                  />
                </td>
                <td className="py-3 px-4">{candidate?.party}</td>
                <td className="py-3 px-4">{candidate?.candidatename}</td>
                <td className="py-3 px-4">
                  {new Date(candidate?.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  {candidate?.votes ? candidate?.votes : 0}
                </td>
                <td className="py-3 px-4">
                  <button
                    className="text-yellow-500 hover:text-yellow-700 font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleEdit(candidate)}
                  >
                    Edit
                  </button>
                  <button
                    className="hover:text-red-700 text-red-500 font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(candidate._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidatesTable;
