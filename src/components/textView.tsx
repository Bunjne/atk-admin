import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

type TextViewProps = {
    text: string,
    textSize: string,
    font?: string,
    isEllipsis?: boolean,
    sx?: SxProps<Theme>
}

export default function TextView({ text, textSize, font = 'regular', isEllipsis = false, sx = [] }: TextViewProps) {
    let selectedFont = 'regular';
    if (font !== undefined && font !== null) {
        if (font === 'light') {
            selectedFont = '100'
        } else {
            selectedFont = font
        }
    }

    return (
        <Typography sx={[
            {
                fontFamily: 'Bariol',
                fontWeight: selectedFont,
                fontSize: textSize,
                whiteSpace: isEllipsis ? 'nowrap' : 'normal',
                textOverflow: isEllipsis ? 'ellipsis' : 'clip',
                overflow: isEllipsis ? 'hidden' : 'visible'
            },
            ...(Array.isArray(sx) ? sx : [sx]),
        ]}>
            {text}
        </Typography>
    )
}