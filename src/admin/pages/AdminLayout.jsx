import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen m-2 space-x-3">
      <div className="flex-shrink-0 w-64 overflow-hidden">
        <AdminSideBar />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex-shrink-0">
          <AdminHeader />
        </div>
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
