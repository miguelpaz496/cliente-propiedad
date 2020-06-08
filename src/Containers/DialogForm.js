import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';


const DialogForm = ( {titulo="", contenido="", mostrar, cerrar} ) => {
    

  return (
      <Dialog  maxWidth="sm"  open={mostrar} onClose={cerrar} aria-labelledby="form-dialog-title">
        <DialogTitle  display="flex" id="alert-dialog-title" >
          <Grid  container item xs={12} alignContent='space-between'>
            <Grid item xs={10} sm={10}>
              {titulo}
            </Grid>
            <Grid item xs={2} sm={2} container alignItems="flex-start" justify="flex-end" direction="row">
              <IconButton  aria-label="close" size="small"onClick={cerrar}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
            {contenido}
        </DialogContent>
      </Dialog>
  );
}

export default DialogForm