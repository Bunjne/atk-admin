import { Grid, InputAdornment, MenuItem, Typography } from "@mui/material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import { ChildrenProps } from './searchBarType';
import { TextFieldCustom } from "../textFieldCustom";
import { ColorButton } from "../colorButton";

interface SearchBarProp {
    options?: { value: string; label: string; }[];
    selectedOption?: string;
    onOptionChanged?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    userAddressQueryRef: React.Ref<any>;
    onSearchClicked: any
}

export function SearchBar({ options, selectedOption, onOptionChanged, userAddressQueryRef, onSearchClicked }: SearchBarProp) {
    return (<>
        <Grid item xs container direction="row">
            <TextFieldCustom
                id="input-with-icon-textfield"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                type="search"
                variant="outlined"
                hiddenLabel
                size="medium"
                inputRef={userAddressQueryRef}
                inputProps={{
                    style: {
                        paddingLeft: "1rem", height: '0.45rem'
                    },
                }}
                sx={{ ml: '5rem', mr: "1rem", width: "53rem" }}
            />
            <TextFieldCustom
                sx={{ '& > :not(style)': { width: '15rem', height: '2.5rem', fontSize: "1rem" } }}
                select
                value={selectedOption}
                onChange={onOptionChanged}
            >
                {options && options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextFieldCustom>
        </Grid>
        <Grid item>
            <ColorButton variant="contained" onClick={onSearchClicked}
                sx={{ flex: 1, pl: "1.5rem", pr: "1.5rem", fontWeight: 600 }}>
                SEARCH
            </ColorButton>
        </Grid>
    </>
    )
}

export function TitleList(props: ChildrenProps) {
    return (
        <Typography
            component="span"
            sx={props.sx}
        >
            {props.children}
        </Typography>
    )
}

export const TitleListRectangle = () => (

    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={8}
        viewBox="0 0 8 40"
    >
        <rect
            id="Rectangle_85"
            data-name="Rectangle 85"
            width={8}
            height={40}
            rx={2}
            fill="#280aa5"
        />
    </svg>
);
