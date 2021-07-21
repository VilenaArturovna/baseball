import axios from "axios";
import {headers} from "./getDataAPI";

const instance = axios.create({
    baseURL: 'https://baseballcloud-back.herokuapp.com/api/v1/auth'
})
type SignInResponseType = {
    direct_paid: boolean
    email: string
    id: number
    paid: boolean
    plan_id: null
    role: string
    team_avatar: {
        size_20_20: {
            url: null | string
        }
        size_32_32: {
            url: null | string
        }
        size_40_40: {
            url: null | string
        }
        size_100_100: {
            url: null | string
        }
        url: null | string
    }
    team_user: boolean
    u_name: null | string
    uid: string
    unsubscribe: boolean
}
export const authAPI = {
    signIn(email: string, password: string) {
        return instance.post<SignInResponseType>('/sign_in', {email, password})
    },
    signOut() {
        return instance.delete('/sign_out', {headers})
    },
    validateToken() {
        return instance.get<SignInResponseType>('/validate_token', {headers})
    },
    signUp(email: string, password: string, password_confirmation: string, role: string) {
        return instance.post('', {email, password, password_confirmation, role})
    }
}
