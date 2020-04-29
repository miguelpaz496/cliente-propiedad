import { graphql } from 'react-apollo';
import { QUERY_GET_USERS } from '../Queries/index'

import Aptos from '../Components/Tablas/Users';

const AptosWithData = graphql(QUERY_GET_USERS)(Aptos);

export default AptosWithData;