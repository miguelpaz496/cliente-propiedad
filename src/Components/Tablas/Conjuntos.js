import React from 'react';
import { connect } from 'react-redux'
import { allunidad, delunidad } from '../../Actions'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DialogMessage from '../../Containers/DialogMessage'
import DialogForm from '../../Containers/DialogForm'
import FormUnidad from '../../Components/Forms/FormUnidad'
import { QUERY_DELETE_UNIDAD } from '../../Queries'
import EditIcon from '@material-ui/icons/Edit';
//import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



//import { graphql } from 'react-apollo';
import { graphql } from 'react-apollo';
//import { QUERY_GET_UNIDAD } from '../../Queries/index'





export class Unidades extends React.Component {

  constructor(props) {
    super(props);
    this.state = {datos: false};
  }


  componentDidUpdate() {

    if (this.props.data.unidades.data !== this.props.user.conjuntos && !this.state.datos){
      this.props.inicio(this.props.data.unidades.data)
      this.setState({datos: true})
    }

  }



  render() {
    const {  user, eliminarFila } = this.props;

  

    var conjuntos = []

    if (user.conjuntos){
      conjuntos = user.conjuntos
    };

    const eliminar = (id) => {
      eliminarFila(id);
    };

    const iconoEliminar =  <DeleteIcon fontSize="small" />

    const iconoEditar =  <EditIcon fontSize="small" />




    return (
      <React.Fragment>
      <Table className=".MuiTable-stickyHeader" size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>NOMBRE</TableCell>
            <TableCell>DIRECCION</TableCell>
            <TableCell>TELEFONO</TableCell>
            <TableCell>ID ADMIN</TableCell>
            <TableCell >ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {conjuntos.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.direccion}</TableCell>
              <TableCell>{row.telefono}</TableCell>
              <TableCell>{row.admin.name}</TableCell>
              <TableCell>
              <DialogMessage 
                titulo={iconoEliminar} 
                nombreAccion="eliminar" 
                funcion={eliminar} 
                id= {row.id}   
                mensaje= "¿Desea eliminar el registro?">
               </DialogMessage>
               <DialogForm 
                titulo={iconoEditar} >
                  <FormUnidad 
                    unidad={row} >
                  </FormUnidad>
               </DialogForm>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
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
 
    console.log(event)
    ownProps.deleteUnidad({ event })
    .then((response) => {
      console.log("bueno");
      console.log(response.data.deleteUnidad.id);
      var borrado = response.data.deleteUnidad.id;
      dispatch(delunidad(borrado));
    }).catch(error => console.log(error, "error ")
    );
  }

})

export default withMutation(connect(mapStateToProps,mapDispatchToProps)(Unidades));