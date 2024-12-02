import customAxios from "../customAxios/privateAxios";
import { useDispatch } from "react-redux";
import { logoutUser, setUser } from "../redux/slices/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const response = await customAxios.get("/api/v1/refresh-token", {
        withCredentials: true,
      });
      dispatch(setUser(response.data));
      return response.data.accessToken;
    } catch (error) {
      console.log(error);
      dispatch(logoutUser());
    }
  };

  return refresh;
};

export default useRefreshToken;
