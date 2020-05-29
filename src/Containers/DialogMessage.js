import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    ancho: {
        width: 12,
      },
  }));

const DialogMessage = ( {titulo, nombreAccion, funcion, mensaje, id} ) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const funcionBoton = () =>{
    funcion(id)
    handleClose()
  }

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className={classes.ancho}>
      <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
        {titulo}
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {mensaje}
                </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={funcionBoton} color="primary">
            { nombreAccion}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogMessage