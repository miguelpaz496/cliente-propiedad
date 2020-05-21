import {
    GET_USER,
    GET_UNIDAD,
    ADD_UNIDAD,
    DELETE_UNIDAD,
    DELETE_USER,
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
        case ADD_UNIDAD:
            return state = {
                ...state,
                conjuntos: [...state.conjuntos, action.payload]
            }
        case DELETE_UNIDAD:
            //items: state.conjuntos.filter((item, index) => item.id !== action.payload)
            return state = {
                ...state,
                conjuntos: state.conjuntos.filter((item, index) => item.id !== action.payload)
            }
        case DELETE_USER:
            return state = {
                ...state,
                usuarios: state.usuarios.filter((item, index) => item.id !== action.payload)
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