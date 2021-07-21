import React, {useEffect} from "react";
import styled from "styled-components";
import avatar from "../../assets/images/logo192.png";
import {CustomSelect} from "../../assets/components/CustomSelect";
import {CustomTextField} from "../../assets/components/CustomTextField";
import {FacilityType, ProfileType, SchoolType, TeamType} from "./Profile";
import {useDispatch, useSelector} from "react-redux";
import {getFacilities, getSchools, getTeams} from "../../redux/reducers/data-reducer";
import {RootStateType} from "../../redux/store";

type PropsType = {
    offEditMode: () => void
    profile: ProfileType
}

export function ProfileInfoEdit({offEditMode, profile}: PropsType) {

    const schools = useSelector<RootStateType, Array<SchoolType>>(state => state.data.schools)
    const teams = useSelector<RootStateType, Array<TeamType>>(state => state.data.teams)
    const facilities = useSelector<RootStateType, Array<FacilityType>>(state => state.data.facilities)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSchools())
        dispatch(getTeams())
        dispatch(getFacilities())
    }, [])
    return (
        <SideBar>
            <UserInfo>
                <Avatar>
                    <ImageBox src={avatar} alt={"avatar"}/>
                </Avatar>
                <InputFile type={'file'} id={"file"} onChange={() => {
                    'dispatch'
                }}/>
                <LabelDiv><LabelForInput htmlFor={"file"}>Choose photo</LabelForInput></LabelDiv>
            </UserInfo>
            <div>
                <div style={{width: "100%", marginBottom: "20px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <div style={{marginRight: "8px"}}><CustomTextField label={"First Name"} value={profile.first_name}/></div>
                    <div style={{marginLeft: "8px"}}><CustomTextField label={"Last Name"} value={profile.last_name}/></div>
                </div>
                <div style={{width: "100%", marginBottom: "10px"}}>
                    <CustomSelect label={"Position in Game"}/>
                </div>
                <div style={{width: "100%", marginBottom: "20px"}}>
                    <CustomSelect label={"Secondary Position in Game"}/>
                </div>
                <SubTitle>
                    <SubTitleText>Personal Info</SubTitleText>
                </SubTitle>
                <div style={{width: "100%", marginBottom: "10px"}}>
                    <CustomTextField label={"Ages"} value={profile.age}/>
                </div>
                <div style={{width: "100%", marginBottom: "10px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <div style={{marginRight: "8px"}}><CustomTextField label={"Feet"} value={profile.feet}/></div>
                    <div style={{marginLeft: "8px"}}><CustomTextField label={"Inches"} value={profile.inches}/></div>
                </div>
                <div style={{width: "100%", marginBottom: "10px"}}>
                    <CustomTextField label={"Weight"} value={profile.weight}/>
                </div>
                <div style={{width: "100%", marginBottom: "20px", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <div style={{marginRight: "8px"}}><CustomSelect label={"Throws"} value={profile.throws_hand.toUpperCase()} array={[{id: "1", name: "R"}, {id: "2", name: "L"}]}/></div>
                    <div style={{marginLeft: "8px"}}><CustomSelect label={"Bats"} value={profile.bats_hand.toUpperCase()} array={[{id: "1", name: "R"}, {id: "2", name: "L"}]}/></div>
                </div>
                <SubTitle>
                    <SubTitleText>School</SubTitleText>
                </SubTitle>
                <div style={{width: "100%", marginBottom: "10px"}}>
                    <CustomSelect label={"School"} array={schools} value={profile.school.name}/>
                </div>
                <div style={{width: "100%", marginBottom: "10px"}}>
                    <CustomSelect label={"School Year"} value={profile.school_year}/>
                </div>
                <div style={{width: "100%", marginBottom: "20px"}}>
                    <CustomSelect label={"Team"} array={teams}/>
                </div>
                <SubTitle>
                    <SubTitleText>Facility</SubTitleText>
                </SubTitle>
                <div style={{width: "100%", marginBottom: "20px"}}>
                    <CustomSelect label={"Facility"} array={facilities} value={facilities.length > 0 ? facilities[0].u_name : ""}/>
                </div>
                <SubTitle>
                    <SubTitleText>About</SubTitleText>
                </SubTitle>
            </div>
            <ButtonGroup>
                <ButtonItem onClick={offEditMode} style={{marginRight: "12px"}}>Cancel</ButtonItem>
                <ButtonItem
                    onClick={() => {
                    }}
                    style={{
                        color: "#ffffff",
                        backgroundColor: "#48bbff",
                        border: "solid 1px transparent"
                    }}>
                    Save
                </ButtonItem>
            </ButtonGroup>
        </SideBar>
    )
}

const SideBar = styled.aside`
  opacity: 1;
  position: relative;
  flex: 0 0 268px;
  height: auto;
  z-index: 1;
  display: block;
  -webkit-transition: all 0.1s;
  transition: all 0.1s;
  box-shadow: 0 2px 15px 0 rgb(0 0 0 / 10%);
  background: #fff;
  border-left: 1px solid rgba(0, 0, 0, .1);
  width: 200px;
  overflow: auto;
  padding: 16px;
`
const UserInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 23px;
`
const Avatar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`
const ImageBox = styled.img`
  display: block;
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 50%;
  background-color: black;
`
const InputFile = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`
const LabelDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
`
const LabelForInput = styled.label`
  margin-bottom: 0;
  font-size: 14px;
  line-height: 1;
  font-weight: 400;
  color: #788b99;
  cursor: pointer;
  white-space: nowrap;
  text-align: center;
`
const ButtonGroup = styled.div`
  display: flex;
  justify-content: center
`
const ButtonItem = styled.button`
  display: block;
  padding: 7px 19px 10px 18px;
  border-radius: 4px;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  border: solid 1px #d1d7db;
  background-color: #ffffff;
  box-shadow: 0 2px 25px 0 rgb(0 0 0 / 0%);
  width: 100%;
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
`
const SubTitle = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 15px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 11px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #e7ebef;
    z-index: 0;
  }
`
const SubTitleText = styled.div`
  font-size: 24px;
  line-height: 1.25;
  font-weight: 400;
  -webkit-text-align: center;
  text-align: center;
  color: #667784;
  font-size: 18px;
  font-weight: 900;
  color: #414f5a;
  -webkit-text-align: left;
  text-align: left;
  display: inline-block;
  position: relative;
  z-index: 1;
  background-color: #ffffff;
  padding-right: 12px;
`
