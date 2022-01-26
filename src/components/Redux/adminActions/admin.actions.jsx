import {
  postServiceCALLS,
  getServiceCALLS,
} from "../../tools/helpers";
import userActionTypes from "../userActionTypes/userActionTypes";

const adminTodos = (payload) => {
  return async (dispatch) => {
    let resp = await postServiceCALLS("/usertodos/alluserstodos");
    if (resp) {
      dispatch(adminTodosPayload(resp));
    }
  };
};
export default adminTodos;
export function adminTodosPayload(payload) {
  return {
    type: userActionTypes.admin_Todos,
    payload,
  };
}

export function adminUserAction() {
  return async (dispatch) => {
    let resp = await getServiceCALLS("/user");
    if (resp) {
      dispatch(adminUserActionPayload(resp));
    }
  };
}

export function adminUserActionPayload(payload) {
  return {
    type: userActionTypes.user_Management,
    payload,
  };
}

export function userLogsAction() {
  return async (dispatch) => {
    let resp = await getServiceCALLS("/user/view-logs");
    if (resp) {
      dispatch(userLogsPayload(resp));
    }
  };
}

export function userLogsPayload(payload) {
  return {
    type: userActionTypes.user_Logs,
    payload,
  };
}
