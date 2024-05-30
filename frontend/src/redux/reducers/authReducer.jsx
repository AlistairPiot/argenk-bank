import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "../actions/typeActions";

/* Initial state of authentication */
const initialState = {
    status: "VOID",
    isConnected: false,
    token: null,
    error: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                status: "SUCCEEDED",
                isConnected: true,
                token: action.payload,
                error: null,
            };

        case LOGIN_FAIL: {
            return {
                ...state,
                status: "FAILED",
                isConnected: false,
                error: action.payload,
            };
        }
        case LOGOUT: {
            return initialState;
        }
        default:
            return state;
    }
};
