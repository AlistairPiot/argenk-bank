import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer.jsx";
import { userReducer } from "./reducers/userReducer.jsx";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
});

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

export default store;
