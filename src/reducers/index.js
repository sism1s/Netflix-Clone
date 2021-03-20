import isSubscribed from "./isSubscribed";
import userReducer from "../features/userSlice";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  user: userReducer,
  sub: isSubscribed,
});

export default allReducers;
