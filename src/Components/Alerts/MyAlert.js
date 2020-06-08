import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const MyAlert = ({ alert, handleClose }) => {

    const {open_alert, mensaje, tipo} = alert

    return (

        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right'}}  
            open={open_alert} 
            autoHideDuration={6000} 
            onClose={handleClose}>
            <Alert onClose={handleClose} severity={tipo}>
                {mensaje}
            </Alert>
        </Snackbar>

    );



}

export default MyAlert;