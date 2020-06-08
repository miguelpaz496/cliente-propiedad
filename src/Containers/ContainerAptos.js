import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';
import { QUERY_GET_APTOS, QUERY_DELETE_APTO } from '../Queries/index'
import { connect } from 'react-redux'
import { allaptos } from '../Actions'


import MyTable from '../Components/Tablas/MyTable'
import DialogForm from './DialogForm'
import FormUnidad from '../Components/Forms/FormUnidad'
import AskAlert from '../Components/Alerts/AskAlert'

import Aptos from '../Components/Tablas/Aptos';

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

        var aptos_componente = []

        if (apto.aptos){
            aptos_componente = apto.aptos
            console.log(aptos_componente)
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

        const openModal = (apto="", titulo="") =>{
            //const formUnidad = form(apto)

            this.setState({contenido:"formUnidad", titulo_modal: titulo})
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

        return(

            <Fragment>
                    

                    {aptos_componente && <MyTable 
                    data={aptos_componente}
                    header={header}
                    texto={mensajes}
                    funEliminar={eliminar}
                    funEditar={openModal}
                    >
                    </MyTable>}
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