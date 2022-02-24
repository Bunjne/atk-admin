import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Colors from '../assets/colors';


interface ButtonProp {
    textColor?: string;
    bgColor?: string;
}

export const ColorButton = styled(Button)(({ textColor, bgColor }: ButtonProp) => ({
    color: textColor ?? Colors.White,
    backgroundColor: bgColor ?? Colors.PrimaryColor,
    '&:hover': {
        backgroundColor: bgColor ?? Colors.PrimaryColor,
    },
    height: '2.5rem',
    width: '7rem',
    component: "span"
}));

export const ColorLodingButton = styled(LoadingButton)(({ textColor, bgColor }: ButtonProp) => ({
    color: textColor,
    backgroundColor: bgColor,
    '&:hover': {
        backgroundColor: bgColor,
    },
    height: '2.5rem',
    width: '7rem',
    component: "span"
}));