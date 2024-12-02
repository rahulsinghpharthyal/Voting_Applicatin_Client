import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/authSlice";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ProtectedRoute = ({ allowedRole }) => {
  const { user } = useSelector((state) => state.auth);
  const privateAxios = useAxiosPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const getUser = async () => {
      try {
        const response = await privateAxios.get("/authenticate", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });
        if (isMounted) {
          dispatch(setUser(response?.data?.Data));
          setLoading(false);
        }
      } catch (error) {
        // console.log("error from getting user", error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    isMounted && getUser();

    return () => {
      isMounted = false;
    };
  }, [location, navigate]);

  if (loading) {
    return null;
  }

  if (user?.role) {
    if (allowedRole.includes(user?.role)) {
      return <Outlet />; // Allow access to the protected route
    } else if (user?.role === "admin") {
      return <Navigate to="/admin" state={{ from: location }} replace />;
    } else if (user?.role === "voter") {
      return <Navigate to="/voter" state={{ from: location }} replace />;
    }
  }

  // If not logged in, redirect to login
  if (!user?._id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user's role doesn't match the allowed role, redirect to unauthorized page
  return <Navigate to="/unauth-page" />;
};

export default ProtectedRoute;
