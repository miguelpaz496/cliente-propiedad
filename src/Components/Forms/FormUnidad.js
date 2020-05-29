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

const FormUnidad = ({onSubmit, onClick, unidad }) => {

  const classes = useStyles();

  const [state, setState] = React.useState({
    nombre: "",
    direccion: "",
    telefono: "",
    id_admin: "",
    activo: false,
  });

  const cerrar = () =>{
    onClick()
  }

  const handleChangeCheck = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChangeValue = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { nombre, direccion, telefono, id_admin, activo } = state;


  if ( unidad !== "false" ){
    setState({ 
      ...state, 
      nombre: unidad.nombre, 
      direccion: unidad.direccion,
      telefono: unidad.telefono, 
      id_admin: unidad.id_admin, 
      activo: unidad.active,  
    })
  }

  const enviarForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData.get('nombre'))
    console.log(formData.get('direccion'))
    console.log(formData.get('telefono'))
    console.log(formData.get('id_admin'))
    console.log(formData.get('activo'))
    console.log(activo)
    
    return onSubmit({
        nombre: formData.get('nombre'),
        direccion: formData.get('direccion'),
        telefono: formData.get('telefono'),
        id_admin: formData.get('id_admin'),
        active: activo,
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
                value={nombre} 
                onChange={handleChangeValue}
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
                value={direccion} 
                onChange={handleChangeValue}
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
                value={telefono}
                onChange={handleChangeValue}
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
                value={id_admin}
                onChange={handleChangeValue}
                fullWidth
                autoComplete="billing country"
            />
        </Grid>
        <Grid item xs={12}>
            <FormControlLabel
                control={<Checkbox color="secondary" name="activo" checked={activo} onChange={handleChangeCheck} />}
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
        active: input.active,
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
      .then((response) => {
        console.log("bueno");
        console.log(response)
        var nuevaUnidad = {
          "id": response.data.createUnidad.id,
          "nombre": response.data.createUnidad.nombre,
          "direccion": response.data.createUnidad.direccion,
          "telefono": response.data.createUnidad.telefono,
          "admin": {
            "name": response.data.createUnidad.admin.name,
            "__typename": "User"
          },
          "active": response.data.createUnidad.active,
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