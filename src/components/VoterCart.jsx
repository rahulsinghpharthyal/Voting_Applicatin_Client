import React from 'react';

const VoterCart = ({ name, logo, votes, maxVotes }) => {
    const votePercentage = votes > 0 ? (votes / maxVotes) * 100 : 0;
    return (
        <div className="border p-2 rounded flex items-center space-x-2">
            <img src={logo} alt={`${name} logo`} className="w-8 h-8 rounded-full" />
            <div className="flex-grow">
                <h3 className="text-sm font-semibold">{name}</h3>
                <div className="w-full bg-gray-200 rounded h-2 mt-1">
                    <div
                        className="bg-blue-600 h-2 rounded"
                        style={{ width: `${votePercentage}%` }}
                    />
                </div>
                <p className="text-xs text-gray-600">{votes} votes</p>
            </div>
        </div>
    );
};

export default VoterCart;
