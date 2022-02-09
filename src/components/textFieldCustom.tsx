import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { style } from '@mui/system';
import Colors from "../assets/colors";

interface TextFieldProp {
    isBackgroundEnable?: boolean;
    baseColor?: string;
}

export const TextFieldCustom = styled(TextField)(({ isBackgroundEnable = false, baseColor = Colors.SecondaryColor }: TextFieldProp) => ({
    '& label.Mui-focused': {
        color: Colors.BorderLine,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: Colors.BorderLine,
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: Colors.BorderLine,
        },
        '&:hover fieldset': {
            borderColor: Colors.BorderLine,
        },
        '&.Mui-focused fieldset': {
            borderColor: Colors.BorderLine,
        },
    },
    '& .MuiInputBase-input': {
        backgroundColor: isBackgroundEnable ? "#F7F7FF" : "transparent"
    },
    '& .MuiInputBase-root': {
        color: baseColor
    },
}))