import styled from "styled-components";
import icon from '../assets/images/icon_baseball_cloud.png';
import {useState} from "react";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../redux/store";
import {signOut} from "../redux/reducers/auth-reducer";
import {Redirect, NavLink} from "react-router-dom";


export function Header() {
    const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn)
    const current_profile = useSelector<RootStateType, any>(state => state.data.profile)
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const dispatch = useDispatch()
    const logOut = () => {
        dispatch(signOut())
    }

    if (!isLoggedIn) {
        return <Redirect to={'/auth'}/>
    }

    return (
        <HeaderBlock>
            <Icon href={'#'}>
                <IconImage src={icon} alt={'icon'}/>
            </Icon>
            {isLoggedIn
            && (
                <NavBar>
                    <GroupElement>
                        <Nav>
                            <NavItem to={'/leaderboard'}>Leaderboard</NavItem>
                            <NavItem to={'/network'}>Network</NavItem>
                        </Nav>
                    </GroupElement>
                    <GroupElement>
                        <DropdownSimple>
                            {current_profile
                            && <UserDiv>
                                <ImageBox>
                                    <a href={'#'}>
                                        <UserPhoto src={current_profile.avatar} alt={"avatar"}/>
                                    </a>
                                </ImageBox>
                                <Button onClick={toggle}>
                                    {`${current_profile.first_name} ${current_profile.last_name} `}&#9660;
                                </Button>
                            </UserDiv>
                            }
                            {isOpen
                            && <DropdownPanel>
                                <NavLink to={'/profile'} style={{textDecoration: 'none'}}>
                                    <Ref onClick={() => {setIsOpen(false)}}>My profile</Ref>
                                </NavLink>
                                <Ref onClick={logOut}>Log out</Ref>
                            </DropdownPanel>}
                        </DropdownSimple>
                    </GroupElement>
                </NavBar>
            )}
        </HeaderBlock>
    )
}

const HeaderBlock = styled.header`
  grid-area: hd;
  grid-column-end: span 2;
  display: flex;
  align-items: center;
  padding: 8px;
  background: #fff;
  background: var(--primaryColor, #fff);
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
`
const Icon = styled.a`
  color: #337ab7;
  text-decoration: none;
`
const IconImage = styled.img`
  height: 28px;
`
const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
`
const GroupElement = styled.div`
  display: inline-flex;
  margin-left: 16px;
`
const Nav = styled.nav`
  display: flex;
`
const NavItem = styled(NavLink)`
  padding: 0 8px;
  color: #788b99 !important;
  text-decoration: none !important;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
`
const DropdownSimple = styled.div`
  position: relative;
  display: inline-block;
`
const UserDiv = styled.div`
  display: flex;
`
const ImageBox = styled.div`
  display: block;
  -webkit-flex: 0 0 32px;
  -ms-flex: 0 0 32px;
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
  overflow: hidden;
  border-radius: 50%;
`
const UserPhoto = styled.img`
  width: 32px;
  height: 32px;
  background-size: cover;
  background-position: 50% 50%;
  background-color: black;
`
const Button = styled.button`
  background-color: transparent;
  border-style: none;
  margin: 0;
  padding: 7px 19px 10px 18px;
  border-radius: 4px;
  box-shadow: none;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  white-space: nowrap;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  color: #788b99 !important;
  cursor: pointer;
`
const DropdownPanel = styled.div`
  display: none;
  width: 178px;
  position: absolute;
  top: 100%;
  left: -15px;
  margin-top: 12px;
  padding: 8px 0;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 3px 8px 0 rgb(0 0 0 / 15%);
  border: solid 1px #ebebeb;
  z-index: 100;
  display: block;
  right: -5px;
  left: inherit;

  &:before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: -8px;
    right: 25px;
    z-index: 2;
    border-style: solid;
    border-width: 0 8px 8px 8px;
    border-color: transparent transparent #ffffff transparent;
  }

  &:after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: -9px;
    right: 25px;
    z-index: 1;
    border-style: solid;
    border-width: 0 8px 8px 8px;
    border-color: transparent transparent rgba(0, 0, 0, .15) transparent;
  }
`
const Ref = styled.a`
  font-size: 16px;
  font-weight: 400;
  color: #788b99;
  cursor: pointer;
  display: block;
  padding: 8px 16px;
  background: #fff;
  line-height: 1;
  text-decoration: none;
`
