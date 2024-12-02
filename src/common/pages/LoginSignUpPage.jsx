import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import ForgotPassword from "../components/ForgotPassword";

const LoginSignUpPage = () => {
  const [activeSection, setActiveSection] = useState("login");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-[500px] h-full bg-gray-100 p-6 rounded shadow-lg">
        <div className="flex flex-1 justify-around mb-4 bg-blue-100 rounded">
          <button
            className={`w-1/3 p-2 uppercase ${
              activeSection === "login" ? "bg-blue-700 text-white" : ""
            }`}
            onClick={() => setActiveSection("login")}
          >
            Login
          </button>
          <button
            className={`w-1/3 p-2 uppercase ${
              activeSection === "register" ? "bg-blue-700 text-white" : ""
            }`}
            onClick={() => setActiveSection("register")}
          >
            Registar
          </button>
          <button
            className={`w-1/3 p-2 uppercase ${
              activeSection === "forgot" ? "bg-blue-700 text-white" : ""
            }`}
            onClick={() => setActiveSection("forgot")}
          >
            Forgot Password
          </button>
        </div>

        {activeSection === "login" && <Login />}
        {activeSection === "register" && <Register setActiveSection={setActiveSection}/>}
        {activeSection === "forgot" && <ForgotPassword />}
      </div>
    </div>
  );
};

export default LoginSignUpPage;
