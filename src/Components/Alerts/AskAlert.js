import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';


const AskAlert = ({ texto, action, nameButton, id }) => {

    return (
        <div>
            <DialogContentText id="alert-dialog-description">
                {texto}
            </DialogContentText>
            <DialogActions>
                <Button onClick={() => action(id)} color="primary">
                    {nameButton}
                </Button>
            </DialogActions>
        </div>
    );


}

export default AskAlert;