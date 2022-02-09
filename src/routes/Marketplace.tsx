import React, { Fragment, useEffect, useState, useRef } from "react";
import Grid from '@mui/material/Grid';
import { MenuItem, Typography } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import acaLogo from '../assets/pics/aca-logo.png'
import lifLogo from '../assets/pics/lif-logo.png'
import InsertImage from '../assets/pics/insert-image.png'
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
import { SearchBar, TitleList, TitleListRectangle } from "../components/shares/searchBar";
import { ColorButton } from "../components/colorButton";
import { useForm, Controller } from "react-hook-form";
import { Privilege } from '../models/privilege'
import { AxiosError } from "axios";
import EditMarketplace from './EditMarketplace';
import MessageAlert from '../components/shares/messageAlert';

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
  if (props.coin === "LIF") {
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
  const userAddressQueryRef = useRef<HTMLInputElement>();

  const [fileSelected, setFileSelected] = React.useState<FileInput>(); // also tried <string | Blob>

  const [createdStatus, setCreateStatus] = React.useState<AlertProp>({ isOpened: false, isSuccessful: true });

  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    const status: AlertProp = { isOpened: false, isSuccessful: true };
    setCreateStatus(status);
  };

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    const fileInput: FileInput = {
      fileName: fileList[0].name,
      file: fileList[0]
    }

    setFileSelected(fileInput);
  };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      Name: "",
      Price: 0,
      TokenType: "ACADEMIC",
      Description: "",
      IsExpiryEnable: true,
      LifeTimeInDay: 0,
      IsMaxSupplyEnable: true,
      MaxSupply: 0,
      MaxSupplyType: "SEMESTER",
      IsMaxPerStudentEnable: false,
      AmountPerStudent: 0,
      AmountPerStudentType: "SEMESTER"
    }
  });

  const onSubmit = (data: any) => {
    const privilege: Privilege = {
      name: data.Name,
      price: data.Price,
      tokenType: coin,
      description: data.Description,
      lifeTimeInDay: isExpiryEnable ? data.LifeTimeInDay : null,
      maxSupply: isMaxSupplyEnable ? data.MaxSupply : null,
      maxSupplyType: isMaxSupplyEnable ? maxSupplyType : null,
      amountPerStudent: isMaxPerStudentEnable ? data.AmountPerStudent : null,
      amountPerStudentType: isMaxPerStudentEnable ? amountPerStudentType : null
    }

    console.log(fileSelected)
    if (fileSelected) {
      const formData = new FormData();
      formData.append('image', fileSelected!.file, fileSelected!.fileName);
      formData.append('data', JSON.stringify(privilege));

      axiosHelper.post(`/privileges`, formData)
        .then(function (response) {
          const status: AlertProp = { isOpened: true, isSuccessful: true, message: "The privilege is sucessfully created." };
          setCreateStatus(status);
          const data: APIResponse = response.data;
          console.log(data.data)
        })
        .catch((err: Error | AxiosError) => {
          const status: AlertProp = { isOpened: true, isSuccessful: false, message: err.message };
          setCreateStatus(status);
          console.log(err.message);
        })
    }
  }

  const coins = [
    { value: "ACADEMIC", label: "ACA" },
    { value: "LIFESTYLE", label: "LIF" }
  ]

  const periods = [
    { value: "YEAR", label: "Per Year" },
    { value: "SEMESTER", label: "Per Semester" }
  ]

  const searchTypes = [
    { value: "ALL", label: "ALL" },
    { value: "ACADEMIC", label: "ACADEMIC" },
    { value: "LIFESTYLE", label: "LIFESTYLE" }
  ]

  const [coin, setCoin] = React.useState('ACADEMIC');
  const handleCoinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoin(event.target.value);
  };

  const [maxSupplyType, setMaxSupplyType] = React.useState('SEMESTER');
  const handleMaxSupplyTypeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxSupplyType(event.target.value);
  };

  const [amountPerStudentType, setAmountPerStudentType] = React.useState('SEMESTER');
  const handleAmountPerStudentTypeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountPerStudentType(event.target.value);
  };

  const [selectedType, setSearchType] = React.useState('ALL');
  const handleSearchTypeChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchType(event.target.value);
  };

  const [isExpiryEnable, setExpiryEnable] = React.useState(true);
  const handleExpiryEnable = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryEnable(event.target.checked);
  };

  const [isMaxSupplyEnable, setMaxSupplyEnable] = React.useState(true);
  const handleMaxSupplyEnable = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxSupplyEnable(event.target.checked);
  };

  const [isMaxPerStudentEnable, setMaxPerStudentEnable] = React.useState(false);
  const handleMaxPerStudentEnable = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPerStudentEnable(event.target.checked);
  };

  function onSearchClicked() {

  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container direction="column" spacing={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BoxBorder container sx={{ width: 0.96 }} rowSpacing={2}>
          {/* First row */}
          <Grid item container columnSpacing={4}>
            <Grid
              item
              component="form"
              sx={{ '& > :not(style)': { width: '40rem' } }}
              noValidate
              autoComplete="off">
              <TestWithStar title="Name" />
              <Controller
                name="Name"
                rules={{ required: true }}
                control={control}
                render={({ field }) =>
                  <TextFieldCustom
                    {...field}
                    id="name-input"
                    size="small"
                    variant="outlined"
                  />}
              />
            </Grid>
            <Grid item sm container spacing={2}>
              <Grid item>
                <TestWithStar title="Price" />
                <Controller
                  name="Price"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) =>
                    <TextFieldCustom
                      {...field}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      id="price-input"
                      size="small"
                      value={field.value.toString().replace(/^0+/, '')}
                      variant="outlined"
                      inputProps={{ style: { textAlign: 'right', width: '9.5rem' } }}
                    />}
                />
              </Grid>
              <Grid item xs alignSelf={"self-end"}>
                <Controller
                  name="TokenType"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) =>
                    <TextFieldCustom
                      {...field}
                      sx={{ '& > :not(style)': { height: '2.5rem', fontSize: "1rem" } }}
                      id="outlined-select-currency"
                      select
                      value={coin}
                      onChange={handleCoinChange}
                      InputProps={{
                        startAdornment: (
                          <Logo coin={coin} />
                        ),
                      }}
                    >
                      {coins.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextFieldCustom>}
                />
              </Grid>
              <Grid item>
                <ColorButton sx={{ fontWeight: 600 }} variant="contained" type="submit">CREATE</ColorButton>
              </Grid>
            </Grid>
          </Grid>
          {/* Second row */}
          <Grid item container spacing={4}>
            <Grid
              item
              component="form"
              sx={{ '& > :not(style)': { width: '40rem' } }}
              noValidate
              autoComplete="off">
              <TestWithStar title="Description" />
              <Controller
                name="Description"
                control={control}
                rules={{ required: true }}
                render={({ field }) =>
                  <TextFieldCustom
                    {...field}
                    multiline
                    id="name-input"
                    size="small"
                    variant="outlined"
                    inputProps={{ style: { height: '6.8rem', textAlign: "justify" } }}
                  />}
              />

            </Grid>
            <Grid item sm container direction="column" spacing={2} >
              <Grid item>
                <TestWithStar title="Expiry" />
                <Grid item container>
                  <Controller
                    name="IsExpiryEnable"
                    control={control}
                    render={({ field }) =>
                      <Checkbox
                        {...field}
                        onChange={handleExpiryEnable}
                        defaultChecked={isExpiryEnable}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} style={{ marginLeft: '-12px', marginTop: '-5px' }} />
                    }
                  />
                  <Controller
                    name="LifeTimeInDay"
                    control={control}
                    rules={{ min: isExpiryEnable ? 1 : 0 }}
                    render={({ field }) =>
                      <TextFieldCustom
                        {...field}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        placeholder="0"
                        value={isExpiryEnable ? field.value.toString().replace(/^0+/, '') : "Never"}
                        disabled={isExpiryEnable ? false : true}
                        id="price-input"
                        defaultValue="0"
                        size="small"
                        variant="outlined"
                        sx={{ ml: 2 }}
                        inputProps={{ style: { textAlign: 'right', width: '9.5rem' } }}
                      />
                    }
                  />
                  <Typography color="secondary" sx={{ ml: 2, alignSelf: "center" }}>Days</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <TestWithStar title="Max Supply" />
                <Grid item spacing={2}>
                  <Controller
                    name="IsMaxSupplyEnable"
                    control={control}
                    render={({ field }) =>
                      <Checkbox
                        {...field}
                        onChange={handleMaxSupplyEnable}
                        defaultChecked={isMaxSupplyEnable}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                        style={{ marginLeft: '-12px', marginTop: '-5px' }}
                      />
                    }
                  />
                  <Controller
                    name="MaxSupply"
                    control={control}
                    rules={{ min: isMaxSupplyEnable ? 1 : 0 }}
                    render={({ field }) =>
                      <TextFieldCustom
                        {...field}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        disabled={isMaxSupplyEnable ? false : true}
                        placeholder="0"
                        value={isMaxSupplyEnable ? field.value.toString().replace(/^0+/, '') : "Unlimited"}
                        id="price-input"
                        defaultValue="0"
                        size="small"
                        variant="outlined"
                        sx={{ ml: 2 }}
                        inputProps={{ style: { textAlign: 'right', width: '9.5rem' } }}
                      />
                    }
                  />
                  <Controller
                    name="MaxSupplyType"
                    control={control}
                    render={() =>
                      <TextFieldCustom
                        sx={{ '& > :not(style)': { height: '2.5rem', fontSize: "1rem", ml: 2 } }}
                        select
                        disabled={isMaxSupplyEnable ? false : true}
                        value={maxSupplyType}
                        onChange={handleMaxSupplyTypeChanged}
                      >
                        {periods.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextFieldCustom>
                    }
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Third row */}
          <Grid item container spacing={4}>
            <Grid item sx={{ '& > :not(style)': { width: '40rem' } }}>
              <TestWithStar title="Image" />
              <Grid item container>
                <label htmlFor="contained-button-file">
                  <Input accept="image/*" id="contained-button-file" onChange={handleImageChange} type="file" />
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<img src={InsertImage} width={20} height={20} />}
                    sx={{ width: '10rem', height: '2.5rem', fontWeight: 600 }}
                  >
                    Insert Image
                  </Button>
                </label>
                {
                  fileSelected &&
                  <Typography color="secondary" ml={2} sx={{ alignSelf: "center" }}>{fileSelected?.fileName} {<img src={CheckCircle} width={12} height={12} />}</Typography>
                }
              </Grid>
            </Grid>
            <Grid item>
              <TestWithStar title="Max Per Student" />
              <Grid item spacing={2}>
                <Controller
                  name="IsMaxPerStudentEnable"
                  control={control}
                  render={({ field }) =>
                    <Checkbox
                      {...field}
                      onChange={handleMaxPerStudentEnable}
                      defaultChecked={isMaxPerStudentEnable}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                      style={{ marginLeft: '-12px', marginTop: '-5px' }} />
                  }
                />
                <Controller
                  name="AmountPerStudent"
                  control={control}
                  rules={{ min: isMaxPerStudentEnable ? 1 : 0 }}
                  render={({ field }) =>
                    <TextFieldCustom
                      {...field}
                      disabled={isMaxPerStudentEnable ? false : true}
                      isBackgroundEnable={true}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      placeholder="0"
                      value={isMaxPerStudentEnable ? field.value.toString().replace(/^0+/, '') : "Unlimited"}
                      size="small"
                      variant="outlined"
                      sx={{
                        ml: 2
                      }}
                      inputProps={{ style: { textAlign: 'right', width: '9.5rem' } }}
                    />
                  }
                />
                {isMaxPerStudentEnable &&
                  <Controller
                    name="AmountPerStudentType"
                    control={control}
                    render={({ field }) =>
                      <TextFieldCustom
                        sx={{ '& > :not(style)': { height: '2.5rem', fontSize: "1rem", ml: 2 } }}
                        select
                        disabled={isMaxPerStudentEnable ? false : true}
                        value={amountPerStudentType}
                        onChange={handleAmountPerStudentTypeChanged}
                      >
                        {periods.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextFieldCustom>
                    }
                  />
                }
              </Grid>
            </Grid>
          </Grid>
        </BoxBorder>
      </form>
      {/* Search Part */}
      <BoxBorder container sx={{ width: 0.96, mt: "1.25rem" }} spacing={2}>
        <Grid item container direction="row" columnSpacing={2}>
          {<TitleListRectangle />}
          <TitleList sx={{
            fontWeight: 'bold',
            fontSize: '1.15rem',
            textAlign: 'center',
            py: '1rem',
            ml: '0.8rem'
          }}
          >
            Marketplace
          </TitleList>
          <Grid item sm container direction="row" alignSelf={'center'}>
            <SearchBar options={searchTypes} selectedOption={selectedType} onOptionChanged={handleSearchTypeChanged} userAddressQueryRef={userAddressQueryRef} onSearchClicked={onSearchClicked} />
          </Grid>

        </Grid>
        <Button onClick={handleOpen}>Open Child Modal</Button>
        <EditMarketplace isOpened={open} handleClose={handleClose} privilegeId="863ef455-3bfb-41c0-a1d5-d76fe68c45d3" setAlertStatus={setCreateStatus} />
      </BoxBorder>
      <MessageAlert messageAlert={createdStatus} handleAlertClose={handleAlertClose} />
    </Grid >
  )
};