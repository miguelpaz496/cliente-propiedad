import React from 'react';
import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import FormUnidad from '../Components/Forms/FormUnidad'
//import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogContentText from '@material-ui/core/DialogContentText';
//import { Fragment } from 'react';


const MyDialog = ( {tipo, onClick, id} ) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const eliminarFila = () =>{
    onClick(id)
  }

  const handleClose = () => {
    setOpen(false);
  };

  var contenido = ""

  if (tipo === "Crear Unidad") {
    contenido = <FormUnidad onClick={handleClose}/>;
  } else if (tipo === "eliminar") {
    contenido = <div>
                          <DialogContentText id="alert-dialog-description">
                            desea eliminar el registro ?
                        </DialogContentText>
                      <Button onClick={() => eliminarFila()} color="primary">
                            eliminar
                      </Button>
              </div>  

    tipo =  
              <DeleteIcon fontSize="small" />
            
  } else {
    contenido = <h4>else</h4>;    }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {tipo}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
            {contenido}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MyDialog