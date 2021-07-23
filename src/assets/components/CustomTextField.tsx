import React, {ChangeEvent} from 'react';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import {FormControl, TextField} from "@material-ui/core";

export const theme = createTheme({
    overrides: {
        MuiFormControl: {
            root: {
                maxWidth: "100%",
                width: "100%",
            }
        },
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
        MuiOutlinedInput: {
            input: {padding: "10px 14px",
                backgroundColor: "#eff1f3"}
        }
    },
});

type PropsType = {
    label: string
    value?: string | number | Array<string>
    id?: string
    onChange?: (e: ChangeEvent<any>) => void
}

export function CustomTextField({value, label, id, onChange}: PropsType) {
    return (
        <ThemeProvider theme={theme}>
            <FormControl variant={"outlined"}>
                <TextField variant="outlined" label={label} defaultValue={value} id={id} name={id} onChange={onChange}/>
            </FormControl>
        </ThemeProvider>
    )
}
