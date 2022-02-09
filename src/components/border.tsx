import { styled } from "@mui/material";
import Colors from "../assets/colors";
import Grid from '@mui/material/Grid';

const lineWidth = 0.8;

export const BaseLine = styled("div")({
    border: lineWidth,
    borderColor: Colors.BorderLine,
    borderStyle: "solid"
})

export const BoxBorder = styled(Grid)({
    border: lineWidth,
    borderColor: Colors.BorderLine,
    borderStyle: "solid",
    borderRadius: 10,
    padding: "1.25rem",
    paddingTop: "0rem",
    paddingBottom: "1rem",
    marginLeft: "2.5rem",
    marginTop: "2.25rem"
})