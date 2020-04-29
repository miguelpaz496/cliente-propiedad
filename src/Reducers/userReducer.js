import {
    GET_USER,
    GET_UNIDAD,
    GET_APTOS,
    AUTH_SIGNIN,
    AUTH_SIGNOUT
  } from '../Actions';



const initialState = {
    usuarios: [],
    conjuntos: [],
    aptos: [],
    authenticated: true
}


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return state = {
                ...state,
                usuarios: action.payload
            }
        case GET_UNIDAD:
            return state = {
                ...state,
                conjuntos: action.payload
            }
        case GET_APTOS:
            return state = {
                ...state,
                aptos: action.payload
            }
        case AUTH_SIGNIN:
            return state = { 
                ...state, 
                authenticated: true 
            };
        case AUTH_SIGNOUT:
            return state = 
                { ...state, 
                authenticated: false 
            }
        default:
            return state;
    }
}