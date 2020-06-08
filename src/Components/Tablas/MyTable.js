import React from 'react';

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const MyTable = ({ data, header,funEliminar,funEditar, texto }) => {


    const row = (x, i, header) =>
        <TableRow key={`tr-${i}`}>
            {
                header.map((y, j) =>
                    <TableCell key={`tc-${j}`}>
                        {x[y.prop]}
                    </TableCell>
                )

            }
            <TableCell>
                <IconButton aria-label="delete" size="small" onClick={() => funEliminar(x.id, texto.con_eliminar)}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="delete" size="small"onClick={() => funEditar(x, texto.actualizar)}>
                    <EditIcon fontSize="small" />
                </IconButton>
            </TableCell>
        </TableRow>;


    return (

        <TableContainer>
            <Table className=".MuiTable-stickyHeader" size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {header.map((x, i) =>
                            <TableCell key={i}>
                                {x.name}
                            </TableCell>
                        )}
                        <TableCell>
                            ACCIONES
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((x, i) => row(x, i, header))

                    }
                </TableBody>
            </Table>
        </TableContainer>

    );


}

export default MyTable;