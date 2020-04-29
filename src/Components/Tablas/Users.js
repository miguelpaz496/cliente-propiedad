import React from 'react';
import { connect } from 'react-redux'
import { alluser } from '../../Actions'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const Usuarios = ({data, inicio}) => {

  const Users = data.getUsers;

  if(Users){
    inicio(Users)
  }

  if (!Users) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Loading</h1>
          </div>
        </div>
      </div>
    );
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
            <TableCell>ACTIVO</TableCell>
            <TableCell>TIPO USUARIO</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Users.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.dni}</TableCell>
              <TableCell>{row.telefono}</TableCell>
              <TableCell>{row.active}</TableCell>
              <TableCell>{row.tipo_usuario}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

/*
const mapStateToProps = state =>({
  user: state.user
})
*/

const mapDispatchToProps = dispatch => ({

  inicio(user) {
      
      dispatch(alluser(user))

  }

})

export default connect(null,mapDispatchToProps)(Usuarios)