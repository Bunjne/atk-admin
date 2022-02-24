import React, { Fragment, useEffect, useState, useRef } from "react";
import Grid from '@mui/material/Grid';
import { MenuItem, Typography } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import acaLogo from '../assets/pics/aca-logo.svg'
import lifLogo from '../assets/pics/lif-logo.svg'
import AddIcon from '../assets/pics/add.svg'
import CheckCircle from '../assets/pics/check-circle.png'
import Colors from "../assets/colors";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { typography } from "@mui/system";
import { BoxBorder } from "../components/border";
import InputAdornment from '@mui/material/InputAdornment';
import Themes from "../assets/themes";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { TextFieldCustom } from "../components/textFieldCustom";
import { axiosHelper, APIResponse } from "../components/helpers/axiosHelper";
import { SearchBar, TitleList, LargeTitleListRectangle } from "../components/shares/searchBar";
import { ColorButton, ColorLodingButton } from "../components/colorButton";
import { useForm, Controller } from "react-hook-form";
import { Privilege } from '../models/privilege'
import { AxiosError } from "axios";
import EditMarketplace from './EditMarketplace';
import MessageAlert from '../components/shares/messageAlert';
import PrivilegesLists from '../components/privilegesPagination';
import { SelectAllRounded } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import CreateMarketplace from './CreateMarketPlace';
import CreateMarketPlace from "./CreateMarketPlace";


interface FileInput {
  fileName: string;
  file: File | Blob
}

export interface AlertProp {
  isOpened: boolean;
  isSuccessful: boolean;
  message?: string;
}

const TestWithStar = (props: { title: string }) => {
  return (
    <div><InputLabel style={{ color: Colors.Black, fontSize: "1.125rem", fontWeight: 600 }} shrink htmlFor="bootstrap-input">
      <Stack direction={"row"}>
        {props.title}
        <Typography style={{ color: "red", fontSize: "1.125rem", fontWeight: 600 }}>*</Typography>
      </Stack>
    </InputLabel></div>)
}

const Input = styled('input')({
  display: 'none',
});

const Logo = (props: { coin: string }) => {
  let currentLogo = acaLogo;
  if (props.coin === "LIFESTYLE") {
    currentLogo = lifLogo;
  } else {
    currentLogo = acaLogo;
  }
  return (
    <div>
      <InputAdornment position="start">
        <img src={currentLogo} width={26} height={26} />
      </InputAdornment>
    </div>)
}

export default function Marketplace() {
  const [createdStatus, setCreateStatus] = React.useState<AlertProp>({ isOpened: false, isSuccessful: true });

  const [openDeletedModal, setDeleteModalOpen] = React.useState(false);
  const handleDeleteModalOpen = (_e: any) => {
    setDeleteModalOpen(true);
  };
  const handleClose = () => {
    const status: AlertProp = { isOpened: false, isSuccessful: true };
    setCreateStatus(status);
    setDeleteModalOpen(false);
  };

  return (
    <Grid container direction="column" spacing={1} pr={1}>
      <Grid item container alignItems={"center"}>
        <Grid item xs container marginLeft={'2.5rem'}>
          {<LargeTitleListRectangle />}
          <TitleList sx={{
            fontWeight: 'bold',
            fontSize: '1.75rem',
            textAlign: 'center',
            py: '1rem',
            ml: '0.8rem'
          }}
          >
            MARKETPLACE
          </TitleList>
        </Grid>
        <Grid item mr={'1.5rem'}>
          <ColorButton
            onClick={handleDeleteModalOpen}
            startIcon={<img src={AddIcon} width={20} height={20} />}
            sx={{ width: '11rem', fontWeight: 600 }}
          >
            CREATE PRIVILEGE
          </ColorButton>
        </Grid>
      </Grid>
      <BoxBorder container sx={{ width: 0.96, mt: "0.5rem" }} rowSpacing={2}>
        <PrivilegesLists createdStatus={createdStatus} setCreateStatus={setCreateStatus} />
      </BoxBorder>
      <CreateMarketPlace isOpened={openDeletedModal} handleClose={handleClose} setAlertStatus={setCreateStatus} />
    </Grid >
  )
};