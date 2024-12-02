import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/actions/authAction";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoading, user, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // In there we are not using location because there are no common page for each roles
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/login";

  useEffect(() => {
    if (!isLoading && user?._id) {
      // In summary, using replace helps prevent users from navigating back to certain routes, which is particularly useful in scenarios like yours where you don't want authenticated users to go back to the login page.
      if (user?.role === "admin") {
        navigate("admin", { replace: true });
      } else if (user.role === "voter") {
        navigate("voter");
      } else {
        navigate(from);
      }
    }
  }, [user, navigate, from, isLoading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.email || !formData.password) {
        console.log("All fields are required");
        return;
      }
      const { payload } = await dispatch(userLogin(formData));
      if (payload?.success) {
        toast.success(payload?.message);
        setFormData({
          email: "",
          password: "",
        });
        if (payload?.Data?.role === "admin") {
          navigate("/admin", { replace: true });
        } else if (payload?.Data?.role === "voter") {
          navigate("/voter", { replace: true });
        } else {
          // If no matching role, navigate to a fallback path (unauthorized page, or wherever)
          navigate("/unauth-page", { replace: true });
        }
      } else {
        toast.error(payload);
      }
    } catch (error) {
      console.log("Error During Login", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        className="mt-28 w-full bg-blue-500 text-white p-2 rounded uppercase"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
