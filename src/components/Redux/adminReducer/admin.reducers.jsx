const { default: userConstants } = require("../userConstants/userConstants");

const initial_state = {
  adminTodos: null,
};

const AdminTodoReducer = (state = initial_state, action) => {
  console.log("scaksjcnkcss",initial_state)
  switch (action.type) {
    case userConstants.admin_Todos:
      console.log("kajdhashdkhdlas",action)
        return {
          ...state,
          adminTodos: action.payload.data,
        };
      

    default:
      return {
        ...state
      };
  }
};

export default AdminTodoReducer;