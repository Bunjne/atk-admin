import React, { Fragment, useEffect } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { Box, Paper, Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import acaLogo from '../assets/pics/aca-logo.svg'
import lifLogo from '../assets/pics/lif-logo.svg'
import CoinInfoItem from "../components/coinInfoItem";
import burn from '../assets/pics/burn.png'
import mint from '../assets/pics/total-mint.png'
import circulating from '../assets/pics/circulating.png'
import Colors from "../assets/colors";
import { BoxBorder } from "../components/border";
import { axiosHelper, APIResponse } from "../components/helpers/axiosHelper";
import { AxiosError } from "axios";
import { Token } from '../models/token';
import { SearchBar, TitleList, TitleListRectangle } from "../components/shares/searchBar";
import Button from '@mui/material/Button';
import SemesterMint from '../assets/pics/mint-semester.svg';
import VoteMint from '../assets/pics/mint-vote.svg';
import LecturerMint from '../assets/pics/mint-lecturer.svg';
import ActivityMint from '../assets/pics/mint-activity.svg';
import { ColorButton, ColorLodingButton } from "../components/colorButton";
import { ItemBaseLine } from "../components/border";
import moment from "moment";
import ClipLoader from "react-spinners/ClipLoader";
import { GetMintType, MintType } from '../enums/mintType'
import { InitialMintDTO, StudentMintDTO, GradeMintDTO } from '../models/mintDTO';

interface MintItemProp {
  mintKey: number;
  icon: string;
  mintTokens: any
  title: string;
  description: string;
  mintState: MintState;
}

interface MintState {
  isMinting?: boolean;
  mintKey?: number;
}

const MintItem = ({ mintKey, icon, mintTokens, title, description, mintState }: MintItemProp) => (
  <Grid item container columnSpacing={2}>
    <Grid item>
      <Paper sx={{ backgroundColor: Colors.PrimaryColor, px: '0.9rem', pt: '1.2rem', pb: '0.6rem', borderRadius: 2 }}><img src={icon} width={50} height={40} style={{ backgroundColor: 'transparent' }} /></Paper>
    </Grid>
    <Grid item xs sm container flexDirection={"column"} justifyContent={"center"}>
      <Typography sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography color="secondary">
        {description}
      </Typography>
    </Grid>
    <Grid item xs={4} container alignContent={"center"} justifyContent={"end"}>
      <ColorLodingButton
        sx={{ fontWeight: 600 }}
        variant="contained"
        onClick={() => {
          mintTokens(mintKey);
        }}
        loadingPosition="end"
        loading={mintState.mintKey === mintKey ? mintState.isMinting : false}
        disabled={mintState.mintKey === mintKey ? false : mintState.isMinting}>MINT</ColorLodingButton>
    </Grid>
  </Grid>
);

const Mint = () => {
  const MINUTE_MS = 60 * 1000;
  const tokens = ["ACADEMIC", "LIFESTYLE"];
  const [ACAToken, setACAToken] = React.useState<Token>();
  const [LIFToken, setLIFToken] = React.useState<Token>();
  const [ACAIsLoading, setACALoading] = React.useState(false);
  const [LIFIsLoading, setLIFLoading] = React.useState(false);
  const [isMinting, setMinting] = React.useState<MintState>({ isMinting: false, mintKey: 0 });

  const override = `
    display: block;
    margin: 0 auto;
  `;

  function mintTokens(key: number) {
    setMinting({ isMinting: true, mintKey: key });
    const mintType = GetMintType(key)
    let url = '';
    if (mintType === MintType.VOTE) {
      url = `/mints/${mintType}`;
    } else if (mintType === MintType.LECTURER) {
      url = `/mints/${mintType}?semesterYear=2/2022`;
    } else if (mintType === MintType.SEMESTERLY) {
      url = `/mints/${mintType}?gradeSemesterYear=1/2022&tuitionSemesterYear=2/2022`
    } else if (mintType === MintType.ORGANIZATION) {
      url = `/mints/${mintType}`
    }

    axiosHelper.post(url)
      .then(function (response) {
        const apiResponse: APIResponse = response.data;
        console.log(apiResponse.data);
        setMinting({ isMinting: false, mintKey: key });
      })
      .catch((err: Error | AxiosError) => {
        alert(err.message);
        setMinting({ isMinting: false, mintKey: key });
        console.log(err);
      })
  }

  function getTokens() {
    setACALoading(true);
    setLIFLoading(true);

    axiosHelper.get(`/tokens/${tokens[0]}`)
      .then(function (response) {
        const apiResponse: APIResponse = response.data;
        const token: Token = apiResponse.data;
        token.priceUpdatedAt = moment(token.priceUpdatedAt).format("DD/MM/YY");

        setACALoading(false);
        setACAToken(token);
        console.log(tokens[0], " data:\n", apiResponse.data)
      })
      .catch((err: Error | AxiosError) => {
        console.log(err);
      })

    axiosHelper.get(`/tokens/${tokens[1]}`)
      .then(function (response) {
        const apiResponse: APIResponse = response.data;
        const token: Token = apiResponse.data;
        token.priceUpdatedAt = moment(token.priceUpdatedAt).format("DD/MM/YY");

        setLIFLoading(false);
        setLIFToken(token);
        console.log(tokens[1], " data:\n", apiResponse.data)
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

  useEffect(() => {
    getTokens()
  }, [isMinting])

  return (
    <Box sx={{ width: 1, p: "1.875rem", pt: "1.5rem" }}>
      {ACAIsLoading || LIFIsLoading ?
        <ClipLoader color={Colors.PrimaryColor} loading={ACAIsLoading || LIFIsLoading}
          css={override} size={50} />
        : <>
          {ACAToken && LIFToken &&
            <Grid container>
              <Grid item xs sx={{ mr: 3 }} columns={12}>
                <BoxBorder sx={{ mt: 0, ml: 0 }}>
                  <Stack spacing={1} mt={2}>
                    <Stack direction="row" justifyContent={"center"} alignItems={"end"} mb={'1.2rem'}>
                      {/* <Stack direction="row" spacing={2}> */}
                      <img src={acaLogo} width={32} height={32} />
                      <Typography sx={{ ml: '0.5rem', fontSize: "1.25rem", fontWeight: 600 }}> {ACAToken!.name.toUpperCase()} ({ACAToken!.symbol})</Typography>
                      {/* </Stack> */}
                      {/* <Stack textAlign='end'>
                        <Typography sx={{ fontSize: "1.2rem", fontWeight: 600, fontFamily: "Bariol Serif" }}> {ACAToken!.price} {LIFToken!.symbol}</Typography>
                        <Typography color={Colors.SecondaryColor} fontSize="1rem"> Last Updated Price At {ACAToken.priceUpdatedAt} </Typography>
                      </Stack> */}
                    </Stack>
                    <CoinInfoItem title="CIRCULATING" price={ACAToken!.cirCulationSupply} type="ACA" image={circulating} />
                    <ItemBaseLine sx={{ my: '1rem' }} />
                    <CoinInfoItem title="BURNT" price={ACAToken!.totalSupply - ACAToken!.cirCulationSupply} type="ACA" image={burn} />
                    <ItemBaseLine sx={{ my: '1rem' }} />
                    <CoinInfoItem title="TOTAL MINT" price={ACAToken!.totalSupply} type="ACA" image={mint} />
                    <ItemBaseLine sx={{ my: '1rem' }} />
                    <CoinInfoItem title="AVERAGE PER STUDENT WALLET" price={ACAToken!.averagePerWallet ?? 0} type="ACA" image={mint} />
                  </Stack>
                </BoxBorder>
              </Grid>
              <Grid item xs >
                <BoxBorder sx={{ mt: 0, ml: 0 }}>
                  <Stack spacing={1} mt={2}>
                    <Stack direction="row" justifyContent={"center"} alignItems={"end"} mb={'1.2rem'}>
                      {/* <Stack direction="row" spacing={2}> */}
                      <img src={lifLogo} width={32} height={32} />
                      <Typography sx={{ ml: '0.5rem', fontSize: "1.25rem", fontWeight: 600 }}> {LIFToken!.name.toUpperCase()} ({LIFToken!.symbol})</Typography>
                      {/* </Stack> */}
                      {/* <Stack textAlign='end'>
                        <Typography sx={{ fontSize: "1.2rem", fontWeight: 600, fontFamily: "Bariol Serif" }}>{LIFToken!.price} {ACAToken!.symbol}</Typography>
                        <Typography color={Colors.SecondaryColor} fontSize="1rem"> Last Updated Price At {LIFToken.priceUpdatedAt} </Typography>
                      </Stack> */}
                    </Stack>
                    <CoinInfoItem title="CIRCULATING" price={LIFToken!.cirCulationSupply} type="LIF" image={circulating} />
                    <ItemBaseLine sx={{ my: '1rem' }} />
                    <CoinInfoItem title="BURNT" price={LIFToken!.totalSupply - LIFToken!.cirCulationSupply} type="LIF" image={burn} />
                    <ItemBaseLine sx={{ my: '1rem' }} />
                    <CoinInfoItem title="TOTAL MINT" price={LIFToken!.totalSupply} type="LIF" image={mint} />
                    <ItemBaseLine sx={{ my: '1rem' }} />
                    <CoinInfoItem title="AVERAGE PER STUDENT WALLET" price={LIFToken!.averagePerWallet ?? 0} type="LIF" image={mint} />
                  </Stack>
                </BoxBorder>
              </Grid>
            </Grid>
          }
        </>
      }
      <BoxBorder container sx={{ width: 1, mt: "1.5rem", mx: 0, px: "1.5rem", pb: "2.5rem" }} rowSpacing={2}>
        <Grid item container flexDirection="row" ml={1}>
          <TitleListRectangle />
          <TitleList sx={{
            fontWeight: 'bold',
            fontSize: '1.15rem',
            textAlign: 'center',
            py: '1rem',
            ml: '0.8rem'
          }}
          >
            MINT
          </TitleList>
        </Grid>
        <MintItem
          mintKey={1}
          icon={SemesterMint}
          title="Semesterly Token Offering"
          description="The initial fund every student would receive after they paid the tuition fee and
          university fee. This funding must be done only once per semester."
          mintTokens={mintTokens}
          mintState={isMinting} />
        <Grid xs item>
          <ItemBaseLine />
        </Grid>
        <MintItem
          mintKey={2}
          icon={VoteMint}
          title="Vote Token Offering"
          description="The LIF tokens would be distributed to all students so they can use to cast a 
          vote for the elections."
          mintTokens={mintTokens}
          mintState={isMinting} />
        <Grid xs item>
          <ItemBaseLine />
        </Grid>
        <MintItem
          mintKey={3}
          icon={LecturerMint}
          title="Lecturer Token Offering"
          description="The ACA tokens would be distributed to the lecturers for incentivizing students
          the tokens."
          mintTokens={mintTokens}
          mintState={isMinting} />
        <Grid xs item>
          <ItemBaseLine />
        </Grid>
      </BoxBorder>
    </Box >
  );
};

export default Mint;