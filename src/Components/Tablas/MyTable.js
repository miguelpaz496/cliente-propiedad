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


    const row = (objeto, i, header) =>
        <TableRow key={`tr-${i}`}>
            {
                header.map((titulo, j) =>
                    <TableCell key={`tc-${j}`}>
                        {objeto[titulo.prop] ? objeto[titulo.prop] : getValueProp(objeto, titulo.prop)}
                    </TableCell>
                )

            }
            <TableCell>
                <IconButton aria-label="delete" size="small" onClick={() => funEliminar(objeto.id, texto.con_eliminar)}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="delete" size="small"onClick={() => funEditar(objeto, texto.actualizar)}>
                    <EditIcon fontSize="small" />
                </IconButton>
            </TableCell>
        </TableRow>;

    const getValueProp = (objecto, name ) =>{

        var valores = name.split(".")
        var respuesta = objecto

        valores.forEach(valor => {
            respuesta = respuesta[valor]
        });

        return respuesta
    }    

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