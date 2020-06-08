import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { addunidad, updateunidad, updatealert } from '../../Actions'
import { QUERY_CREATE_UNIDAD, QUERY_UPDATE_UNIDAD } from '../../Queries'
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import compose from "lodash.flowright";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const FormUnidad = ({onSubmit,onSubmit2, onClick, unidad }) => {

  const classes = useStyles();

  const [state, setState] = React.useState({
    id: "",
    nombre: "",
    direccion: "",
    telefono: "",
    id_admin: "",
    activo: false,
    asignar: true
  });

  const {id, nombre, direccion, telefono, id_admin, activo, asignar } = state;
  

  if ( unidad !== "false" && asignar ){
    setState({ 
      ...state, 
      id: unidad.id,
      nombre: unidad.nombre, 
      direccion: unidad.direccion,
      telefono: unidad.telefono, 
      id_admin: unidad.admin.id, 
      activo: unidad.active,
      asignar: false  
    })
  }


  const handleChangeCheck = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChangeValue = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const enviarForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    if(id !== ""){

        return onSubmit2({
          id: id,
          nombre: formData.get('nombre'),
          direccion: formData.get('direccion'),
          telefono: formData.get('telefono'),
          id_admin: formData.get('id_admin'),
          active: activo,
      });

    }
    
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
        <Grid item xs={12} sm={12}>
            <Button
            variant="contained"
            type='submit'
            color="primary"
            size="small"
            fullWidth={true}
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Guardar
          </Button>
        </Grid>
      </Grid>
    </form>
    </React.Fragment>
  );
}

const withMutation = compose(
  
  graphql(QUERY_CREATE_UNIDAD, {
    props: ({ mutate }) => ({
    createUnidad: input => mutate({
        variables: { 
        nombre: input.nombre,
        direccion: input.direccion,
        telefono: input.telefono,
        id_admin: input.id_admin,
        active: input.active,
        },
      }),
    }),
  }),
  graphql(QUERY_UPDATE_UNIDAD, {
    props: ({ mutate }) => ({
      updateUnidad: input => mutate({
        variables: {  
        id: input.id,
        nombre: input.nombre,
        direccion: input.direccion,
        telefono: input.telefono,
        id_admin: input.id_admin,
        active: input.active,
        },
      }),
    }),
  })
  
  );
  

  /*
  const mapStateToProps = state => ({
    ...state.register,
  });
  */
  const mapDispatchToProps = (dispatch, ownProps) => ({

    onSubmit({ nombre, direccion, telefono, id_admin, active }) {

      ownProps.createUnidad({ nombre, direccion, telefono, id_admin, active })

      .then((response) => {

        var nuevaUnidad = {
          "id": response.data.createUnidad.id,
          "nombre": response.data.createUnidad.nombre,
          "direccion": response.data.createUnidad.direccion,
          "telefono": response.data.createUnidad.telefono,
          "admin": {
            "name": response.data.createUnidad.admin.name,
            "id": response.data.createUnidad.admin.id,
            "__typename": "User"
          },
          "active": response.data.createUnidad.active,
          "__typename": "Unidad"
        }
        dispatch(addunidad(nuevaUnidad));
        ownProps.onClick()
        const alert = {
          open_alert:true,
          mensaje:"unidad creada",
          tipo:"success"
        }
        dispatch(updatealert(alert))
      }).catch(error => {
        console.log(error, "error create")

        ownProps.onClick()
        
        const alert = {
          open_alert:true,
          mensaje:"Error al realizar la acción",
          tipo:"warning"
        }
        dispatch(updatealert(alert))
      
      
      }
      );
    },

    onSubmit2({id, nombre, direccion, telefono, id_admin, active }) {

      ownProps.updateUnidad({id, nombre, direccion, telefono, id_admin, active })

      .then((response) => {
        var nuevaUnidad = {
          "id": response.data.updateUnidad.id,
          "nombre": response.data.updateUnidad.nombre,
          "direccion": response.data.updateUnidad.direccion,
          "telefono": response.data.updateUnidad.telefono,
          "admin": {
            "name": response.data.updateUnidad.admin.name,
            "id": response.data.updateUnidad.admin.id,
            "__typename": "User"
          },
          "active": response.data.updateUnidad.active,
          "__typename": "Unidad"
        }

        dispatch(updateunidad(nuevaUnidad));
        ownProps.onClick()
        const alert = {
          open_alert:true,
          mensaje:"unidad actualizada",
          tipo:"success"
        }
        dispatch(updatealert(alert))
      }).catch(error => {
        
        console.log(error)
        ownProps.onClick()
        const alert = {
          open_alert:true,
          mensaje:"Error al realizar la acción",
          tipo:"warning"
        }
        dispatch(updatealert(alert))
      }
      

      );
    },

  });
  
 export default withMutation(connect(null, mapDispatchToProps)(FormUnidad));