import styled from "styled-components";
import React from "react";
import {ProfileType} from "./Profile";


type PropsType = {
    onEditMode: () => void
    profile: ProfileType
}

export function ProfileInfoView({onEditMode, profile}: PropsType) {
    return (
        <SideBar>
            <UserInfo>
                <Avatar>
                    <ImageBox src={profile.avatar} alt={"avatar"}/>
                </Avatar>
                <UserName>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Name>
                            {`${profile.first_name} ${profile.last_name}`}
                        </Name>
                        <Base>{profile.position}</Base>
                        <Base>{profile.position2}</Base>
                    </div>
                </UserName>
                <EditButton onClick={onEditMode}>
                    Edit
                </EditButton>
            </UserInfo>
            <PersonalInfo>
                <Item>
                    <span>Age</span>
                    <span>{profile.age}</span>
                </Item>
                <Item>
                    <span>Height</span>
                    <span>{`${profile.feet} ft ${profile.inches} in`}</span>
                </Item>
                <Item>
                    <span>Weight</span>
                    <span>{`${profile.weight} lbs`}</span>
                </Item>
                <Item>
                    <span>Throws</span>
                    <span>{profile.throws_hand.toUpperCase()}</span>
                </Item>
                <Item>
                    <span>Bats</span>
                    <span>{profile.bats_hand.toUpperCase()}</span>
                </Item>
            </PersonalInfo>
            <SchoolInfo>
                <SchoolInfoItem>
                    <Heading>School</Heading>
                    <TextBox>{profile.school.name}</TextBox>
                </SchoolInfoItem>
                <SchoolInfoItem>
                    <Heading>School Year</Heading>
                    <TextBox>{profile.school_year}</TextBox>
                </SchoolInfoItem>
                <SchoolInfoItem>
                    <Heading>Team</Heading>
                    <TextBox>{profile.teams.map(team => team.name).join(", ")}</TextBox>
                </SchoolInfoItem>
                <SchoolInfoItem>
                    <Heading>Facility</Heading>
                    <TextBox>{profile.facilities.map(facility => facility.u_name).join(", ")}</TextBox>
                </SchoolInfoItem>
            </SchoolInfo>
            <About>
                <AboutHeading>About</AboutHeading>
            </About>
            <UserNote>{profile.biography}</UserNote>
        </SideBar>
    );
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
`
const Avatar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 6px;
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
const UserName = styled.div`
  display: flex;
  justify-content: space-evenly;
`
const Name = styled.div`
  font-size: 20px;
  line-height: 24px;
  color: #414f5a;
  word-wrap: break-word;
  word-break: break-all;
  text-align: center;
`
const Base = styled.div`
  font-size: 16px;
  line-height: 19px;
  color: #788b99;
`
const EditButton = styled.button`
  border-radius: 4px;
  box-shadow: none;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  padding: 0;
  border-style: none;
  width: fit-content;
  background-color: white;
  color: #788b99 !important;
  align-self: flex-end;
`
const PersonalInfo = styled.div`
  display: flex;
  flex-flow: column;
`
const Item = styled.div`
  display: flex;
  padding: 16px 0;
  justify-content: space-between;
`
const SchoolInfo = styled.div`
  display: flex;
  flex-direction: column;
`
const SchoolInfoItem = styled.div`
  display: flex;
  flex-direction: column;
`
const Heading = styled.div`
  font-size: 14px;
  line-height: 17px;
  font-weight: 300;
  color: #667784;
  margin-bottom: 3px;
  text-align: left;
`
const TextBox = styled.div`
  font-size: 16px;
  color: #667784;
  word-wrap: break-word;
  margin-bottom: 11px;
`
const About = styled.div`
  display: flex;
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
const AboutHeading = styled.div`
  line-height: 1.25;
  font-size: 18px;
  font-weight: 900;
  color: #414f5a;
  text-align: left;
  display: inline-block;
  position: relative;
  z-index: 1;
  background-color: #ffffff;
  padding-right: 12px;
`
const UserNote = styled.div`
  font-size: 16px;
  color: #788b99;
  line-height: 1.75;
  word-wrap: break-word;
`
