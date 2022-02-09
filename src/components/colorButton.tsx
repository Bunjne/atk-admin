import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

interface ButtonProp {
    textColor?: string;
    bgColor?: string;
}

export const ColorButton = styled(Button)(({ textColor, bgColor }: ButtonProp) => ({
    color: textColor,
    backgroundColor: bgColor,
    '&:hover': {
        backgroundColor: bgColor,
    },
    height: '2.5rem',
    width: '7rem',
    component: "span"
}));