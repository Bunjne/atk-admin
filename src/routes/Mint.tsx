import React, { Fragment, useEffect } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Grid from '@mui/material/Grid';
import '../assets/Header.css';
import { Box, Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import acaLogo from '../assets/pics/aca-logo.png'
import lifLogo from '../assets/pics/lif-logo.png'
import CoinInfoItem from "../components/coinInfoItem";
import burn from '../assets/pics/burn.png'
import mint from '../assets/pics/total-mint.png'
import circulating from '../assets/pics/circulating.png'
import Colors from "../assets/colors";
import { BoxBorder } from "../components/border";
import { axiosHelper, APIResponse } from "../components/helpers/axiosHelper";
import { AxiosError } from "axios";


const Mint = () => {
  const tokens = ["ACADEMIC", "LIFESTYLE"];

  axiosHelper.get(`/tokens/${tokens[0]}`)
    .then(function (response) {
      const data: APIResponse = response.data;
      console.log(tokens[0], " data:\n", data.data)
    })
    .catch((err: Error | AxiosError) => {
      console.log(err);
    })

  axiosHelper.get(`/tokens/${tokens[1]}`)
    .then(function (response) {
      const data: APIResponse = response.data;
      console.log(tokens[1], " data:\n", data.data)
    })
    .catch((err: Error | AxiosError) => {
      console.log(err);
    })

  return (
    <Box sx={{ width: 0.96, p: "1.875rem", pt: "1rem" }}>
      <Grid container sx={{ px: "4.125rem" }} columns={12} >
        <Grid item xs={5.9} sx={{ p: 1, mr: 3 }}>
          <BoxBorder>
            <Stack spacing={1} mt={2}>
              <Stack direction="row" justifyContent={"space-between"}>
                <Stack direction="row" spacing={2}>
                  <img src={acaLogo} width={40} height={40} />
                  <Typography sx={{ mt: 1.2, fontSize: "1.5rem", fontWeight: 600 }}> ACADEMIC (ACA)</Typography>
                </Stack>
                <Stack >
                  <Typography textAlign="end" sx={{ fontSize: "1.2rem", fontWeight: 600 }}> 1.5 (ACA)</Typography>
                  <Typography color={Colors.SecondaryColor} fontSize="1rem"> Last updated at 14/07/21 </Typography>
                </Stack>
              </Stack>
              <CoinInfoItem title="CIRCULATING" price={56000} type="ACA" image={circulating} />
              <CoinInfoItem title="BURNT" price={15000} type="ACA" image={burn} />
              <CoinInfoItem title="TOTAL MINT" price={71000} type="ACA" image={mint} />
            </Stack>
          </BoxBorder>
        </Grid>
        <Grid item xs={5.9} sx={{ p: 1 }}>
          <BoxBorder >
            <Stack spacing={1} mt={2}>
              <Stack direction="row" justifyContent={"space-between"}>
                <Stack direction="row" spacing={2}>
                  <img src={lifLogo} width={40} height={40} />
                  <Typography sx={{ mt: 1.2, fontSize: "1.5rem", fontWeight: 600 }}> LIFESTYLE (LIF)</Typography>
                </Stack>
                <Stack >
                  <Typography textAlign="end" sx={{ fontSize: "1.2rem", fontWeight: 600 }}> 1.5 (LIF)</Typography>
                  <Typography color={Colors.SecondaryColor} fontSize="1rem"> Last updated at 14/07/21 </Typography>
                </Stack>
              </Stack>
              <CoinInfoItem title="CIRCULATING" price={56000} type="LIF" image={circulating} />
              <CoinInfoItem title="BURNT" price={15000} type="LIF" image={burn} />
              <CoinInfoItem title="TOTAL MINT" price={71000} type="LIF" image={mint} />
            </Stack>
          </BoxBorder>
        </Grid>
      </Grid>
    </Box >
  );
};

export default Mint;