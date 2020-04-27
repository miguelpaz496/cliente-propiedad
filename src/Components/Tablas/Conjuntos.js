import React from 'react';
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Conjuntos = ({user}) => {
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
            <TableCell>ACTIVO</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.conjuntos.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.direccion}</TableCell>
              <TableCell>{row.telefono}</TableCell>
              <TableCell>{row.id_admin}</TableCell>
              <TableCell>{row.active}</TableCell>
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

export default connect(mapStateToProps)(Conjuntos)