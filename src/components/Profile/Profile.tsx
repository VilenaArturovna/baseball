import styled from "styled-components";
import {ProfileInfoView} from "./ProfileInfoView";
import {ProfileInfoMain} from "./ProfileInfoMain/ProfileInfoMain";
import React, {useState} from "react";
import {ProfileInfoEdit} from "./ProfileInfoEdit";
import {useQuery} from '@apollo/client';
import {getProfile} from "../../queries/getProfile";
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";

export type ProfileBatterSummaryType = {
    distance: number
    exit_velocity: number
    launch_angle: number
}
export type ProfileBattingTopValuesType = {
    distance: number
    exit_velocity: number
    launch_angle: number
    pitch_type: string
}
export type FacilityType = {
    id: string
    email: string
    u_name: string
}
type ProfilePitcherSummaryType = {
    velocity: number
    spin_rate: number
    horizontal_break: number
}
type ProfilePitchingTopValuesType = {
    velocity: number
    spin_rate: number
    pitch_type: string
}
type PositionType = "Catcher" | "First Base" | "Second Base" | "Shortstop" | "ThirdBase" | "Outfield" | "Pitcher"
type ProfileRecentEventsType = {
    data_rows_count: number
    date: string
    event_name: string
    event_type: string
    id: string
    is_pitcher: boolean
}
export type SchoolType = {
    id: number
    name: string
}
export type TeamType = {
    id: number
    name: string
}
export type CurrentProfileType = {
    age: number
    avatar: string
    bats_hand: "r" | "l"
    biography: string
    facilities: FacilityType[]
    feet: number
    first_name: string
    id: string
    inches: number
    last_name: string
    position: string
    position2: string
    school: SchoolType
    school_year: string
    teams: TeamType[]
    throws_hand: "r" | "l"
    weight: number
}
export type ProfileType = CurrentProfileType & {
    act_score: number
    batter_summary: ProfileBatterSummaryType[]
    batting_top_values: ProfileBattingTopValuesType[]
    broad_jump: null
    events_opened: boolean
    favorite: boolean
    gpa_score: number
    grip_left: null
    grip_right: null
    paid: boolean
    pitcher_summary: ProfilePitcherSummaryType[]
    pitching_top_values: ProfilePitchingTopValuesType[]
    recent_events: ProfileRecentEventsType[]
    sat_score: number
    winsgspan: null
    wrist_to_elbow: null
}

type ProfileData = {
    profile: ProfileType;
}



export function Profile() {
    const id = useSelector<RootStateType, string>(state => state.data.profile.id)
    const {loading, data} = useQuery<ProfileData, { id: string }>(
        getProfile,
        {variables: {id}}
    );
    const profile = data && data.profile
    const [isEditMode, setIsEditMode] = useState(true)
    return (
        <ProfileBlock>
            {profile &&
            <MainContainer>
                {isEditMode
                    ? <ProfileInfoEdit
                        offEditMode={() => setIsEditMode(false)}
                        profile={profile}
                    />
                    : <ProfileInfoView
                        onEditMode={() => setIsEditMode(true)}
                        profile={profile}
                    />
                }
                <ProfileInfoMain profile={profile}/>
            </MainContainer>
            }
        </ProfileBlock>
    )
}

const ProfileBlock = styled.div`
  box-sizing: inherit;
  grid-area: content;
  background: #fff;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`
const MainContainer = styled.div`
  flex: 2;
  display: flex;
  overflow: hidden;
  height: 100%;
`
