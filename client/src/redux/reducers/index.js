import { combineReducers } from "redux";
import userReducer from "./userReducer";
import notificationReducer from "./notificationReducer";
import itemReducer from "./itemReducer";

const appReducers = combineReducers({
    userReducer,
    notificationReducer,
    itemReducer,
});

export default appReducers;
