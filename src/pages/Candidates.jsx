import React, { useEffect } from "react";
import VoterViewCandidates from "../components/VoterViewCandidate";
import { useDispatch, useSelector } from "react-redux";
import { getAllCandidate } from "../redux/actions/candidateAction";

const Candidates = () => {
  const dispatch = useDispatch();
  const { candidates } = useSelector((state) => state.candidate);
  useEffect(() => {
    dispatch(getAllCandidate());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 h-screen">
      <VoterViewCandidates candidates={candidates} />
    </div>
  );
};

export default Candidates;
