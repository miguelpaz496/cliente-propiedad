import React from 'react';
import { connect } from 'react-redux'
import { allunidad, delunidad } from '../../Actions'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import MyDialog from '../../Containers/MyDialog'
import MyDialog from '../../Containers/MyDialog'


import { QUERY_DELETE_UNIDAD } from '../../Queries'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
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

    if (this.props.data.getUnidades !== this.props.user.conjuntos && !this.state.datos){
      this.props.inicio(this.props.data.getUnidades)
      this.setState({datos: true})
    }

  }



  render() {
    const {  user, eliminarFila } = this.props;

    var conjuntos = []

    if (user.conjuntos){
      conjuntos = user.conjuntos
    }

    const eliminar = (id) => {
      eliminarFila(id);
    };
  
    return (
      <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>NOMBRE</TableCell>
            <TableCell>DIRECCION</TableCell>
            <TableCell>TELEFONO</TableCell>
            <TableCell>ID ADMIN</TableCell>
            <TableCell>ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {conjuntos.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.direccion}</TableCell>
              <TableCell>{row.telefono}</TableCell>
              <TableCell>{row.id_admin}</TableCell>
              <TableCell>
              <MyDialog tipo="eliminar" onClick={eliminar} id= {row.id} />
              <IconButton onClick={() => eliminarFila(row.id)} aria-label="delete">
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton  onClick={()=>{console.log("editar")}} aria-label="delete">
                <EditIcon fontSize="small" />
              </IconButton>
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
    .then(() => {
      console.log("bueno");
      dispatch(delunidad(event));
    }).catch(error => console.log(error, "error ")
    );
  }

})


//const AptosWithData = graphql(QUERY_GET_UNIDAD)(Unidades);

export default withMutation(connect(mapStateToProps,mapDispatchToProps)(Unidades))