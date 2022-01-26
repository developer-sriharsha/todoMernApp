import userActionTypes from '../userActionTypes/userActionTypes'

const initial_state = {
    loginedUser:"" ,
    RegisterUser:"" 
}

const userLoginReducer = (state = initial_state, action) => {
    switch (action.type) {
        case userActionTypes.user_Login:
            if (action.payload.token!=="fail") {
                return {
                    ...state,
                    loginedUser: action.payload
                }
            }else{
                return {
                    ...state,
                    loginedUser:action.payload.token
                }
            }
            case userActionTypes.user_Register:
                    return{
                        ...state,
                          RegisterUser:action.payload 

                        
                    }
        default:
            return {
                ...state
            }
    }
}

export default userLoginReducer