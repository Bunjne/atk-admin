import React, { Fragment, useEffect, useState, useRef } from "react";
import Grid from '@mui/material/Grid';
import { Box, colors, Divider, MenuItem, Typography } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import acaLogo from '../assets/pics/aca-logo.svg'
import lifLogo from '../assets/pics/lif-logo.svg'
import InsertImage from '../assets/pics/insert-image.png'
import CheckCircle from '../assets/pics/check-circle.png'
import Warning from '../assets/pics/warning.png'
import Colors from "../assets/colors";
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Button, { ButtonProps } from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { TextFieldCustom } from "../components/textFieldCustom";
import { axiosHelper, APIResponse } from "../components/helpers/axiosHelper";
import { ColorButton, ColorLodingButton } from "../components/colorButton";
import { useForm, Controller } from "react-hook-form";
import { Privilege } from '../models/privilege'
import { AxiosError } from "axios";
import Modal from '@mui/material/Modal';
import { AlertProp } from './Marketplace';
import { LoadingButton } from "@mui/lab";


interface EditMarketpalceProp {
    isOpened: boolean;
    handleClose: any;
    privilegeId: string;
    setAlertStatus: any;
}

interface MarketpalceProp {
    handleClose: any;
    privilege: Privilege;
    setAlertStatus: any;
}

interface FileInput {
    fileName: string;
    file: File | Blob
}

interface DeleteConfirmationProp {
    privilegeId: string;
    setAlertStatus: any;
    handleEditModalClose: any;
    isAPILoading: boolean;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #E2E2FF',
    boxShadow: 14,
    pt: 4,
    px: 4,
    borderRadius: 4
};

const TestWithStar = (props: { title: string }) => {
    return (
        <div>
            <InputLabel style={{ color: Colors.Black, fontSize: "1.125rem", fontWeight: 600 }} shrink htmlFor="bootstrap-input">
                <Stack direction={"row"}>
                    {props.title}
                    <Typography style={{ color: "red", fontSize: "1.125rem", fontWeight: 600 }}>*</Typography>
                </Stack>
            </InputLabel>
        </div>)
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

function ChildModal({ privilegeId, setAlertStatus, handleEditModalClose, isAPILoading }: DeleteConfirmationProp) {
    const [childAPILoading, setChildAPILoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const deletePrivilege = () => {
        setChildAPILoading(true);

        axiosHelper.delete(`/privileges/${privilegeId}`)
            .then(function (response) {
                const data: APIResponse = response.data;
                console.log("deleted data:\n", data.data)
                const status: AlertProp = { isOpened: true, isSuccessful: data.data ? true : false, message: data.message };
                setAlertStatus(status);

                handleClose()
                handleEditModalClose()
                setChildAPILoading(false)
            })
            .catch((err: Error | AxiosError) => {
                console.log("deleted data:\n", err);
                const status: AlertProp = { isOpened: true, isSuccessful: true, message: err.message };
                setAlertStatus(status);
                handleClose()
                setChildAPILoading(false)
            })
    }

    return (
        <React.Fragment>
            <Grid
                item container
                sx={{ pl: 1, pr: 3, mt: '1.5rem', py: '1.5rem', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: Colors.LightBorberLine }}
            >
                <Grid item xs container alignContent={'center'}>
                    <Typography ml={2} sx={{ fontWeight: 600 }}>{<img src={Warning} width={12} height={12} />} DELETE PRIVILEGE</Typography>
                </Grid>
                <ColorButton
                    textColor={Colors.White}
                    bgColor={Colors.Red}
                    sx={{
                        fontWeight: 600
                    }}
                    variant="contained" onClick={handleOpen} disabled={isAPILoading ? true : false}>DELETE</ColorButton>
            </Grid>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="child-modal-title">Deletion</h2>
                    <p id="child-modal-description">
                        The privilege will be permanently
                        deleted and can not be recovered.
                    </p>
                    <Grid container justifyContent="flex-end">
                        <LoadingButton autoFocus onClick={handleClose} sx={{ fontWeight: 600 }} disabled={childAPILoading ? true : false}>
                            Cancel
                        </LoadingButton>
                        <LoadingButton onClick={deletePrivilege} sx={{ fontWeight: 600 }} loadingPosition="end" loading={childAPILoading}>DELETE</LoadingButton>
                    </Grid>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default function EditMarketplace({ isOpened, handleClose, privilegeId, setAlertStatus }: EditMarketpalceProp) {
    const [privilege, setPrivilege] = React.useState<Privilege>();

    useEffect(() => {
        if (isOpened) {
            axiosHelper.get(`/privileges/${privilegeId}`)
                .then(function (response) {
                    const data: APIResponse = response.data;
                    setPrivilege(data.data);
                    console.log("data:\n", data.data)
                })
                .catch((err: Error | AxiosError) => {
                    console.log(err);
                })
        }
    }, [isOpened]);
    return (
        <div>
            {
                privilege &&
                <Modal
                    open={isOpened}
                    onClose={(_, reason) => {
                        if (reason !== "backdropClick") {
                            handleClose();
                        }
                    }}

                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Grid container sx={{ ...style, width: '80%', px: 0 }}>
                        <Marketplace handleClose={handleClose} privilege={privilege!} setAlertStatus={setAlertStatus} />
                    </Grid>
                </Modal>
            }
        </div>
    );
}

function Marketplace({ handleClose, privilege, setAlertStatus }: MarketpalceProp) {
    const [fileSelected, setFileSelected] = React.useState<FileInput>() // also tried <string | Blob>
    const [loading, setLoading] = React.useState(false);

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
            Name: privilege.name,
            Price: privilege.price,
            TokenType: privilege.tokenType,
            Description: privilege.description,
            IsExpiryEnable: privilege.lifeTimeInDay ? true : false,
            LifeTimeInDay: privilege.lifeTimeInDay ? privilege.lifeTimeInDay : 0,
            IsMaxSupplyEnable: privilege.maxSupply ? true : false,
            MaxSupply: privilege.maxSupply ? privilege.maxSupply : 0,
            MaxSupplyType: privilege.maxSupplyType ?? "SEMESTER",
            IsMaxPerStudentEnable: privilege.amountPerStudent ? true : false,
            AmountPerStudent: privilege.amountPerStudent ? privilege.amountPerStudent : 0,
            AmountPerStudentType: privilege.amountPerStudentType ?? "SEMESTER"
        }
    });

    const onSubmit = (data: any) => {
        const editedPrivilege: Privilege = {
            id: privilege.id,
            name: data.Name,
            price: parseInt(data.Price),
            tokenType: coin,
            description: data.Description,
            lifeTimeInDay: isExpiryEnable ? parseInt(data.LifeTimeInDay) : null,
            maxSupply: isMaxSupplyEnable ? parseInt(data.MaxSupply) : null,
            maxSupplyType: isMaxSupplyEnable ? maxSupplyType : null,
            amountPerStudent: isMaxPerStudentEnable ? parseInt(data.AmountPerStudent) : null,
            amountPerStudentType: isMaxPerStudentEnable ? amountPerStudentType : null,
            isDeleted: false
        }

        const formData = new FormData();
        if (fileSelected) {
            formData.append('image', fileSelected!.file, fileSelected!.fileName);
        } else {
            editedPrivilege.imageUrl = privilege.imageUrl;
            editedPrivilege.imageName = privilege.imageName;
        }

        setLoading(true);

        formData.append('data', JSON.stringify(editedPrivilege));
        axiosHelper.put(`/privileges/${editedPrivilege.id}`, formData)
            .then(function (response) {
                const data: APIResponse = response.data;
                console.log(data.data)

                const status: AlertProp = { isOpened: true, isSuccessful: data.data ? true : false, message: data.message };
                setAlertStatus(status);

                handleClose()
                setLoading(false);
            })
            .catch((err: Error | AxiosError) => {
                const status: AlertProp = { isOpened: true, isSuccessful: false, message: err.message };
                setAlertStatus(status);
                alert(err.message)
                console.log(err);
                setLoading(false);
            })
    }

    const coins = [
        { value: "ACADEMIC", label: "ACA" },
        { value: "LIFESTYLE", label: "LIF" }
    ]

    const periods = [
        { value: "SEMESTER", label: "Per Semester" },
        { value: "YEAR", label: "Per Year" }
    ]

    const [coin, setCoin] = React.useState(privilege.tokenType);
    const handleCoinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCoin(event.target.value);
    };

    const [maxSupplyType, setMaxSupplyType] = React.useState(privilege.maxSupplyType ?? "SEMESTER");
    const handleMaxSupplyTypeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxSupplyType(event.target.value);
    };

    const [amountPerStudentType, setAmountPerStudentType] = React.useState(privilege.amountPerStudentType ?? "SEMESTER");
    const handleAmountPerStudentTypeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmountPerStudentType(event.target.value);
    };

    const [isExpiryEnable, setExpiryEnable] = React.useState(privilege.lifeTimeInDay ? true : false);
    const handleExpiryEnable = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExpiryEnable(event.target.checked);
    };

    const [isMaxSupplyEnable, setMaxSupplyEnable] = React.useState(privilege.maxSupply ? true : false);
    const handleMaxSupplyEnable = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxSupplyEnable(event.target.checked);
    };

    const [isMaxPerStudentEnable, setMaxPerStudentEnable] = React.useState(privilege.amountPerStudent ? true : false);
    const handleMaxPerStudentEnable = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPerStudentEnable(event.target.checked);
    };

    return (
        <div>
            <Grid container px={3} pb={3}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
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
                            <Grid item sm container>
                                <TestWithStar title="Image" />
                                <Grid item container>
                                    <label htmlFor="edit-image-button">
                                        <Input accept="image/*" id="edit-image-button" onChange={handleImageChange} type="file" />
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
                                        (fileSelected || privilege.imageName) &&
                                        <Typography color="secondary" ml={2} sx={{ alignSelf: "center" }}>
                                            {fileSelected?.fileName ? fileSelected?.fileName : privilege.imageName}
                                            {<img src={CheckCircle} width={12} height={12} />}
                                        </Typography>
                                    }
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
                                                    disabled={!isExpiryEnable}
                                                    isBackgroundEnable={!isExpiryEnable}
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
                                                    isBackgroundEnable={!isMaxSupplyEnable}
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
                                        {isMaxSupplyEnable &&
                                            <Controller
                                                name="MaxSupplyType"
                                                control={control}
                                                render={() =>
                                                    <TextFieldCustom
                                                        sx={{ '& > :not(style)': { height: '2.5rem', fontSize: "1rem", ml: 2 } }}
                                                        select
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
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Third row */}
                        <Grid item container spacing={4}>
                            <Grid item sx={{ '& > :not(style)': { width: '40rem' } }}>
                                <TestWithStar title="Price" />
                                <Grid item xs spacing={2}>
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
                                                placeholder="0"
                                                value={field.value.toString().replace(/^0+/, '')}
                                                variant="outlined"
                                                inputProps={{ style: { textAlign: 'right', width: '9.5rem' } }}
                                            />}
                                    />
                                    <Controller
                                        name="TokenType"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) =>
                                            <TextFieldCustom
                                                {...field}
                                                sx={{ '& > :not(style)': { height: '2.5rem', fontSize: "1rem", ml: '1rem' } }}
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
                                                disabled={!isMaxPerStudentEnable}
                                                isBackgroundEnable={!isMaxPerStudentEnable}
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
                        <Grid item xs container justifyContent="flex-end" mt="2rem">
                            <Button
                                sx={{
                                    color: Colors.SecondaryColor,
                                    fontWeight: 600,
                                    '&:hover': {
                                        backgroundColor: "transparent",
                                    }
                                }}
                                onClick={handleClose} disabled={loading ? true : false}>CANCEL</Button>
                            <ColorLodingButton
                                sx={{ fontWeight: 600, ml: '1rem' }} variant="contained" type="submit" loading={loading}
                                loadingPosition="end"
                            >UPDATE</ColorLodingButton>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            {/* {privilege.id &&
                <ChildModal privilegeId={privilege.id} setAlertStatus={setAlertStatus} handleEditModalClose={handleClose} isAPILoading={loading} />
            } */}
        </div>
    )
}