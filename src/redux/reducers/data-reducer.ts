import {FacilityType, SchoolType, TeamType} from "../../components/Profile/Profile";
import {getDataAPI} from "../../api/getDataAPI";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {BattingSummaryType} from "../../components/Profile/ProfileInfoMain/StatisticCard";

type InitialStateType = {
    schools: Array<SchoolType>
    teams: Array<TeamType>
    facilities: Array<FacilityType>
    profile: {
        id: string
        avatar: string
        first_name: string
        last_name: string
    }
    battingSummary: BattingSummaryType
}
const initialState: InitialStateType = {
    schools: [],
    teams: [],
    facilities: [],
    profile: {
        id: '',
        avatar: '',
        first_name: '',
        last_name: ''
    },
    battingSummary: {
        top_values: [],
        average_values: []
    }
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
export const getCurrentProfile = createAsyncThunk('getCurrentProfile', async (arg, thunkAPI) => {
    const res = await getDataAPI.getCurrentProfile()
    try {
        return {profile: {
            id: res.data.data.current_profile.id,
            last_name: res.data.data.current_profile.last_name,
            first_name: res.data.data.current_profile.first_name,
            avatar: res.data.data.current_profile.avatar}}
    } catch (e) {
        thunkAPI.rejectWithValue(e)
    }
})
export const getBattingSummaryTC = createAsyncThunk('getBattingSummary', async (params: {id: string}, thunkAPI) => {
    const res = await getDataAPI.getBattingSummary(params.id)
    try {
        return {battingSummary: res.data.data.batting_summary}
    } catch (e) {
        thunkAPI.rejectWithValue(e)
    }
})

const slice = createSlice({
    name: "data",
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
        });
        builder.addCase(getCurrentProfile.fulfilled, (state, {payload}) => {
            if (payload) {
                state.profile = payload.profile
            }
        });
        builder.addCase(getBattingSummaryTC.fulfilled, (state, {payload}) => {
            if (payload) {
                state.battingSummary = payload.battingSummary
            }
        });
    }
})

export const dataReducer = slice.reducer
