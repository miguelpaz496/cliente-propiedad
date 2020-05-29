import React from 'react';
import { connect } from 'react-redux'
import { allaptos } from '../../Actions'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


//import { graphql } from 'react-apollo';



export class Aptos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {datos: false};
  }

  componentDidUpdate() {
    //console.log(this.props.data.aptos.data)
    if (this.props.data.aptos.data !== this.props.apto.aptos && !this.state.datos){ // 1. datos de la consulta 2. usuarios del reducer 
      this.props.inicio(this.props.data.aptos.data)                                // 3. datos del state local del componente
      this.setState({datos: true})
    }

  }


  render() {

    const { apto } = this.props;

    var aptos_componente = []

    if (apto.aptos){
      aptos_componente = apto.aptos // variable local del componente = variable del store
    }

    return (
      <React.Fragment>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NOMENCLATURA</TableCell>
              <TableCell>UNIDAD</TableCell>
              <TableCell>BLOQUE</TableCell>
              <TableCell>TIPO APARTAMENTO</TableCell>
              <TableCell>PROPIETARIO</TableCell>
              <TableCell>ARRENDATARIO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aptos_componente.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nomenclatura}</TableCell>
                <TableCell>{row.unidad.nombre}</TableCell>
                <TableCell>{row.bloque.nombre}</TableCell>
                <TableCell>{row.tipoapto.tipo_apto}</TableCell>
                <TableCell>{row.propietario.name} {row.propietario.last_name}</TableCell>
                <TableCell>{row.arrendatario.name} {row.arrendatario.last_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );

  }

}

/* 
const withMutation = graphql(QUERY_UPDATE_APTO, {
  props: ({ mutate }) => ({
  updateApto: input => mutate({
      variables: { id: input.id,
      },
    }),
  }),
}); */



const mapStateToProps = state =>({
  apto: state.apto
})


const mapDispatchToProps = (dispatch, ownProps) => ({

  inicio(aptos) {
      
      dispatch(allaptos(aptos))

  },  

})

export default connect(mapStateToProps,mapDispatchToProps)(Aptos)