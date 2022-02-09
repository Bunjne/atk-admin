import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React, { SyntheticEvent } from 'react';
import { AlertProp } from '../../routes/Marketplace';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface MessageAlertProp {
    messageAlert: AlertProp;
    handleAlertClose?: any;
}

export default function MessageAlert({ messageAlert, handleAlertClose }: MessageAlertProp) {
    return (
        <Snackbar open={messageAlert.isOpened} autoHideDuration={4000} onClose={handleAlertClose}>
            <Alert onClose={handleAlertClose} severity={messageAlert.isSuccessful ? "success" : "error"} sx={{ width: '100%' }}>
                {messageAlert.message}
            </Alert>
        </Snackbar>
    )
}
