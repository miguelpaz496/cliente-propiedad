export const GET_USER = 'GET_USER';
export const GET_UNIDAD = 'GET_UNIDAD';
export const GET_APTOS = 'GET_APTOS';
export const AUTH_SIGNIN = 'AUTH_SIGNIN';
export const AUTH_SIGNOUT = 'AUTH_SIGNOUT';

/* ejemplo de action
export const signIn = (token) => {
  localStorage.setItem('token', token);
  return { type: AUTH_SIGNIN };
};
*/

export function alluser(user) {
    return{
        type: GET_USER,
        payload: user
    }
}

export function allunidad(unidad) {
    return{
        type: GET_UNIDAD,
        payload: unidad
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
