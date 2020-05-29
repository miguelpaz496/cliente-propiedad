import { gql } from 'apollo-boost';

export const QUERY_GET_USERS = gql`
{
  users{
     data{
       id,
       name,
       last_name,
       email,
       dni,
       telefono,
       password,
       active,
       tipo{
         tipo_usuarios
         id
       }
     }
   }
 }
`;

export const QUERY_GET_UNIDAD = gql`
  {
    unidades{
      data{
        id
        nombre
        direccion
        telefono
        admin{
          name
        }
      }
    }
  }
`;

export const QUERY_GET_APTOS = gql`
{
  aptos {
    data {
      id
      nomenclatura
      unidad{
        nombre
      }
      bloque{
        nombre
      }
      tipoapto{
        tipo_apto
      }
      propietario{
        name
        last_name
      }
      arrendatario{
        name
        last_name
      }
    }
  }
}
`;



export const QUERY_CREATE_UNIDAD = gql`
mutation createUnidad($nombre: String, $direccion: String, $telefono: String, $id_admin: Int, $active: Boolean) {
     
  createUnidad(nombre: $nombre, direccion: $direccion, telefono: $telefono, admin_id: $id_admin, active: $active)
  {
    id
    nombre
    direccion
    telefono
    admin{
      name
    }
    active
  }
}
`;

export const QUERY_DELETE_UNIDAD = gql`
mutation deleteUnidad($id: ID!) {
     
  deleteUnidad(id: $id)
  {
    id
  }

}
`;


export const QUERY_DELETE_USER = gql`
mutation deleteUser($id: ID!) {
     
  deleteUser(id: $id)

}
`;