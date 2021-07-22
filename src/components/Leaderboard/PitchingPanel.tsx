import {useQuery} from "@apollo/client";
import {getLeaderboardPitching} from "../../queries/getLeaderboardPitching";
import {SchoolType, TeamType} from "../Profile/Profile";
import styled from "styled-components";
import {useState} from "react";
import {Preloader} from "../../assets/components/Preloader";
import {NavLink} from "react-router-dom";

const headerColumnsTitle = [
    "Rank",
    "Pitcher Name",
    "Age",
    "School",
    "Teams",
    "Pitch Type",
    "Velocity",
    "Spin Rate",
    "Favorite"
]

type LeaderboardPitchingType = {
    age: number
    favorite: boolean
    horizontal_break: number
    pitch_type: string
    pitcher_datraks_id: number
    pitcher_name: string
    school: SchoolType
    spin_rate: number
    teams: TeamType[]
    velocity: number
    vertical_break: number
}
type PitchingData = {
    leaderboard_pitching: {
        leaderboard_pitching: LeaderboardPitchingType[]
    }
}
type PitchingVar = {
    input: {
        type: string
    }
}

export function PitchingPanel() {
    const [filter, setFilter] = useState<'Pitch Velocity' | 'Spin Rate'>('Pitch Velocity')
    const [isOpenDropdown, setIsOpenDropdown] = useState(false)
    const choosePitchVelocity = () => {
        setFilter('Pitch Velocity')
        setIsOpenDropdown(false)
    }
    const chooseSpinRate = () => {
        setFilter('Spin Rate')
        setIsOpenDropdown(false)
    }
    const {loading, data} = useQuery<PitchingData, PitchingVar>(
        getLeaderboardPitching,
        {variables: {input: {type: "pitch_velocity"}}}
    )
    let leaders = data && data.leaderboard_pitching.leaderboard_pitching
    if (loading) return <Preloader/>
    return (
        <Container>
            <Content>
                <Filter>
                    <Dropdown>
                        <DropdownButton onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
                            {filter} {!isOpenDropdown ? <span>&#5167;</span> : <span>&#5169;</span>}
                        </DropdownButton>
                        <DropdownPanel isActive={isOpenDropdown}>
                            <DropdownPanelItem onClick={choosePitchVelocity}>Pitch Velocity</DropdownPanelItem>
                            <DropdownPanelItem onClick={chooseSpinRate}>Spin Rate</DropdownPanelItem>
                        </DropdownPanel>
                    </Dropdown>
                </Filter>
                <Table>
                    <TableHeader>
                        <ResponsiveTableHeader>
                            {headerColumnsTitle.map((title, index) => {
                                return <TableHeaderColumn key={index}>
                                    <TableHeaderColumnTitle>
                                        {title}
                                    </TableHeaderColumnTitle>
                                </TableHeaderColumn>
                            })}
                        </ResponsiveTableHeader>
                    </TableHeader>
                    <TableBody>
                        {
                            data
                            && leaders
                            && leaders.map((leader, index) => {
                                return (
                                    <NavLink
                                        to={`/profile/${leader.pitcher_datraks_id}`}
                                        style={{textDecoration: "none"}}
                                        key={leader.pitcher_datraks_id}
                                    >
                                        <TableBodyRow>
                                            <FirstRow><RowInner>{index + 1}</RowInner></FirstRow>
                                            <FirstRow><RowInner>{leader.pitcher_name}</RowInner></FirstRow>
                                            <FirstRow><RowInner>{leader.age}</RowInner></FirstRow>
                                            <FirstRow><RowInner>{leader.school.name}</RowInner></FirstRow>
                                            <FirstRow><RowInner>{leader.teams.map(team => team.name).join(", ")}</RowInner></FirstRow>
                                            <FirstRow><RowInner>{leader.pitch_type}</RowInner></FirstRow>
                                            <FirstRow><RowInner>{leader.velocity}</RowInner></FirstRow>
                                            <FirstRow><RowInner>{leader.spin_rate}</RowInner></FirstRow>
                                            <FirstRow><RowInner>
                                                {leader.favorite
                                                    ? <span style={{color: '#48bbff'}}>&#9829;</span>
                                                    : <span style={{color: '#48bbff'}}>&#9825;</span>}
                                            </RowInner></FirstRow>
                                        </TableBodyRow>
                                    </NavLink>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </Content>
        </Container>
    )
}

const Container = styled.div`
  display: block;
`
const Content = styled.div`
  padding: 16px;
`
const Filter = styled.div`
  display: flex;
  margin-bottom: 23px;
`
const Dropdown = styled.div`
  display: flex;
  position: absolute;
  right: 46px;
  top: 18px;`
const DropdownButton = styled.div`
  display: block;
  border-radius: 4px;
  box-shadow: none;
  font-size: 16px;
  font-weight: 400;
  padding: 0;
  line-height: 1.19;
  color: #48bbff;
  white-space: nowrap;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  align-items: flex-start;
`
const DropdownPanel = styled.div<{ isActive: boolean }>`
  width: 178px;
  position: absolute;
  top: 100%;
  margin-top: 12px;
  padding: 8px 0;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 3px 8px 0 rgb(0 0 0 / 15%);
  border: solid 1px #ebebeb;
  z-index: 100;
  right: -25px;
  left: inherit;

  display: ${props => props.isActive ? 'block' : 'none'};
`
const DropdownPanelItem = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #788b99;
  cursor: pointer;
  display: block;
  padding: 8px 16px;
  background: #fff;
  line-height: 1;
`
const Table = styled.div`
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  margin-bottom: 21px;
`
const TableHeader = styled.div`
  display: flex;
  position: sticky;
  top: 0;
`
const ResponsiveTableHeader = styled.div`
  display: flex;
  width: 100%;
  -webkit-flex: 0 0 100%;
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  min-height: 44px;
  margin-bottom: 6px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background: #fff;
`
const TableHeaderColumn = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  line-height: 1;
  font-size: 14px;
  font-weight: 300;
  color: #667784;
  background: #fff;
  width: 6.5%;
  -webkit-flex: 1 0 6.5%;
  -ms-flex: 1 0 6.5%;
  flex: 1 0 6.5%;
  min-width: 0;
`
const TableHeaderColumnTitle = styled.div`
  display: flex;
  max-width: 100%;
  text-overflow: ellipsis;
`
const TableBody = styled.div`
  background: #ffffff;
  font-size: 14px;
  line-height: 1;
  font-weight: 300;
  color: #667784;
  border-radius: 4px;
`
const TableBodyRow = styled.div`
  display: flex;
  width: 100%;
  -webkit-flex: 0 0 100%;
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: #f7f8f9;
  min-height: 44px;
  margin-bottom: 4px;
`
const FirstRow = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  line-height: 1;
  font-weight: 400;
  font-size: 14px;
  color: #414f5a;
  width: 6.5%;
  -webkit-flex: 1 0 6.5%;
  -ms-flex: 1 0 6.5%;
  flex: 1 0 6.5%;
  min-width: 0;
  padding-left: 6px;
`
const RowInner = styled.div`
  display: flex;
  max-width: 100%;
  text-overflow: ellipsis;
`
