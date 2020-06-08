import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { allunidad, delunidad, updatealert } from '../Actions'
import { graphql } from 'react-apollo';
import { QUERY_GET_UNIDAD,QUERY_DELETE_UNIDAD } from '../Queries/index';


import MyTable from '../Components/Tablas/MyTable'
import DialogForm from './DialogForm'
import FormUnidad from '../Components/Forms/FormUnidad'
import AskAlert from '../Components/Alerts/AskAlert'
import Loading from '../Components/Alerts/Loading'


import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';





export class ContainerUnidad extends React.Component {

    constructor(props) {
      super(props);
      this.state = {datos: false,open: false, titulo_modal: "", mostrar: false, contenido: 'vacio',unidad: false};
    }
  
  
    componentDidUpdate() {
      const { data, inicio, user} = this.props
      const { error, unidades } = data
      
      if(error !== undefined ){
        console.log("error", error)
      }else if (unidades.data !== user.conjuntos && !this.state.datos){
        inicio(unidades.data)
        this.setState({datos: true})
      }
  
    }
  
  
  
    render() {
      const {  user, eliminarFila } = this.props;

      const {  contenido, mostrar, titulo_modal } = this.state;
      
      var conjuntos = []
  
      if (user.conjuntos){
        conjuntos = user.conjuntos
      };

    
    const confirmarEliminar = (id) =>{
        eliminarFila(id)
        cerrar()
    }

    const eliminar = (id, texto) =>{
        const boton = <AskAlert texto={texto}  nameButton="eliminar" action={confirmarEliminar} id={id} ></AskAlert>
        this.setState({contenido: boton})
        abrir()
    }

    const form = (unidad) =>{
        return(
          <FormUnidad onClick={cerrar} unidad={unidad}></FormUnidad>
        )
    }

    const openModal = (unidad="", titulo="") =>{
        const formUnidad = form(unidad)
        this.setState({contenido: formUnidad, titulo_modal: titulo})
        abrir()
    }

    const abrir = () =>{
        this.setState({mostrar: true})
    }

    const cerrar = () =>{
        this.setState({mostrar: false, titulo_modal: "",contenido: "" })
    }

    const header = [
        {name: 'ID', prop:'id'} , 
        {name: 'NOMBRE', prop:'nombre'}, 
        {name: 'DIRECCION', prop:'direccion'},
        {name: 'TELEFONO', prop:'telefono'}
    ];

    const mensajes = {
      crear: "Crear Unidad",
      actualizar: "Actualizar Unidad",
      con_eliminar: "¿Está seguro que desea eliminar la unidad?"
    }
  
    return (
        <Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
                <Paper>
                    {conjuntos === 0 && <Loading></Loading>}

                    {conjuntos && <MyTable 
                    data={conjuntos}
                    header={header}
                    texto={mensajes}
                    funEliminar={eliminar}
                    funEditar={openModal}
                    >
                    </MyTable>}
                </Paper>
            </Grid>
            <Grid item xs={11} sm={11}>
                <DialogForm titulo={titulo_modal} contenido={contenido} mostrar={mostrar} cerrar={cerrar}> 
                </DialogForm>
            </Grid>
            <Grid item xs={1} sm={1}>
                <Fab color="primary" onClick={() => openModal("false", "Crear Unidad")} aria-label="add">
                    <AddIcon />
                </Fab>
            </Grid>
            
          </Grid>
        </Fragment>

    );

    }
}


const withMutation = graphql(QUERY_DELETE_UNIDAD, {
    props: ({ mutate }) => ({
    deleteUnidad: input => mutate({
        variables: { id: input.event,
        },
      }),
    }),
  });

const mapStateToProps = state =>({
    user: state.user
})
  
  
const mapDispatchToProps = (dispatch, ownProps) => ({
  
    inicio(unidades) {
        
        dispatch(allunidad(unidades))
  
    },
  
    eliminarFila(event) {
      ownProps.deleteUnidad({ event })
      .then((response) => {
        var borrado = response.data.deleteUnidad.id;
        dispatch(delunidad(borrado));
        const alert = {
          open_alert:true,
          mensaje:"unidad eliminada",
          tipo:"success"
        }
        dispatch(updatealert(alert))
      }).catch(error => {
        console.log(error, "error ")
        const alert = {
          open_alert:true,
          mensaje:"Error al realizar la acción",
          tipo:"warning"
        }
        dispatch(updatealert(alert))
      
      }
      );
    }
  
})

const ContainerWithData = graphql(QUERY_GET_UNIDAD)(ContainerUnidad);

const UnidadesWithData = withMutation(connect(mapStateToProps,mapDispatchToProps)(ContainerWithData));

export default UnidadesWithData;