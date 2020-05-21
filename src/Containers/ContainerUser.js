import { graphql } from 'react-apollo';
import { QUERY_GET_USERS } from '../Queries'

import Users from '../Components/Tablas/Users';

const AptosWithData = graphql(QUERY_GET_USERS)(Users);

export default AptosWithData;