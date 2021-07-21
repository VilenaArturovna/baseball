import styled from "styled-components";
import {useState} from "react";
import {BattingPanel} from "./BattingPanel";
import {PitchingPanel} from "./PitchingPanel";

export function Leaderboard() {
    const [activeTab, setActiveTab] = useState<"batting" | "pitching">("batting")
    return (
        <MainContent>
            <Container>
                <PageHeader>
                    <TextHeader>Leaderboard</TextHeader>
                    <FiltersContainer>
                        здесь будут фильтры
                    </FiltersContainer>
                </PageHeader>
                <ContentBox>
                    <Table>
                        <TabList>
                            <TabItem
                                isActive={activeTab === 'batting'}
                                onClick={() => setActiveTab('batting')}
                            >
                                Batting
                            </TabItem>
                            <TabItem
                                isActive={activeTab === 'pitching'}
                                onClick={() => setActiveTab('pitching')}
                            >
                                Pitching
                            </TabItem>
                        </TabList>
                        <TabPanel>
                            {
                                activeTab === 'batting'
                                    ? <BattingPanel />
                                    : <PitchingPanel />
                            }
                        </TabPanel>
                    </Table>
                </ContentBox>
            </Container>
        </MainContent>
    )
}

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
const ContentBox = styled.main`
  display: flex;
  position: relative;
`
const Table = styled.div`
  width: 100%;
`
const TabList = styled.div`
    display: flex;
flex-direction: row;
`
const TabItem = styled.div<{isActive: boolean}>`
  position: relative;
  list-style: none;
  font-size: 14px;
  line-height: 17px;
  font-weight: 700;
  cursor: pointer;
  padding: 8px;
  margin: 8px;
  border: 2px solid #667784;
  border-radius: 40px;
  color: ${props => props.isActive ? '#ffffff' : '#667784'};
  background: ${props => props.isActive ? '#667784' : '#ffffff'};
`
const TabPanel = styled.div`
  display: block;
`
