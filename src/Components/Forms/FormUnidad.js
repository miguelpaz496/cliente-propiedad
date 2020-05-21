import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
//import DeleteIcon from '@material-ui/icons/Delete';
//import CloudUploadIcon from '@material-ui/icons/CloudUpload';
//import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
//import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import { addunidad } from '../../Actions'
import { QUERY_CREATE_UNIDAD } from '../../Queries'
import { graphql } from 'react-apollo';
import { connect } from 'react-redux'


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const FormUnidad = ({onSubmit, onClick }) => {

  const classes = useStyles();

  const cerrar = () =>{
    onClick()
  }

  const enviarForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    return onSubmit({
        nombre: formData.get('nombre'),
        direccion: formData.get('direccion'),
        telefono: formData.get('telefono'),
        id_admin: formData.get('id_admin'),
        active: formData.get('activo'),
    });
  }


  return (
    <React.Fragment>
    <form
        onSubmit={enviarForm}
    >
      <Typography variant="h6" gutterBottom>
        Crear Unidad
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <TextField
                required
                id="nombre"
                name="nombre"
                label="Nombre"
                fullWidth
                autoComplete="billing address-level2"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                required
                id="direccion"
                name="direccion"
                label="Dirección"
                fullWidth
                autoComplete="billing postal-code"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                required
                id="telefono"
                name="telefono"
                label="Telefono"
                fullWidth
                autoComplete="billing country"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                required
                id="id_admin"
                name="id_admin"
                label="Admin"
                fullWidth
                autoComplete="billing country"
            />
        </Grid>
        <Grid item xs={12}>
            <FormControlLabel
                control={<Checkbox color="secondary" name="activo" value="true" />}
                label="Activo"
            />
        </Grid>
      </Grid>

        <Button
        variant="contained"
        type='submit'
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>


      </form>
      <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={cerrar}
        className={classes.button}
      >
        Cancelar
      </Button>
        </div>
    </React.Fragment>
  );
}

const withMutation = graphql(QUERY_CREATE_UNIDAD, {
    props: ({ mutate }) => ({
    createUnidad: input => mutate({
        variables: { nombre: input.nombre,
        direccion: input.direccion,
        telefono: input.telefono,
        id_admin: 1,
        active: true,
        },
      }),
    }),
  });
  

  /*
  const mapStateToProps = state => ({
    ...state.register,
  });
  */
  const mapDispatchToProps = (dispatch, ownProps) => ({

    onSubmit({ nombre, direccion, telefono, id_admin, active }) {
      //dispatch(createUserRequest({ username }));
      ownProps.createUnidad({ nombre, direccion, telefono, id_admin, active })
      .then(() => {
        console.log("bueno");
        var nuevaUnidad = {
          "id": "100",
          "nombre": nombre,
          "direccion": direccion,
          "telefono": telefono,
          "id_admin": id_admin,
          "active": true,
          "__typename": "Unidad"
        }
        dispatch(addunidad(nuevaUnidad));
        ownProps.onClick()
      }).catch(error => console.log(error, "error ")
      );
    },

  });
  
 export default withMutation(connect(null, mapDispatchToProps)(FormUnidad));

//export default FormUnidad