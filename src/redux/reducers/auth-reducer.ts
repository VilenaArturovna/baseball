import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../api/authAPI";

type InitialStateType = {
    isLoggedIn: boolean
}

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const signIn = createAsyncThunk('auth/signIn', async (params: {email: string, password: string}, thunkAPI) => {
    const res = await authAPI.signIn(params.email, params.password)
    localStorage.setItem('access-token', res.headers['access-token'])
    localStorage.setItem('client', res.headers.client)
    localStorage.setItem('uid', res.headers.uid)
})
export const signOut = createAsyncThunk('auth/signOut', async () => {
    await authAPI.signOut()
    localStorage.clear()
})
export const validateToken = createAsyncThunk('auth/validateToken', async (arg, thunkAPI) => {
    const res = await authAPI.validateToken()
    return {isLoggedIn: (res.status === 200)}
})
export const signUp = createAsyncThunk('auth/signUp', async (params: {email: string, password: string, password_confirmation: string, role: string}, thunkAPI) => {
    const res = await authAPI.signUp(params.email, params.password, params.password_confirmation, params.role)
    localStorage.setItem('access-token', res.headers['access-token'])
    localStorage.setItem('client', res.headers.client)
    localStorage.setItem('uid', res.headers.uid)
})
const slice = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers: builder => {
        builder.addCase(signIn.fulfilled, (state, {payload}) => {
            state.isLoggedIn = true
        });
        builder.addCase(signOut.fulfilled, (state) => {
            state.isLoggedIn = false
        });
        builder.addCase(validateToken.fulfilled, (state, {payload}) => {
            state.isLoggedIn = payload.isLoggedIn
        });
        builder.addCase(signUp.fulfilled, (state) => {
            state.isLoggedIn = true
        })
    }
})
export const authReducer = slice.reducer
