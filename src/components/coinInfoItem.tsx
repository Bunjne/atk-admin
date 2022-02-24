import { Typography } from "@mui/material";
import Stack from '@mui/material/Stack';

interface Props {
    title: string;
    price: number;
    type: string;
    image?: string;
}

export default function CoinInfoItem(props: Props) {
    const image = props.image;
    const price = props.price.toLocaleString(undefined, { maximumFractionDigits: 2 });
    const title = props.title;
    const tokenPrice = price + " " + props.type;
    return (
        <Stack direction="row" justifyContent={"space-between"} alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1}>
                <img src={image} width={14} height={14} />
                <Typography color='#8E8E93' fontSize="0.8rem">{title}</Typography>
            </Stack>
            <Typography textAlign="end" sx={{ fontSize: "1rem", fontWeight: 600, fontFamily:"Bariol Serif" }}>{tokenPrice}</Typography>
        </Stack>
    );
}