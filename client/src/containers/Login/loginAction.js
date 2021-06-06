import axios from "axios";
import jwt_decode from "jwt-decode";
import { notify, notifyError } from "../../utils/Notification";
import setAuthToken from "../../utils/setAuthToken";
import { SET_CURRENT_USER } from "./LoginTypes";

export const set_current_user = (decoded) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: decoded,
  });
};

export const signIn = (data, history) => async (dispatch) => {
  // console.log(data);
  try {
    await axios.post("/api/user/login", data).then((res) => {
      if (res) {
        const mesaage = "You are logged in";
        notify(mesaage);

        //Set token to local storage
        localStorage.clear();
        var token = res.data;
        localStorage.setItem("jwtToken", token);

        //sending token to setAuthToken for setting default token
        setAuthToken(token);

        //Decoding Token
        const decoded = jwt_decode(token);

        //Sending decoded to set_current_user
        dispatch(set_current_user(decoded));

        history.push({
          pathname: "/profile",
        });
      }
    });
  } catch (error) {
    if (error) {
      const mesaage = error.response.data;
      notifyError(mesaage);
      console.log(error);
    }
  }
};
