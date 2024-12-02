import React from 'react';
import { Link } from 'react-router-dom';
import { handleLogout } from '../common/config/handleLogout';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.auth);
  return (
    <header className="bg-gray-800 text-white p-4 shadow-lg m-2 rounded-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Welcome {user?.username} in your Voter Profile!</div>
        <nav className="flex space-x-4">
          <Link to="/voter" className="hover:border-b-2 px-3 py-2 rounded">
            VoteToCandidate
          </Link>
          <Link to="/voter/voting-result" className="hover:border-b-2 px-3 py-2 rounded">
            Result
          </Link>
          <Link to="/voter/profile" className="hover:border-b-2 px-3 py-2 rounded">
            Profile
          </Link>
          <button className="hover:bg-red-700 bg-red-500 px-3 py-2 rounded" onClick={() => handleLogout(dispatch)}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
