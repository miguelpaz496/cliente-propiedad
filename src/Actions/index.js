
//import { QUERY_GET_UNIDAD } from '../Queries'
//import { useQuery } from '@apollo/react-hooks';

export const GET_USER = 'GET_USER';
export const GET_UNIDAD = 'GET_UNIDAD';
export const ADD_UNIDAD = 'ADD_UNIDAD';
export const UPDATE_UNIDAD = 'UPDATE_UNIDAD';
export const UPDATE_ALERT = 'UPDATE_ALERT';
export const DELETE_UNIDAD = 'DELETE_UNIDAD';
export const DELETE_USER = 'DELETE_USER';
export const GET_APTOS = 'GET_APTOS';
export const AUTH_SIGNIN = 'AUTH_SIGNIN';
export const AUTH_SIGNOUT = 'AUTH_SIGNOUT';



/* ejemplo de action
export const signIn = (token) => {
  localStorage.setItem('token', token);
  return { type: AUTH_SIGNIN };
};
*/



export function alluser(users) {

    return{
        type: GET_USER,
        payload: users
    }
}

export function allunidad(unidad) {
    return{
        type: GET_UNIDAD,
        payload: unidad
    }
}

export function addunidad(data) {

    return{
        type: ADD_UNIDAD,
        payload: data
    }
}


export function updateunidad(data) {

    return{
        type: UPDATE_UNIDAD,
        payload: data
    }
}

export function updatealert(data) {

    return{
        type: UPDATE_ALERT,
        payload: data
    }
}

export function delunidad(id) {
    
        return{
            type: DELETE_UNIDAD,
            payload: id
        }
}

export function delusuario(id) {
    
    return{
        type: DELETE_USER,
        payload: id
    }
}

export function allaptos(aptos) {
    return {
        type: GET_APTOS,
        payload: aptos
    }
}

export function signOut() {
    return {
        type: AUTH_SIGNOUT,
    }
}
