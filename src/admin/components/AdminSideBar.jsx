import React from "react";
import { Link } from "react-router-dom";
import { IoIosPersonAdd } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { userLogout } from "../../redux/actions/authAction";
import { toast } from "react-toastify";
import { handleLogout } from "../../common/config/handleLogout";

const AdminSideBar = () => {
  const dispatch = useDispatch();

  return (
    <div className="fixed h-[726px] w-64 bg-gray-800 text-white flex flex-col p-4 space-y-4 rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Your Name</h2>
      </div>
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex-1 space-y-4">
          <Link
            to="/admin"
            className="sidebar-link "
          >
            <LuLayoutDashboard className="text-xl"/>
            Dashboard
          </Link>
          <Link
            to="/admin/add-candidate"
            className="sidebar-link"
          >
            <IoIosPersonAdd className="text-xl"/>
            Add Candidate
          </Link>
        </div>
        <div>
          <button
            className="w-full text-lg bg-red-500 hover:bg-red-700 hover:shadow-lg transition-all text-white font-bold py-2 px-4 rounded block text-center"
            onClick={()=>handleLogout(dispatch)}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
