import React from 'react';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import {FormControl, TextField} from "@material-ui/core";

const theme = createTheme({
    overrides: {
        MuiFormControl: {
            root: {
                maxWidth: "100%",
                width: "100%",
            }
        },
        MuiOutlinedInput: {
            input: {padding: "10px 14px"}
        }
    },
});

type PropsType = {
    label: string
    value?: string
}

export function CustomTextField({value, label}: PropsType) {
    return (
        <ThemeProvider theme={theme}>
            <FormControl variant={"outlined"}>
                <TextField variant="outlined" label={value || label}/>
            </FormControl>
        </ThemeProvider>
    )
}
