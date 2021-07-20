import React, {useState} from "react";
import styled from "styled-components";
import {useQuery} from "@apollo/client";
import {getBattingSummary} from "../../../queries/getBattingSummary";

type ActiveTabValuesType = "Batting" | "Comparison" | "Session Reports"
type BattingValuesType = "Summary" | "Charts" | "Log"

type ButtonStyleType = {
    isActive: boolean
}
type ValueType = {
    id: number | null
    distance: number
    pitch_type: string | null
    launch_angle: number | null
    exit_velocity: number
}
type GetBattingSummaryType = {
    batting_summary: {
        top_values: Array<ValueType>
        average_values: Array<ValueType>
    }
}

export const StatisticCard = ({id}: { id: string }) => {
    const {loading, data} = useQuery<GetBattingSummaryType, { id: string }>(
        getBattingSummary,
        {variables: {id: "415"}}
    )
    const battingSummary = data && data.batting_summary

    //console.log(data)

    const [activeTab, setActiveTab] = useState<ActiveTabValuesType>("Batting")
    const [battingTab, setBattingTab] = useState<BattingValuesType>("Summary")
    const onActiveBatting = () => setActiveTab("Batting")
    const onActiveComparison = () => setActiveTab("Comparison")
    //const onActiveSessionReports = () => setActiveTab("Session Reports")
    const onActiveBattingSummary = () => setBattingTab("Summary")
    const onActiveBattingCharts = () => setBattingTab("Charts")
    const onActiveBattingLog = () => setBattingTab("Log")

    return (
        <Card>
            <Table>
                <TableHeading>
                    <BattingButton isActive={activeTab === "Batting"} onClick={onActiveBatting}>
                        Batting
                        <DropdownPanel>
                            <StyledLink onClick={onActiveBattingSummary}>Summary</StyledLink>
                            <StyledLink onClick={onActiveBattingCharts}>Charts</StyledLink>
                            <StyledLink onClick={onActiveBattingLog}>Log</StyledLink>
                        </DropdownPanel>
                    </BattingButton>
                    <TableHeadingButton isActive={activeTab === "Comparison"} onClick={onActiveComparison}>
                        Comparison
                    </TableHeadingButton>
                </TableHeading>
                <TablePanel>
                    {activeTab === "Batting"
                    && battingTab === "Summary"
                    && battingSummary
                    && battingSummary.top_values[0]
                        ? <div>
                            <DivFlexDirectionColumn>
                                <TableSection>
                                    <TableSectionHeading>
                                        Top Batting Values
                                    </TableSectionHeading>
                                    <DivFlexDirectionColumn>
                                        <DivFlex>
                                            <TableSectionHeader>
                                                <TableCol><TableColTitle>Pitch Type</TableColTitle></TableCol>
                                                <TableCol><TableColTitle>Distance</TableColTitle></TableCol>
                                                <TableCol><TableColTitle>Launch Angle</TableColTitle></TableCol>
                                                <TableCol><TableColTitle>Exit
                                                    Velocity</TableColTitle></TableCol>
                                            </TableSectionHeader>
                                        </DivFlex>
                                    </DivFlexDirectionColumn>
                                    <TableBody>
                                        {battingSummary.top_values.map((value, index) => {
                                            return value.pitch_type
                                                ? (
                                                    <TableRow key={index}>
                                                        <TableColBatting><TableColTitle>{value.pitch_type}</TableColTitle></TableColBatting>
                                                        <TableColBatting><TableColTitle>{value.distance}</TableColTitle></TableColBatting>
                                                        <TableColBatting><TableColTitle>{value.launch_angle}</TableColTitle></TableColBatting>
                                                        <TableColBatting><TableColTitle>{value.exit_velocity}</TableColTitle></TableColBatting>
                                                    </TableRow>
                                                )
                                                : null
                                        })}
                                    </TableBody>
                                </TableSection>
                            </DivFlexDirectionColumn>
                            <DivFlexDirectionColumn>
                                <TableSection>
                                    <TableSectionHeading>
                                        Average Batting Values
                                    </TableSectionHeading>
                                    <DivFlexDirectionColumn>
                                        <DivFlex>
                                            <TableSectionHeader>
                                                <TableCol><TableColTitle>Pitch Type</TableColTitle></TableCol>
                                                <TableCol><TableColTitle>Distance</TableColTitle></TableCol>
                                                <TableCol><TableColTitle>Launch Angle</TableColTitle></TableCol>
                                                <TableCol><TableColTitle>Exit
                                                    Velocity</TableColTitle></TableCol>
                                            </TableSectionHeader>
                                        </DivFlex>
                                    </DivFlexDirectionColumn>
                                    <TableBody>
                                        {battingSummary.average_values.map((value, index) => (
                                            <TableRow key={index}>
                                                <TableColBatting><TableColTitle>{value.pitch_type}</TableColTitle></TableColBatting>
                                                <TableColBatting><TableColTitle>{value.distance}</TableColTitle></TableColBatting>
                                                <TableColBatting><TableColTitle>{value.launch_angle}</TableColTitle></TableColBatting>
                                                <TableColBatting><TableColTitle>{value.exit_velocity}</TableColTitle></TableColBatting>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </TableSection>
                            </DivFlexDirectionColumn>
                        </div>
                        : <EmptyField>There&apos;s no info yet!</EmptyField>}
                </TablePanel>
            </Table>
        </Card>
    )
}

const Card = styled.div`
  background: #fff;
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  box-sizing: border-box;
  flex-grow: 1;
`
const DivFlexDirectionColumn = styled.div`
  display: flex;
  flex-direction: column;
`
const DivFlex = styled.div`
  display: flex;
`
const Table = styled.div`
  width: 100%;
`
const TableHeading = styled.div`
  margin: 0;
  padding: 0;
  box-shadow: unset;
  display: flex;
  justify-content: flex-start;
`
const TableHeadingButton = styled.div<ButtonStyleType>`
  position: relative;
  list-style: none;
  font-size: 14px;
  line-height: 17px;
  font-weight: 700;
  cursor: pointer;
  padding: 8px;
  margin: 8px;
  border: 2px solid #788b99;
  border-radius: 40px;
  color: ${props => props.isActive ? '#ffffff' : '#667784'};
  background: ${props => props.isActive ? '#667784' : '#ffffff'};
`
const BattingButton = styled(TableHeadingButton)`

`
const DropdownPanel = styled.div`
  display: none;
  width: 178px;
  position: absolute;
  left: -15px;
  margin-top: 12px;
  padding: 8px 0;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 3px 8px 0 rgb(0 0 0 / 15%);
  border: solid 1px #ebebeb;
  z-index: 100;
  top: inherit;

  ${BattingButton}:hover & {
    display: block;
  }
`
const StyledLink = styled.a`
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  display: block;
  padding: 8px 16px;
  background: #fff;
  line-height: 1;
  color: #788b99;
`
const TablePanel = styled.div`
  display: block;
  min-height: 420px;
`
const TableSection = styled(DivFlexDirectionColumn)`
  margin-top: 15px;
`
const TableSectionHeading = styled.div`
  line-height: 1.25;
  font-size: 18px;
  color: #414f5a;
  font-weight: 400;
  text-align: left;
`
const TableSectionHeader = styled.div`
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
  position: sticky;
  top: 0;
  background: #fff;
`
const TableCol = styled.div`
  display: flex;
  font-size: 14px;
  line-height: 1;
  font-weight: 300;
  color: #667784;
  width: 194px;
  -webkit-flex: 1 0 194px;
  -ms-flex: 1 0 194px;
  flex: 1 0 194px;
`
const TableColTitle = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
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
const TableRow = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
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

  &:hover {
    background-color: #b3d4fc;
    color: #000;
    text-shadow: none;
  }
`
const TableColBatting = styled(TableCol)`
  color: #414f5a;
  font-weight: 400;
`
const EmptyField = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  min-height: 420px;
  color: #667784;
  font-size: 16px;
`
