import { createStore, combineReducers } from "redux";
import loginReducer from "./containers/Login/loginReducer";

const reducers = combineReducers({ loginReducer });

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
