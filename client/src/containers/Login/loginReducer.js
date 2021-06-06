import isEmpty from "../../utils/isEmpty";
import { SET_CURRENT_USER } from "../Login/LoginTypes";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload),
      };
    default:
      return state;
  }
}
