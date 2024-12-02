import React, { useEffect } from "react";
import InfoCard from "../components/InfoCard";
import { MdOutlineDoNotDisturbOnTotalSilence } from "react-icons/md";
import { GiTotem } from "react-icons/gi";
import { SiVirustotal } from "react-icons/si";
import VoterTurnoutChart from "../components/VoterTurnOutChart";
import CandidateVotesChart from "../components/CandidateVotesChart";
import { useDispatch, useSelector } from "react-redux";
import { getAllCandidate } from "../../redux/actions/candidateAction";
import { getAllVoter } from "../../redux/actions/authAction";

const AdminDashboard = () => {
  
  const {allVoter} = useSelector((state)=>state.auth);
  const {candidates} = useSelector((state)=>state.candidate);

  const votersBetween18And25 = allVoter?.filter(obj => obj.age > 17 && obj.age < 26); 
  const votersBetween26And60= allVoter?.filter(obj => obj.age > 25 && obj.age < 61); 
  const votersAbove60 = allVoter?.filter(obj => obj.age > 60);
;
  const candidatename = candidates?.map((obj)=>obj.candidatename);
  const candidateVotes = candidates?.map((obj)=>obj.votes);

  const dispatch = useDispatch();

  const cardData = [
    {
      IconComponent: MdOutlineDoNotDisturbOnTotalSilence,
      iconColor: "text-blue-600",
      title: "Total Voters",
      count: allVoter?.length,
      path: "voters-list",
    },
    {
      IconComponent: GiTotem,
      iconColor: "text-green-600",
      title: "Total Candidates",
      count: candidates?.length,
      path: "candidate-list",
    },
    {
      IconComponent: SiVirustotal,
      iconColor: "text-red-600",
      title: "Total Votes",
      count: "8,912",
    },
  ];

  const voterTurnoutData = {
    labels: ["18-25", "26-60", "60+"],
    values: [votersBetween18And25?.length, votersBetween26And60?.length, votersAbove60?.length]
  };
  

  const candidateVotesData = {
    labels: candidatename,
    values: candidateVotes,
  };

  useEffect(()=>{
    dispatch(getAllCandidate());
    dispatch(getAllVoter());
  },[dispatch]);

  return (
    <div className="p-6 mt-10">
      {/* Top Section: Statistics Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {cardData?.map((data, index) => (
          <InfoCard
            key={index}
            IconComponent={data.IconComponent}
            iconColor={data.iconColor}
            title={data.title}
            count={data.count}
            path={data.path}
          />
        ))}
      </section>

      {/* Middle Section: Charts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4">Voter Turnout</h3>
          <VoterTurnoutChart data={voterTurnoutData} />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4">Candidate Votes</h3>
          <CandidateVotesChart data={candidateVotesData} />
        </div>
      </section>

      {/* Bottom Section: Recent Activities */}
      <section className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-4">Recent Activities</h3>
        <ul className="space-y-3">
          <li className="text-gray-700">John Doe cast a vote.</li>
          <li className="text-gray-700">
            Jane Smith registered as a candidate.
          </li>
          <li className="text-gray-700">New voter registration approved.</li>
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
