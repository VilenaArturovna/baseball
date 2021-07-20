import {FacilityType, SchoolType, TeamType} from "../../components/Profile/Profile";
import {getDataAPI} from "../../api/getDataAPI";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

type InitialStateType = {
    schools: Array<SchoolType>
    teams: Array<TeamType>
    facilities: Array<FacilityType>
}
const initialState: InitialStateType = {
    schools: [],
    teams: [],
    facilities: []
}

export const getSchools = createAsyncThunk('getSchools', async (arg, thunkAPI) => {
    const res = await getDataAPI.getSchools()
    try {
        return {schools: res.data.data.schools.schools}
    } catch (e) {
        thunkAPI.rejectWithValue(e)
    }
})
export const getTeams = createAsyncThunk('getTeams', async (arg, thunkAPI) => {
    const res = await getDataAPI.getTeams()
    try {
        return {teams: res.data.data.teams.teams}
    } catch (e) {
        thunkAPI.rejectWithValue(e)
    }
})
export const getFacilities = createAsyncThunk('getFacilities', async (arg, thunkAPI) => {
    const res = await getDataAPI.getFacilities()
    try {
        return {facilities: res.data.data.facilities.facilities}
    } catch (e) {
        thunkAPI.rejectWithValue(e)
    }
})

const slice = createSlice({
    name: "arrays",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getSchools.fulfilled, (state, {payload}) => {
            if (payload) {
                state.schools = payload.schools
            }

        });
        builder.addCase(getTeams.fulfilled, (state, {payload}) => {
            if (payload) {
                state.teams = payload.teams
            }
        });
        builder.addCase(getFacilities.fulfilled, (state, {payload}) => {
            if (payload) {
                state.facilities = payload.facilities
            }
        })
    }
})

export const arraysReducer = slice.reducer
