import { graphql } from 'react-apollo';
import { QUERY_GET_UNIDAD } from '../Queries/index'

import Unidad from '../Components/Tablas/Conjuntos';

const AptosWithData = graphql(QUERY_GET_UNIDAD)(Unidad);

export default AptosWithData;