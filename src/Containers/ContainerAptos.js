import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';
import { QUERY_GET_APTOS, QUERY_DELETE_APTO } from '../Queries/index'
import { connect } from 'react-redux'
import { allaptos } from '../Actions'


import MyTable from '../Components/Tablas/MyTable'
import DialogForm from './DialogForm'
import AskAlert from '../Components/Alerts/AskAlert'
import FormApto from '../Components/Forms/FormApto'

import Aptos from '../Components/Tablas/Aptos';

import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';



export class ContainerAptos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {datos: false,open: false, titulo_modal: "", mostrar: false, contenido: 'vacio',unidad: false};
    }

    componentDidUpdate() {
        const { data, inicio , apto} = this.props
        const { error, aptos } = data
        
        if(error !== undefined ){
          console.log("error", error)
        }else if (aptos.data !== apto.conjuntos && !this.state.datos){
          inicio(aptos.data)
          this.setState({datos: true})
        }
    
    }



    render() {

        const {  apto, eliminarFila } = this.props;


        const {  contenido, mostrar, titulo_modal } = this.state;

        var aptos_componente = []

        if (apto.aptos){
            aptos_componente = apto.aptos
            console.log(aptos_componente)
        };

        const confirmarEliminar = (id) =>{
            eliminarFila(id)
            cerrar()
        }
    
        const eliminar = (id, texto='prueba') =>{
            const boton = <AskAlert texto={texto}  nameButton="eliminar" action={confirmarEliminar} id={id} ></AskAlert>
            this.setState({contenido: boton})
            abrir()
        }

        const openModal = (apto="false", titulo="") =>{
            //const formUnidad = form(apto)
            const formulario_nuevo = <FormApto onClick={cerrar} apto={apto} datos={datos_formulario} ></FormApto>
            this.setState({contenido: formulario_nuevo , titulo_modal: titulo})
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
            {name: 'NOMENCLATURA', prop:'nomenclatura'}, 
            {name: 'BLOQUE', prop:'bloque.nombre'},
            {name: 'UNIDAD', prop:'unidad.nombre'},
            {name: 'TIPO APARTAMENTO', prop:'tipoapto.tipo_apto'},
            {name: 'PROPIETARIO', prop:'propietario.name'},
            {name: 'ARRENDATARIO', prop:'arrendatario.name'}
        ];
    
        const mensajes = {
            crear: "Crear apto",
            actualizar: "Actualizar apto",
            con_eliminar: "¿Está seguro que desea eliminar la apto?"
        }

        const bloques = [
            {id: 2, nombre: "A"},
            {id: 3, nombre: "B"},
            {id: 4, nombre: "C"}
        ]

        const unidad = [
            {id: 2, nombre: "Guadalupe Real"},
            {id: 3, nombre: "Bosques de Cañaveralejo"},
            {id: 4, nombre: "Guadalajara"}
        ]

        const tipo_apto = [
            {id: 1, nombre: "78m"},
            {id: 2, nombre: "82m"},
            {id: 3, nombre: "80m"}
        ]

        const propietario = [
            {id: 4, nombre: "Walter"},
            {id: 5, nombre: "Juan"}
        ]

        const arrendatario = [
            {id: 4, nombre: "Walter"},
            {id: 5, nombre: "Juan"}
        ]

        const datos_formulario = [
            bloques,
            unidad,
            tipo_apto,
            propietario,
            arrendatario
        ]

        return(

            <Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <Paper>
                            {aptos_componente && <MyTable 
                                data={aptos_componente}
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
                        <Fab color="primary" onClick={() => openModal("false", "Crear Apto")} aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Grid>
                </Grid>
            </Fragment>

        )
    }

}


const withMutation = graphql(QUERY_DELETE_APTO, {
    props: ({ mutate }) => ({
    deleteApto: input => mutate({
        variables: { id: input.event,
        },
      }),
    }),
  });

const mapStateToProps = state =>({
    apto: state.apto
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  
    inicio(aptos) {
        
        dispatch(allaptos(aptos))
  
    },

    eliminarFila(event) {
        console.log(event)
        /**
        ownProps.deleteApto({ event })
        .then((response) => {
          var borrado = response.data.deleteApto.id;
          dispatch(delapto(borrado));
          const alert = {
            open_alert:true,
            mensaje:"apto eliminada",
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
         */
      }

})

const ContainerWithData = graphql(QUERY_GET_APTOS)(ContainerAptos);

const AptosWithData = connect(mapStateToProps,mapDispatchToProps)(ContainerWithData);

export default AptosWithData;