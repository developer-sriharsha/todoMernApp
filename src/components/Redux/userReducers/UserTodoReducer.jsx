import userActionTypes from '../userActionTypes/userActionTypes'
const initial_state = {
  userTodos: "",
  broadCastUpdates: false,
};

const UserTodoReducer = (state = initial_state, action) => {
  switch (action.type) {
    case userActionTypes.user_Todos:
      if (action.payload.status && action.payload) {
        return {
          ...state,
          userTodos: action.payload,
        };
      }

    case userActionTypes.broadCast_Updates:
      return {
        ...state,
        broadCastUpdates:!(state.broadCastUpdates),
      };

    default:
      return {
        ...state,
      };
  }
};

export default UserTodoReducer;
