import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { addapto, updatealert } from '../../Actions'
import { QUERY_CREATE_APTO } from '../../Queries'
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import compose from "lodash.flowright";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

const FormApto = ({onSubmit, onClick, apto, datos }) => {

  const classes = useStyles();

  const [state, setState] = React.useState({
    id: "",
    nomenclatura: "",
    bloque: "",
    unidad: "",
    tipoapto: "",
    propietario: "",
    arrendatario: "",
    asignar: true
  });

  const {id, nomenclatura, bloque, unidad, tipoapto, propietario, arrendatario ,asignar } = state;
  

  if ( apto !== "false" && asignar ){
    setState({ 
      ...state, 
      id: apto.id,
      nomenclatura: apto.nombre, 
      bloque: apto.bloque.id,
      unidad: apto.unidad.id, 
      tipoapto: apto.tipoapto.id, 
      propietario: apto.propietario.id,
      arrendatario: apto.arrendatario.id,
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
    console.log(formData)
/*
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
        */
    return onSubmit({
        nomenclatura: formData.get('nomenclatura'),
        bloque: formData.get('bloque'),
        unidad: formData.get('unidad'),
        tipoapto: formData.get('tipoapto'),
        propietario: formData.get('propietario'),
        arrendatario: formData.get('arrendatario'),
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
                    id="nomenclatura"
                    name="nomenclatura"
                    label="nomenclatura"
                    value={nomenclatura} 
                    onChange={handleChangeValue}
                    fullWidth
                    autoComplete="billing address-level2"
                />
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">bloque</InputLabel>
                <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="bloque"
                value={bloque}
                onChange={handleChangeValue}
                >
                {datos[0].map((bloque, index) => 
                    <MenuItem key={index} value={bloque.id}>{bloque.nombre}</MenuItem>
                )}
            </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">unidad</InputLabel>
                <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="unidad"
                value={unidad}
                onChange={handleChangeValue}
                >
                {datos[1].map((bloque, index) => 
                    <MenuItem key={index} value={bloque.id}>{bloque.nombre}</MenuItem>
                )}
            </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">tipoapto</InputLabel>
                <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="tipoapto"
                value={tipoapto}
                onChange={handleChangeValue}
                >
                {datos[2].map((bloque, index) => 
                    <MenuItem key={index} value={bloque.id}>{bloque.nombre}</MenuItem>
                )}
            </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">propietario</InputLabel>
                <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="propietario"
                value={propietario}
                onChange={handleChangeValue}
                >
                {datos[3].map((bloque, index) => 
                    <MenuItem key={index} value={bloque.id}>{bloque.nombre}</MenuItem>
                )}
            </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">arrendatario</InputLabel>
                <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="arrendatario"
                value={arrendatario}
                onChange={handleChangeValue}
                >
                {datos[4].map((bloque, index) => 
                    <MenuItem key={index} value={bloque.id}>{bloque.nombre}</MenuItem>
                )}
            </Select>
        </FormControl>
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

const withMutation =  graphql(QUERY_CREATE_APTO, {
    props: ({ mutate }) => ({
    createApto: input => mutate({
        variables: { 
        nomenclatura: input.nomenclatura,
        bloque: input.bloque,
        unidad: input.unidad,
        tipoapto: input.tipoapto,
        propietario: input.propietario,
        arrendatario: input.arrendatario,
        },
      }),
    }),
  })

  const mapDispatchToProps = (dispatch, ownProps) => ({

    onSubmit({ nomenclatura, bloque, unidad, tipoapto, propietario, arrendatario }) {

      ownProps.createApto({ nomenclatura, bloque, unidad, tipoapto, propietario, arrendatario })

      .then((response) => {

        var nuevoApto = {
          "id": response.data.createApto.id,
          "nomenclatura": response.data.createApto.nomenclatura,
          "unidad": {
            "nombre": response.data.createApto.unidad.nombre,
            "__typename": "Unidad"
          },
          "bloque": {
            "nombre": response.data.createApto.bloque.nombre,
            "__typename": "Bloque"
          },

          "tipoapto":{
            "tipo_apto": response.data.createApto.tipoapto.tipo_apto,
            "__typename": "Tipp_aptos"
          },
          "propietario": {
            "name": response.data.createApto.propietario.name,
            "last_name": response.data.createApto.propietario.last_name,
            "__typename": "User"
          },
          "arrendatario": {
            "name": response.data.createApto.arrendatario.name,
            "last_name": response.data.createApto.arrendatario.last_name,
            "__typename": "User"
          },
          "__typename": "Apto"
        }
        dispatch(addapto(nuevoApto));
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

  });
  
export default withMutation(connect(null, mapDispatchToProps)(FormApto));