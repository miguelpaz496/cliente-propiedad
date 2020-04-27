import React from 'react';
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const Usuarios = ({user}) => {
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
            <TableCell>CONTRASEÑA</TableCell>
            <TableCell>ACTIVO</TableCell>
            <TableCell>TIPO USUARIO</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.usuarios.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.dni}</TableCell>
              <TableCell>{row.telefono}</TableCell>
              <TableCell>{row.password}</TableCell>
              <TableCell>{row.active}</TableCell>
              <TableCell>{row.tipo_usuario}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

const mapStateToProps = state =>({
  user: state.user
})

export default connect(mapStateToProps)(Usuarios)