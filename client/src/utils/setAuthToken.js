import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    //Apply auth token for every request
    axios.defaults.headers.common["authToken"] = token;
  } else {
    delete axios.defaults.headers.common["authToken"];
  }
};

export default setAuthToken;
