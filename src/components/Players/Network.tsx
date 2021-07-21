import styled from "styled-components";
import {useQuery} from "@apollo/client";
import {getPlayerProfiles} from "../../queries/getPlayerProfiles";
import {useState} from "react";
import {SchoolType, TeamType} from "../Profile/Profile";
import Pagination from "rc-pagination"

const headerColumnsTitle = [
    "Player Name",
    "Sessions",
    "School",
    "Teams",
    "Age",
    "Favorite"
]
type PlayerProfileType = {
    age: number
    events: { id: string }[] | null
    favorite: boolean
    feet: number
    first_name: string
    id: string
    inches: number
    last_name: string
    position: string
    position2: string
    school: SchoolType | null
    school_year: string
    teams: TeamType[] | null
    weight: number
}
type NetworkData = {
    profiles: {
        profiles: PlayerProfileType[]
        total_count: number
    }

}
type NetworkVar = {
    input: {
        profiles_count: number
        offset: number
    }
}

export function Network() {
    const [pageSize, setPageSize] = useState(10)
    const {loading, data} = useQuery<NetworkData, NetworkVar>(
        getPlayerProfiles,
        {variables: {input: {profiles_count: pageSize, offset: 0}}}
    )
    const players = data && data.profiles.profiles
    return (
        <><MainContent>
            <Container>
                <PageHeader>
                    <TextHeader>Network</TextHeader>
                    <FiltersContainer>
                        здесь будут фильтры
                    </FiltersContainer>
                </PageHeader>
                <TableFilter>
                    <TableTitle>Available Players</TableTitle>
                    <TableSearch>
                        <ButtonSearch>&#128269;</ButtonSearch>
                        <FieldSearch placeholder={'Player Name'}/>
                    </TableSearch>
                </TableFilter>
                <TableContent>
                    <ContentBox>
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
                                && players
                                && players.map((player) => {
                                    return (
                                        <TableBodyRow key={player.id}>
                                            <FirstRow><RowInner>{`${player.first_name} ${player.last_name}`}</RowInner></FirstRow>
                                            <FirstRow><RowInner>{player.events ? player.events.length : '-'}</RowInner></FirstRow>
                                            <FirstRow><RowInner>{player.school ? player.school.name : '-'}</RowInner></FirstRow>
                                            <FirstRow><RowInner>
                                                {(player.teams && player.teams.length > 0) ? player.teams.map(team => team.name).join(", ") : '-'}
                                            </RowInner></FirstRow>
                                            <FirstRow><RowInner>{player.age}</RowInner></FirstRow>
                                            <FirstRow><RowInner>
                                                {player.favorite
                                                    ? <span style={{color: '#48bbff'}}>&#9829;</span>
                                                    : <span style={{color: '#48bbff'}}>&#9825;</span>}
                                            </RowInner></FirstRow>
                                        </TableBodyRow>
                                    )
                                })
                            }
                        </TableBody>
                    </ContentBox>
                    <div style={{display: "flex", flexDirection: "row"}}>
                    </div>
                </TableContent>

            </Container>

        </MainContent>
            <Pagination
                total={data && data.profiles.total_count}
                style={{display: "flex"}}/></>
    )
};

const MainContent = styled.div`
  grid-area: content;
  background: #fff;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`
const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
`
const PageHeader = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
`
const TextHeader = styled.div`
  font-size: 24px;
  line-height: 1.25;
  font-weight: 400;
  text-align: center;
  color: #667784;
`
const FiltersContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  flex-flow: row wrap;
`
const TableFilter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`
const TableTitle = styled.div`
  line-height: 1.25;
  font-size: 18px;
  color: #414f5a;
  font-weight: 400;
  text-align: left;
`
const TableSearch = styled.div`
  display: flex;
  position: relative;
`
const ButtonSearch = styled.div`
  display: block;
  border-radius: 4px;
  box-shadow: none;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  padding: 0;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
`
const FieldSearch = styled.input`
  display: block;
  padding: 5px 5px 5px 24px;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  color: #788b99;
  border: none;
  border-bottom: 1px solid #48bbff;
  width: 130px;
  outline: none;
`
const TableContent = styled.div`
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
`
const ContentBox = styled.div`
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  padding: 16px;
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
