import { gql } from 'apollo-boost';

export const QUERY_GET_USERS = gql`
  {
    getUsers {
      id,
      name,
      last_name,
      email,
      dni,
      telefono,
      password,
      active,
      tipo_usuario
    }
  }
`;

export const QUERY_GET_UNIDAD = gql`
  {
    getUnidades {
      id,
      nombre
      direccion
      telefono
      id_admin
      active
    }
  }
`;

export const QUERY_GET_APTOS = gql`
  query {
    getAptos {
        id,
        nomenclatura
    }
  }
`;
