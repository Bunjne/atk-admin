import React, { useEffect, useRef } from 'react';
import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import { APIResponse, axiosHelper } from './helpers/axiosHelper';
import { Privilege } from '../models/privilege';
import { BoxBorder, ItemBaseLine } from './border';
import { SearchBar, TitleList, TitleListRectangle } from './shares/searchBar';
import { PaginationState, StyledTablePagination, TablePaginationActions, SearchDTO } from './shares/paginationUtils';
import { Grid } from '@mui/material';
import Colors from '../assets/colors';
import { ColorButton } from './colorButton';
import { AxiosError } from 'axios';
import { toPascalCase, toTwoDigitsWithComma } from "./extensions/stringExtension";
import RightArrow from '../assets/pics/right-arrow.svg';
import EmptyState from '../assets/pics/empty-state.svg';
import CancelIcon from '../assets/pics/cancel.svg';
import PrivilegePlaceholder from '../assets/pics/privilege-placeholder.svg';
import EditMarketplace from '../routes/EditMarketplace';
import CreateMarketPlace from '../routes/CreateMarketPlace';
import { DeleteModal } from '../routes/CreateMarketPlace';
import MessageAlert from './shares/messageAlert';
import ClipLoader from "react-spinners/ClipLoader";
import '../assets/text.css';


interface PrivilegeItemProp {
    privilege: Privilege;
    onUpdateClicked: any;
    onDeleteClicked: any;
}

interface PaginationItemProp {
    createdStatus: any;
    setCreateStatus: any;
}

interface PaginationMetadata {
    page: number;
    bookmark: string;
    name: string;
    tokenType: string;
}

export interface AlertProp {
    isOpened: boolean;
    isSuccessful: boolean;
    message?: string;
}

const PrivilegeItem = ({ privilege, onUpdateClicked, onDeleteClicked }: PrivilegeItemProp) => {
    function onPrivilegeCLicked(e: any) {
        onUpdateClicked(e, privilege.id);
    }

    function onDeletedPrivilegeClicked(e: any) {
        onDeleteClicked(e, privilege.id);
    }

    return (
        <Grid item container columnSpacing={2} columns={12} mt={'0.5rem'}>
            <Grid item alignSelf={"center"}>
                <IconButton
                    sx={{ p: 1 }}
                    onClick={onDeletedPrivilegeClicked}>
                    <img src={CancelIcon} width={20} height={20} />
                </IconButton>
            </Grid>
            <Grid item>
                {privilege.imageUrl !== ""
                    ?
                    <img src={privilege.imageUrl} width={74} height={74} style={{ backgroundColor: 'transparent', borderRadius: 8 }} />
                    :
                    <Paper sx={{ backgroundColor: Colors.Yellow, p: '1rem', pb: '0.4rem', borderRadius: 2, boxShadow: 'none' }}><img src={PrivilegePlaceholder} width={44} height={44} style={{ backgroundColor: 'transparent' }} /></Paper>
                }
            </Grid>
            <Grid item xs={5} sm container flexDirection={"column"}>
                <Typography sx={{ fontWeight: 600 }}>
                    {privilege.name}
                </Typography>
                <Typography
                    color="secondary"
                    className='max-lines-ellipsis'
                    sx={{
                        lineHeight: '1.2rem',
                    }}
                >
                    {privilege.description}
                </Typography>
            </Grid>
            <Grid item xs={2.7} container flexDirection={"column"}>
                <Grid item container>
                    <Typography color="secondary">Price:</Typography>
                    <Typography ml={1.5}>{toTwoDigitsWithComma(privilege.price)} {privilege.tokenType}</Typography>
                </Grid>
                <Grid item container>
                    <Typography color="secondary">Max Supply:</Typography>
                    <Typography ml={1.5}>
                        {privilege.maxSupplyText}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={2.7} container flexDirection={"column"}>
                <Grid item container>
                    <Typography color="secondary">Expiry:</Typography>
                    <Typography ml={1.5}>{privilege.expiryText}</Typography>
                </Grid>
                <Grid item container>
                    <Typography color="secondary">Max Per Student:</Typography>
                    <Typography ml={1.5}>
                        {privilege.amountPerStudentText}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={1} container alignContent={"center"} justifyContent={"end"}>
                <IconButton
                    sx={{
                        p: 1, pr: 0,
                        '&:hover': {
                            backgroundColor: "transparent",
                        }
                    }}
                    onClick={onPrivilegeCLicked}>
                    <img src={RightArrow} width={8} height={14} />
                </IconButton>

                {/* <Button
                    defaultValue={privilege.id}
                    onClick={onPrivilegeCLicked}
                    sx={{
                        '&:hover': {
                            backgroundColor: "transparent",
                        }
                    }}>
                    <img src={RightArrow} width={8} height={14} />
                </Button> */}
            </Grid>
        </Grid>
    )
}

export default function PrivilegesLists({ createdStatus, setCreateStatus }: PaginationItemProp) {
    const userAddressQueryRef = useRef<HTMLInputElement>();
    const searchTypes = [
        { value: "ALL", label: "ALL" },
        { value: "ACADEMIC", label: "ACADEMIC" },
        { value: "LIFESTYLE", label: "LIFESTYLE" }
    ];

    const pageSize = 6;
    const rowsPerPageOptions = [...Array(5)].map((_, i) => (i + 1) * pageSize);
    const paginationMetadata: PaginationMetadata = {
        bookmark: '',
        page: 0,
        name: '',
        tokenType: 'ALL'
    }

    const [metadata, setPage] = React.useState<PaginationMetadata>(paginationMetadata);
    const [metadataList, setMetadataList] = React.useState<Array<PaginationMetadata>>([paginationMetadata]);
    const [datas, setDatas] = React.useState<Array<Privilege>>();
    const [totalItems, setTotalItems] = React.useState(0);
    const [bookmark, setBookmark] = React.useState('');

    const [rowsPerPage, setRowsPerPage] = React.useState(pageSize);
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(paginationMetadata);
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        const newMetadata: PaginationMetadata = {
            page: newPage,
            bookmark: bookmark,
            name: metadata.name,
            tokenType: metadata.tokenType
        };

        console.log(newPage);
        if (newPage <= metadataList.length - 1) {
            newMetadata.bookmark = metadataList.find(x => x.page === newPage)?.bookmark ?? '';
        }

        setPage(newMetadata);
        metadataList.push(newMetadata);
        setMetadataList(metadataList);
    };

    // Search Bar
    const [selectedType, setSearchType] = React.useState('ALL');
    const handleSearchTypeChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchType(event.target.value);
    };

    function onSearchClicked() {
        const newMetadata: PaginationMetadata = {
            page: 0,
            bookmark: '',
            name: userAddressQueryRef.current?.value ?? "",
            tokenType: selectedType
        };

        setPage(newMetadata);
        setMetadataList([newMetadata]);
    }

    const [isLoading, setIsLoading] = React.useState(true);
    const override = `
    display: block;
    margin: 0 auto;
  `;

    function fecthPrivileges() {
        if (metadata.page >= 0) {
            setIsLoading(true);
            axiosHelper.get(`/privileges?bookmark=${metadata.bookmark}&pageSize=${rowsPerPage}&name=${metadata.name}&tokenType=${metadata.tokenType}`)
                .then(function (response) {
                    const data: APIResponse = response.data;
                    const paginated: PaginationState = data.data;
                    const items: Array<Privilege> = paginated.items as Array<Privilege>;

                    for (const privilege of items) {
                        privilege.tokenType = privilege.tokenType === "ACADEMIC" ? "ACA" : "LIF";

                        privilege.maxSupplyText = privilege.maxSupply ? toTwoDigitsWithComma(privilege.maxSupply) + " Per " + toPascalCase(privilege.maxSupplyType) : "Unlimited";
                        privilege.expiryText =
                            privilege.lifeTimeInDay === 1 ? privilege.lifeTimeInDay + " Day"
                                : privilege.lifeTimeInDay ? privilege.lifeTimeInDay + " Days"
                                    : "Never";
                        privilege.amountPerStudentText = privilege.amountPerStudent ? toTwoDigitsWithComma(privilege.amountPerStudent) + " Per " + toPascalCase(privilege.amountPerStudentType) : "Unlimited"
                    }

                    setDatas(items);
                    setTotalItems(paginated.totalItem);
                    setBookmark(paginated.bookmark)
                    setIsLoading(false);
                    console.log(paginated)
                })
                .catch((err: Error | AxiosError) => {
                    alert(err.message);
                    console.log(err.message);
                    setIsLoading(false);
                })
        }
    }

    useEffect(() => {
        fecthPrivileges()
    }, [metadata])


    useEffect(() => {
        if (createdStatus.isSuccessful && createdStatus.isOpened) {
            fecthPrivileges()
        }
    }, [createdStatus])

    const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        const status: AlertProp = { isOpened: false, isSuccessful: true };
        setCreateStatus(status);
    };

    const [selectedPrivilegeId, setPrivilegeId] = React.useState<string>();

    const [open, setOpen] = React.useState(false);
    const handleUpdateModalOpen = (_e: any, privilegeId: string) => {
        setPrivilegeId(privilegeId ?? "")
        setOpen(true);
    };
    const handleClose = () => {
        const status: AlertProp = { isOpened: false, isSuccessful: true };
        setCreateStatus(status);
        setOpen(false);
    };

    const [openDeletedModal, setDeleteModalOpen] = React.useState(false);
    const handleDeleteModalOpen = (_e: any, privilegeId: string) => {
        setPrivilegeId(privilegeId ?? "")
        setDeleteModalOpen(true);
    };
    const handleDeleteModalClose = () => {
        const status: AlertProp = { isOpened: false, isSuccessful: true };
        setCreateStatus(status);
        setDeleteModalOpen(false);
    };

    return (<>
        <Grid item container direction="row" mt={'0.5rem'}>
            <SearchBar options={searchTypes} selectedOption={selectedType} onOptionChanged={handleSearchTypeChanged} userAddressQueryRef={userAddressQueryRef} onSearchClicked={onSearchClicked} />
        </Grid>
        <Grid item container flexDirection={"column"}>
            {isLoading ?
                <ClipLoader color={Colors.PrimaryColor} loading={isLoading}
                    css={override} size={50} />
                : <>
                    {datas?.length !== 0 ?
                        <div>
                            {datas?.map((x, index) => {
                                return (
                                    <>
                                        <PrivilegeItem privilege={x} onUpdateClicked={handleUpdateModalOpen} onDeleteClicked={handleDeleteModalOpen} />
                                        {index + 1 !== datas?.length &&
                                            <ItemBaseLine sx={{ my: '1rem' }} />
                                        }
                                    </>
                                )
                            })}

                            <StyledTablePagination
                                count={totalItems}
                                rowsPerPageOptions={rowsPerPageOptions}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                page={metadata.page}
                                onPageChange={handleChangePage}
                                ActionsComponent={TablePaginationActions}
                                sx={{ display: "flex", justifyContent: "right" }}
                            />

                            {selectedPrivilegeId &&
                                <>
                                    <EditMarketplace isOpened={open} handleClose={handleClose} privilegeId={selectedPrivilegeId} setAlertStatus={setCreateStatus} />
                                    <DeleteModal isOpened={openDeletedModal} setOpen={handleDeleteModalClose} privilegeId={selectedPrivilegeId} setAlertStatus={setCreateStatus} />
                                </>
                            }
                        </div>
                        :
                        <Grid item container alignContent={"center"} flexDirection={"column"} py={"100px"}>
                            <Grid alignSelf={"center"}>
                                <img src={EmptyState} width={120} height={120} />
                            </Grid>
                            <Typography fontSize="1.5rem" fontWeight={600}>DATA NOT FOUND</Typography>
                        </Grid>
                    }
                </>
            }
        </Grid>
    </>
    )
}

