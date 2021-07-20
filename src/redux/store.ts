import {combineReducers} from "redux";
import {arraysReducer} from "./reducers/arrays-reducer";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./reducers/auth-reducer";


const rootReducer = combineReducers({
    arrays: arraysReducer,
    auth: authReducer
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export type RootReducerType = typeof rootReducer
export type RootStateType = ReturnType<typeof rootReducer>
