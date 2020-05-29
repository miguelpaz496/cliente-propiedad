import { graphql } from 'react-apollo';
import { QUERY_GET_UNIDAD } from '../Queries/index'

import Unidades from '../Components/Tablas/Conjuntos';

const UnidadesWithData = graphql(QUERY_GET_UNIDAD)(Unidades);

export default UnidadesWithData;