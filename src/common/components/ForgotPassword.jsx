import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      console.log("Email is required");
      return;
    }
    console.log("Forgot Password Email: ", email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex items-center justify-center">
        <label className="w-1/4 text-right pr-4" htmlFor="email">
          Email:
        </label>
        <input
          className="flex-grow p-2 border rounded"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="mt-44 w-full bg-red-500 text-white p-2 rounded uppercase"
      >
        Reset Password
      </button>
    </form>
  );
};

export default ForgotPassword;
