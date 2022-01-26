import { getServiceCALLS } from "../../tools/helpers";
import userActionTypes from "../userActionTypes/userActionTypes";

export function GetUserTodos (payload) {
  return async (dispatch) => {
    let userTodos = await getServiceCALLS("/usertodos", payload);
    dispatch(userTodosPayLoad(userTodos));
  };
};

export function userTodosPayLoad(payload) {
  return {
    type: userActionTypes.user_Todos,
    payload,
  };
}

export function broadCastUpdates(payload) {
  return {
    type: userActionTypes.broadCast_Updates,
    payload,
  };
}
