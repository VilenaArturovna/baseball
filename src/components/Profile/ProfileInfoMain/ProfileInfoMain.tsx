import styled from "styled-components";
import React from "react";
import {ProfileType} from "../Profile";
import {StatisticCard} from "./StatisticCard";

type PropsType = {
    profile: ProfileType
}

export function ProfileInfoMain({profile}: PropsType) {

    return (
        <MainBlock>
            <DivFlexDirectionColumn>
                <PitcherSummary>
                    <DivFlex>
                        <TitleHeading>Top Batting Values</TitleHeading>
                    </DivFlex>
                    <FlexContainer>
                        <ItemTopBatting>
                            <TextBox>Exit Velocity</TextBox>
                            <TextBoxValue>{profile.batter_summary[0] ? profile.batter_summary[0].exit_velocity : "N/A"}</TextBoxValue>
                        </ItemTopBatting>
                        <ItemTopBatting>
                            <TextBox>Carry Distance</TextBox>
                            <TextBoxValue>{profile.batter_summary[0] ? profile.batter_summary[0].distance : "N/A"}</TextBoxValue>
                        </ItemTopBatting>
                        <ItemTopBatting>
                            <TextBox>Launch Angle</TextBox>
                            <TextBoxValue>{profile.batter_summary[0] ? profile.batter_summary[0].launch_angle : "N/A"}</TextBoxValue>
                        </ItemTopBatting>
                    </FlexContainer>
                </PitcherSummary>
                <RecentEvents>
                    <DivFlex>
                        <TitleHeading>
                            Recent Session Reports
                        </TitleHeading>
                    </DivFlex>
                    <EmptyMessage>
                        No data currently linked to this profile
                    </EmptyMessage>
                </RecentEvents>
                <StatisticCard id={profile.id} />
            </DivFlexDirectionColumn>
        </MainBlock>
    )
}

const MainBlock = styled.main`
  background: #788b99;
  flex: 2;
  overflow: auto;
  width: calc(100vw - 220px);
  position: fixed;
  top: 52px;
  left: 300px;
`
const DivFlexDirectionColumn = styled.div`
  display: flex;
  flex-direction: column;
`
const Card = styled.div`
  background: #fff;
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  box-sizing: border-box;
  flex-grow: 1;
`
const PitcherSummary = styled(Card)`
  display: flex;
  max-width: 100%;
  min-width: 0;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
`
const DivFlex = styled.div`
  display: flex;
`
const TitleHeading = styled.div`
  line-height: 1.25;
  text-align: center;
  font-size: 18px;
  font-weight: 900;
  color: #414f5a;
`
const FlexContainer = styled.div`
  display: flex;
  overflow: hidden;
  height: 100%;
`
const ItemTopBatting = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  width: 300px;
  padding: 16px 24px 0 0;
`
const TextBox = styled.div`
  font-size: 16px;
  color: #667784;
`
const TextBoxValue = styled(TextBox)`
  font-weight: 700;
`
const RecentEvents = styled(Card)`
  display: flex;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  flex-direction: column;
`
const EmptyMessage = styled.div`
  color: #667784;
  font-size: 16px;
`

