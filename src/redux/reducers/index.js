import { combineReducers } from "redux";
import { userReducer, userWalletReducer } from "./userReducer";

export default combineReducers({
  user: userReducer,
  wallet: userWalletReducer,
});
