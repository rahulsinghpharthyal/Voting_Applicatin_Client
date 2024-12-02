import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { userLogout } from "../../redux/actions/authAction";

export const handleLogout = async (dispatch) => {
  try {
    const { payload } = await dispatch(userLogout());
    if (payload?.success) {
      toast.success(payload?.message);
    }
  } catch (error) {
    console.log(error);
  }
};
