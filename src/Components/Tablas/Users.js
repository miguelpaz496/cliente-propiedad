import React from 'react';
import { connect } from 'react-redux'
import { alluser, delusuario } from '../../Actions'


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import {QUERY_DELETE_USER} from './../../Queries';
import { graphql } from 'react-apollo';



export class Usuarios extends React.Component {

  constructor(props) {
    super(props);
    this.state = {datos: false};
  }

  componentDidUpdate() {
    console.log(this.props.data.users.data)
    if (this.props.data.users.data !== this.props.user.usuarios && !this.state.datos){ // 1. datos de la consulta 2. usuarios del reducer 
      this.props.inicio(this.props.data.users.data)                                // 3. datos del state local del componente
      this.setState({datos: true})
    }

  }


  render() {

    const {  user } = this.props;

    var usuarios_componente = []

    if (user.usuarios){
      usuarios_componente = user.usuarios // variable local del componente = variable del store
    }

    return (
      <React.Fragment>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NOMBRE</TableCell>
              <TableCell>APELLIDO</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>CEDULA</TableCell>
              <TableCell>TELEFONO</TableCell>
              <TableCell>TIPO USUARIO</TableCell>
              <TableCell>ACTIVO?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios_componente.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.last_name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.dni}</TableCell>
                <TableCell>{row.telefono}</TableCell>
                <TableCell>{row.tipo.tipo_usuarios}</TableCell>
                <TableCell>
                   {(row.active) ? <CheckCircleIcon/> : <CancelIcon/>  }             
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );

  }

}


const withMutation = graphql(QUERY_DELETE_USER, {
  props: ({ mutate }) => ({
  deleteUser: input => mutate({
      variables: { id: input.id,
      },
    }),
  }),
});



const mapStateToProps = state =>({
  user: state.user
})


const mapDispatchToProps = (dispatch, ownProps) => ({

  inicio(users) {
      
      dispatch(alluser(users))

  },

  eliminarFila(id) {
 
    console.log(id)

    //funcion que cree para eliminar el registro 
    ownProps.deleteUser({ id })
    .then(() => {
      console.log("bueno");
      // funcion que traigo del action
      dispatch(delusuario(id));

    }).catch(error => console.log(error, "error ")
    );

  }

})

export default withMutation(connect(mapStateToProps,mapDispatchToProps)(Usuarios))