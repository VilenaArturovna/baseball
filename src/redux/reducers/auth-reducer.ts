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

const slice = createSlice({
    initialState,
    name: 'auth',
    reducers: {},
    extraReducers: builder => {
        builder.addCase(signIn.fulfilled, (state, {payload}) => {
            state.isLoggedIn = true
        })
    }
})
export const authReducer = slice.reducer
