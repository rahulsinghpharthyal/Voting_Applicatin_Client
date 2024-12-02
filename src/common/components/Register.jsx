import React, { useState } from "react";
import defaultAxios from '../../customAxios/privateAxios';
import { toast } from "react-toastify";

const Register = ({setActiveSection}) => {
  const [formData, setFormData] = useState({ 
   username: "",
   email: "", 
   password: "", 
   age: "" 
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if (!formData.username || !formData.email || !formData.password || !formData.age) {
        toast.warn("All fields are required");
        return;
      }
      const {data, status} = await defaultAxios.post('/api/v1/create-user', formData);
        if(data?.success){
          toast.success(data?.message);
          setFormData({ 
            username: "",
            email: "", 
            password: "", 
            age: "" 
           });
           setActiveSection("login");
        }else{
          toast.error(data?.message);
        }
    }catch(error){
      console.error("Error during registration:", error)
      toast.error(error?.response?.data?.message || error?.message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 flex items-center justify-center">
        <label className="w-1/4 text-right pr-4" htmlFor="nome">
           Name:
        </label>
        <input
          className="flex-grow p-2 border rounded"
          type="text"
          id="username"
          name="username"
          placeholder="user_name"
          value={formData.nome}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="w-1/4 text-right pr-4" htmlFor="email">
          Email:
        </label>
        <input
          className="flex-grow p-2 border rounded"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="w-1/4 text-right pr-4" htmlFor="email">
          Age:
        </label>
        <input
          className="flex-grow p-2 border rounded"
          type="number"
          id="age"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="w-1/4 text-right pr-4" htmlFor="password">
          Password:
        </label>
        <input
          className="flex-grow p-2 border rounded"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded uppercase"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
