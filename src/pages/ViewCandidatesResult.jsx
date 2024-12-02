import React, { useEffect } from "react";
import VoterCart from "../components/VoterCart";
import { useDispatch, useSelector } from "react-redux";
import { getAllCandidate } from "../redux/actions/candidateAction";

const ViewCandidateResult = () => {
  const dispatch = useDispatch();
  const { candidates } = useSelector((state) => state.candidate);
  
  const maxVotes = Number.MAX_SAFE_INTEGER;
  
  useEffect(() => {
    dispatch(getAllCandidate());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-xl font-bold">Election Results</h1>
      </header>
      <div>
        <ul>
          {candidates?.map((candidate, index) => (
            <li key={index} className="mb-2">
              <VoterCart
                name={candidate?.candidatename}
                logo={candidate?.electionSymbol}
                votes={candidate?.votes ? candidate?.votes : 0}
                maxVotes={maxVotes}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewCandidateResult;
