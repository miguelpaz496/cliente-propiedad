import { graphql } from 'react-apollo';
import { QUERY_GET_APTOS } from '../Queries/index'

import Aptos from '../Components/Tablas/Aptos';

const AptosWithData = graphql(QUERY_GET_APTOS)(Aptos);

export default AptosWithData;