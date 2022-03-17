import React, { MouseEventHandler, useEffect } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { Box, Button, Container, Icon, IconButton, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate, useLocation } from "react-router-dom";
import { BaseLine } from "../components/border";
import Themes from "../assets/themes";
import { Token } from "../models/token";
import { APIResponse, axiosHelper } from "../components/helpers/axiosHelper";
import moment from "moment";
import { AxiosError } from "axios";
import Colors from "../assets/colors";
import acaLogo from '../assets/pics/aca-logo.svg'
import lifLogo from '../assets/pics/lif-logo.svg'
import SwapLogo from '../assets/pics/swap.svg'
import { ColorButton } from "../components/colorButton";
import { TokenType, GetTokenTypeSymbol } from "../enums/tokenType";

export default function Header(props: { page: number, setPage: any }) {
    const MINUTE_MS = 60 * 1000;
    const allTabs = ['/Mint', '/Marketplace'];
    const location = useLocation();
    const [ACAToken, setACAToken] = React.useState<Token>();
    const [LIFToken, setLIFToken] = React.useState<Token>();
    const [selectedTokenRate, setSelectedTokenRate] = React.useState<string>(TokenType.ACADEMIC);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        props.setPage(newValue);
    };

    const changeSelectedTokenRate = (_: React.SyntheticEvent) => {
        if (selectedTokenRate === TokenType.ACADEMIC) {
            setSelectedTokenRate(TokenType.LIFESTYLE);
        } else {
            setSelectedTokenRate(TokenType.ACADEMIC);
        }
    }

    useEffect(() => {
        props.setPage(allTabs.indexOf(location.pathname));
    }, []);

    function getTokens() {
        axiosHelper.get(`/tokens/${TokenType.ACADEMIC}`)
            .then(function (response) {
                const apiResponse: APIResponse = response.data;
                const token: Token = apiResponse.data;
                token.priceUpdatedAt = moment(token.priceUpdatedAt).format("DD/MM/YY");

                setACAToken(token);
                console.log(TokenType.ACADEMIC, " data:\n", apiResponse.data)
            })
            .catch((err: Error | AxiosError) => {
                console.log(err);
            })

        axiosHelper.get(`/tokens/${TokenType.LIFESTYLE}`)
            .then(function (response) {
                const apiResponse: APIResponse = response.data;
                const token: Token = apiResponse.data;
                token.priceUpdatedAt = moment(token.priceUpdatedAt).format("DD/MM/YY");

                setLIFToken(token);
                console.log(TokenType.LIFESTYLE, " data:\n", apiResponse.data)
            })
            .catch((err: Error | AxiosError) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getTokens()
        const interval = setInterval(() => {
            getTokens()
        }, MINUTE_MS);

        return () => clearInterval(interval);
    }, [])

    const navigate = useNavigate();

    function toHomePage(pageNumber: number) {
        if (props.page === 0) {
            window.location.reload();
        } else {
            props.setPage(pageNumber);
            navigate(allTabs[pageNumber], { replace: true });
        }
    }

    return (
        <Grid sx={{ width: 1 }}>
            <Grid container flexDirection={"row"} sx={{ pl: "3rem", pr: "1rem", py: '0.5rem', my: 1 }} alignItems={"center"}>
                <Grid item xs={5} container wrap="wrap" flexWrap={"wrap"} flexDirection={"row"}>
                    <Button
                        onClick={() => {
                            toHomePage(0)
                        }}
                        sx={{
                            '&:hover': {
                                backgroundColor: "transparent",
                            },
                            p: 0,
                            color: Colors.Black
                        }}
                    >
                        <Typography fontSize="1.5rem" fontWeight={600} sx={{ mr: '1rem' }}>ATK PORTAL</Typography>
                    </Button>
                    <ThemeProvider theme={Themes.AppBarTheme}>
                        <Tabs value={props.page} onChange={handleChange} TabIndicatorProps={{ style: { background: "transparent" } }}>
                            <Tab label={<Typography fontWeight={600}>MINT</Typography>} component={Link} to={allTabs[0]} />
                            <Tab label={<Typography fontWeight={600}>MARKETPLACE</Typography>} component={Link} to={allTabs[1]} />
                            {/* <Tab
                                label={<Typography>ELECTION</Typography>}
                                component={Link}
                                to={allTabs[2]}
                            /> */}
                        </Tabs>
                    </ThemeProvider>
                </Grid>
                {ACAToken && LIFToken &&
                    <Grid item xs container flexDirection={"row"} alignItems={"center"} justifyContent={"end"} mr={'1rem'}>
                        <Grid item xs container justifyContent={"end"}>
                            {selectedTokenRate === TokenType.ACADEMIC ?
                                <>
                                    <img src={acaLogo} width={32} height={32} />
                                    <img src={lifLogo} width={32} height={32} />
                                </>
                                :
                                <>
                                    <img src={lifLogo} width={32} height={32} />
                                    <img src={acaLogo} width={32} height={32} />
                                </>
                            }
                        </Grid>
                        <Grid item flexDirection={"column"} ml="0.7rem">
                            <Typography color={"secondary"} sx={{ p: 0, fontSize: "0.8rem" }}>Token Ratio</Typography>
                            <Grid item container mt={-1}>
                                <Typography sx={{ p: 0, fontWeight: 600 }}>1 {GetTokenTypeSymbol(selectedTokenRate)} {':'}</Typography>
                                {selectedTokenRate === TokenType.ACADEMIC ?
                                    <Typography sx={{ p: 0, fontWeight: 600, ml: '0.5rem' }}>
                                        {ACAToken!.price} {LIFToken!.symbol}
                                    </Typography>
                                    :
                                    <Typography sx={{ p: 0, fontWeight: 600, ml: '0.5rem' }}>
                                        {LIFToken!.price} {ACAToken!.symbol}
                                    </Typography>
                                }
                                <IconButton sx={{ p: 0, ml: '0.3rem' }} onClick={changeSelectedTokenRate}>
                                    <img src={SwapLogo} width={16} height={16} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                }
            </Grid>
            <BaseLine />
        </Grid>
    );
}
