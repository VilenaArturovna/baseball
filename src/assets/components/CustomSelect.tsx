import React from 'react';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import Select from "@material-ui/core/Select";
import {FormControl, InputLabel, MenuItem} from "@material-ui/core";

const theme = createTheme({
        overrides: {
            MuiSelect: {
                root: {
                    height: "38px",
                    backgroundColor: "#eff1f3",
                    borderColor: "transparent",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    color: '#333',
                    display: "table",
                    borderSpacing: "0",
                }
            },
            MuiInput: {
                root: {
                    maxWidth: "100%",
                    width: "100%",
                }
            },
            MuiFormControl: {
                root: {
                    maxWidth: "100%",
                    width: "100%",
                }
            },
            MuiOutlinedInput: {
                input: {padding: "10px 14px",
                backgroundColor: "#eff1f3"}
            }
        },
    },
    )
;
type SchoolType = {
    id: string
    name: string
}
const items: Array<SchoolType> = [
    {id: "2", name: "FSU"},
    {id: "3", name: "Rockledge"},
    {id: "4", name: "Good"},
    {id: "5", name: "asq3t"},
    {id: "6", name: "fxytdc"},
]

type PropsType = {
    label: string
    value?: string
}

export function CustomSelect({label}: PropsType) {
    return (
        <ThemeProvider theme={theme}>
            <FormControl variant={"outlined"}>
                <InputLabel id={"Schoool"}>{label}</InputLabel>
                <Select label={"School"} defaultValue={items[2].name} labelId={"Schoool"}>
                    {items.map(item => <MenuItem key={+item.id} value={item.name}>{item.name}</MenuItem>)}
                </Select>
            </FormControl>
        </ThemeProvider>
    )
}
