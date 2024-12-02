import React from "react";

const AdminHeader = () => {
  return (
    <header className="fixed top-2 left-30 w-[1140px] rounded-lg bg-transparent backdrop-blur-sm text-black py-4 px-6 shadow-lg z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
    </header>
  );
};

export default AdminHeader;
