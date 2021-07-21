import axios from "axios";
import {getSchoolsQueryBody} from "../queries/getSchoolsQueryBody";
import {getTeamsQueryBody} from "../queries/getTeamsQueryBody";
import {getFacilitiesQueryBody} from "../queries/getFacilitiesQueryBody";
import {CurrentProfileType, FacilityType, SchoolType, TeamType} from "../components/Profile/Profile";
import {setCurrentProfileQueryBody} from "../queries/setCurrentProfileQueryBody";

export const headers = {
    "Access-Token": localStorage.getItem('access-token'),
    "Uid": localStorage.getItem('uid'),
    "Client": localStorage.getItem('client')
}

const instance = axios.create({
    baseURL: 'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
    headers: headers
})
type ResponseType<D> = {
    data: D
}

export const getDataAPI = {
    getSchools() {
        return instance.post<ResponseType<{ schools: { schools: SchoolType[] } }>>('', {
            query: getSchoolsQueryBody,
            variables: {search: ''}
        })
    },
    getTeams() {
        return instance.post<ResponseType<{ teams: { teams: TeamType[] } }>>('', {
            query: getTeamsQueryBody,
            variables: {search: ""}
        })
    },
    getFacilities() {
        return instance.post<ResponseType<{ facilities: { facilities: FacilityType[] } }>>('', {
            query: getFacilitiesQueryBody,
            variables: {search: ""}
        })
    },
    getCurrentProfile() {
        return instance.post<ResponseType<{ current_profile: CurrentProfileType }>>('', {query: setCurrentProfileQueryBody})
    }
}
