import React, { useEffect } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import '../assets/Header.css';
import { Box, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { BaseLine } from "../components/border";
import Themes from "../assets/themes";


export default function Header(props: { page: number, setPage: any }) {
    const allTabs = ['/Mint', '/Marketplace', '/Election'];

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        props.setPage(newValue)
    };

    const navigate = useNavigate();
    useEffect(() => {
        navigate('/marketplace')
    }, []);

    return (
        <Box sx={{ width: 1 }}>
            <Grid container columns={16} sx={{ pl: "2.5rem", pr: "1rem", my: 1 }}>
                <Grid item xs={3}>
                    <Typography fontSize="1.5rem" fontWeight={600} sx={{ mt: 1.2 }}>ATK PORTAL</Typography>
                </Grid>
                <Grid container direction="row-reverse" item xs={13}>
                    <ThemeProvider theme={Themes.AppBarTheme}>
                        <Tabs value={props.page} onChange={handleChange} TabIndicatorProps={{ style: { background: "transparent" } }}>
                            <Tab label={<Typography sx={{ fontFamily: "Bariol" }}>MINT</Typography>} component={Link} to={allTabs[0]} />
                            <Tab label={<Typography>MARKETPLACE</Typography>} component={Link} to={allTabs[1]} />
                            <Tab
                                label={<Typography>ELECTION</Typography>}
                                component={Link}
                                to={allTabs[2]}
                            />
                        </Tabs>
                    </ThemeProvider>
                </Grid>
            </Grid>
            <BaseLine />
        </Box>
    );
}
