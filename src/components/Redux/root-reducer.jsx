import { combineReducers } from "redux";
import userLoginReducer from "./userReducers/user.login.reducer";
import UserTodoReducer from "./userReducers/UserTodoReducer";
import AdminTodoReducer from "./adminReducer/admin.reducers";

export default combineReducers({
  user: userLoginReducer,
  userTodos: UserTodoReducer,
  adminReducers:AdminTodoReducer,
});
