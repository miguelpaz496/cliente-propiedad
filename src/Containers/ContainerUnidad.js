import { graphql } from 'react-apollo';
import { QUERY_GET_UNIDAD } from '../Queries/index'

import Unidades from '../Components/Tablas/Conjuntos';

const AptosWithData = graphql(QUERY_GET_UNIDAD)(Unidades);

export default AptosWithData;