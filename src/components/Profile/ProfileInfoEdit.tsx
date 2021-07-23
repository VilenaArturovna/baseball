import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {CustomSelect, CustomMultiSelect, CustomPositionSelect} from "../../assets/components/CustomSelect";
import {CustomTextField, theme} from "../../assets/components/CustomTextField";
import {CurrentProfileType, FacilityType, ProfileRecentEventsType, ProfileType, SchoolType, TeamType} from "./Profile";
import {useDispatch, useSelector} from "react-redux";
import {getFacilities, getSchools, getTeams} from "../../redux/reducers/data-reducer";
import {RootStateType} from "../../redux/store";
import userIcon from "./../../assets/images/user.png"
import {useMutation} from "@apollo/client";
import {ChangeProfile} from "../../queries/changeProfile";
import {useFormik, FormikProvider} from "formik";
import {FormControl, TextField} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core/styles";

const positions = [
    {label: "Catcher", value: 'catcher'},
    {label: "First Base", value: 'first_base'},
    {label: "Second Base", value: 'second_base'},
    {label: "Shortstop", value: 'shortstop'},
    {label: "Third Base", value: 'third_base'},
    {label: "Outfield", value: 'outfield'},
    {label: "Pitcher", value: 'pitcher'}
]
const positions2 = [{label: '-', value: null}, ...positions]
const schoolYearVariants = [
    {label: "Freshman", value: 'freshman'},
    {label: "Sophomore", value: 'sophomore'},
    {label: "Junior", value: 'junior'},
    {label: "Senior", value: 'senior'},
    {label: "None", value: 'none'}
]

type PropsType = {
    offEditMode: () => void
    profile: ProfileType
}
type ProfileChangeData = {
    update_profile: {
        profile: CurrentProfileType & ProfileRecentEventsType[]
    }
}
type ProfileChangeVar = {
    form: CurrentProfileType
}
type FormikErrorType = {
    firstName?: string
    password?: string
}
type FormikDataType = {
    field: any
    meta: any
    form: any
}

export function ProfileInfoEdit({offEditMode, profile}: PropsType) {
    const [onChangeProfile] = useMutation<ProfileChangeData, ProfileChangeVar>(ChangeProfile)
    const schools = useSelector<RootStateType, Array<SchoolType>>(state => state.data.schools)
    const teams = useSelector<RootStateType, Array<TeamType>>(state => state.data.teams)
    const facilities = useSelector<RootStateType, Array<FacilityType>>(state => state.data.facilities)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSchools())
        dispatch(getTeams())
        dispatch(getFacilities())
    }, [dispatch])
    const formik = useFormik({
        initialValues: {
            first_name: profile.first_name,
            last_name: profile.last_name,
            position: profile.position,
            position2: profile.position2,
            age: profile.age,
            feet: profile.feet,
            inches: profile.inches,
            weight: profile.weight,
            throws_hand: profile.throws_hand,
            bats_hand: profile.bats_hand,
            school: profile.school,
            school_year: profile.school_year,
            teams: profile.teams,
            facilities: profile.facilities,
            biography: profile.biography,
            id: profile.id,
            avatar: profile.avatar
        },
        validate: values => {
            const errors: FormikErrorType = {}

            return errors
        },
        onSubmit: async (values: CurrentProfileType) => {
            try {
                await onChangeProfile({variables: {form: values}})
            } catch (e) {
                console.log(e.message)
            }
        }
    })
    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} style={{width: '300px'}}>
                <SideBar>
                    <UserInfo>
                        <Avatar>
                            <ImageBox src={profile.avatar || userIcon} alt={"avatar"}/>
                        </Avatar>
                        <InputFile type={'file'} id={"file"} onChange={() => {
                            'dispatch'
                        }}/>
                        <LabelDiv><LabelForInput htmlFor={"file"}>Choose photo</LabelForInput></LabelDiv>
                    </UserInfo>
                    <ThemeProvider theme={theme}>
                        <div>
                            <div style={{
                                width: "100%",
                                marginBottom: "20px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}>
                                <div style={{marginRight: "8px"}}>
                                    <FormControl variant={"outlined"}>
                                        <TextField
                                            variant="outlined"
                                            label={"First Name"}
                                            {...formik.getFieldProps('first_name')}
                                        />
                                    </FormControl>
                                </div>
                                <div style={{marginLeft: "8px"}}>
                                    <FormControl variant={"outlined"}>
                                        <TextField
                                            variant="outlined"
                                            label={"Last Name"}
                                            {...formik.getFieldProps('last_name')}
                                        />
                                    </FormControl>
                                </div>
                            </div>
                            <div style={{width: "100%", marginBottom: "10px"}}>
                                <CustomPositionSelect
                                    label={"Position in Game"}
                                    {...formik.getFieldProps('position')}
                                    array={positions}/>
                            </div>
                            <div style={{width: "100%", marginBottom: "20px"}}>
                                <CustomPositionSelect
                                    label={"Secondary Position in Game"}
                                    {...formik.getFieldProps('position2')}
                                    array={positions2}/>
                            </div>
                            <SubTitle>
                                <SubTitleText>Personal Info</SubTitleText>
                            </SubTitle>
                            <div style={{width: "100%", marginBottom: "10px"}}>
                                <FormControl variant={"outlined"}>
                                    <TextField variant="outlined" label={"Age"} {...formik.getFieldProps('age')}/>
                                </FormControl>
                            </div>
                            <div style={{
                                width: "100%",
                                marginBottom: "10px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}>
                                <div style={{marginRight: "8px"}}>
                                    <FormControl variant={"outlined"}>
                                        <TextField
                                            variant="outlined"
                                            label={"Feet"}
                                            {...formik.getFieldProps('feet')}
                                        />
                                    </FormControl>
                                </div>
                                <div style={{marginLeft: "8px"}}>
                                    <FormControl variant={"outlined"}>
                                        <TextField
                                            variant="outlined"
                                            label={"Inches"}
                                            {...formik.getFieldProps('inches')}
                                        />
                                    </FormControl>
                                </div>
                            </div>
                            <div style={{width: "100%", marginBottom: "10px"}}>
                                <FormControl variant={"outlined"}>
                                    <TextField
                                        variant="outlined"
                                        label={"Weight"}
                                        {...formik.getFieldProps('weight')}
                                    />
                                </FormControl>
                            </div>
                            <div style={{
                                width: "100%",
                                marginBottom: "20px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}>
                                <div style={{marginRight: "8px"}}>
                                    <CustomSelect
                                        label={"Throws"}
                                        {...formik.getFieldProps('throws_hand')}
                                        value={profile.throws_hand.toUpperCase()}
                                        array={[{id: "1", name: "R"}, {id: "2", name: "L"}]}
                                    />
                                </div>
                                <div style={{marginLeft: "8px"}}>
                                    <CustomSelect
                                        label={"Bats"}
                                        {...formik.getFieldProps('bats_hand')}
                                        value={profile.bats_hand.toUpperCase()}
                                        array={[{id: "1", name: "R"}, {id: "2", name: "L"}]}
                                    />
                                </div>
                            </div>
                            <SubTitle>
                                <SubTitleText>School</SubTitleText>
                            </SubTitle>
                            <div style={{width: "100%", marginBottom: "10px"}}>
                                <CustomSelect
                                    label={"School"}
                                    array={schools}
                                    {...formik.getFieldProps('school')}
                                    value={profile.school.name}
                                />
                            </div>
                            <div style={{width: "100%", marginBottom: "10px"}}>
                                <CustomPositionSelect
                                    label={"School Year"}
                                    array={schoolYearVariants}
                                    {...formik.getFieldProps('school_year')}
                                />
                            </div>
                            <div style={{width: "100%", marginBottom: "20px"}}>
                                <CustomMultiSelect
                                    label={"Teams"}
                                    array={teams}
                                    {...formik.getFieldProps('teams')}
                                    value={profile.teams.map(team => team.name)}
                                />
                            </div>
                            <SubTitle>
                                <SubTitleText>Facility</SubTitleText>
                            </SubTitle>
                            <div style={{width: "100%", marginBottom: "20px"}}>
                                <CustomMultiSelect
                                    label={"Facility"}
                                    array={facilities}
                                    {...formik.getFieldProps('facilities')}
                                    value={profile.facilities.map(facility => facility.u_name)}
                                />
                            </div>
                            <SubTitle>
                                <SubTitleText>About</SubTitleText>
                            </SubTitle>
                            <div style={{
                                display: 'flex',
                                position: 'relative',
                                marginBottom: '15px'
                            }}>
                                <div style={{width: "100%", display: "flex", flexDirection: 'column'}}>
                                    <Textarea
                                        {...formik.getFieldProps('biography')}
                                    />
                                </div>
                            </div>
                        </div>
                    </ThemeProvider>
                    <ButtonGroup>
                        <ButtonItem onClick={offEditMode} style={{marginRight: "12px"}}>Cancel</ButtonItem>
                        <ButtonItem
                            type={"submit"}
                            style={{
                                color: "#ffffff",
                                backgroundColor: "#48bbff",
                                border: "solid 1px transparent"
                            }}>
                            Save
                        </ButtonItem>
                    </ButtonGroup>
                </SideBar></form>
        </FormikProvider>
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
  width: 268px;
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
const Textarea = styled.input`
  display: block;
  min-height: 110px;
  resize: none;
  border-radius: 4px;
  background-color: #eff1f3;
  padding: 11px 16px;
  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  color: #667784;
  border: 1px solid transparent;
  transition: all 0.2s;
  touch-action: manipulation;
  outline-color: #48bbff;
  outline-width: 0.5px;
`
