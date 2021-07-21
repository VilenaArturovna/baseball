import {combineReducers} from "redux";
import {dataReducer} from "./reducers/data-reducer";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./reducers/auth-reducer";


const rootReducer = combineReducers({
    data: dataReducer,
    auth: authReducer
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export type RootReducerType = typeof rootReducer
export type RootStateType = ReturnType<typeof rootReducer>
