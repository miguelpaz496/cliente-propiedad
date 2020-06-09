import {    
    GET_APTOS,
    ADD_APTO, 
  } from '../Actions';



const initialState = {    
    aptos: [],
    authenticated: true
}


export default function (state = initialState, action) {
    switch (action.type) {       
        
        case GET_APTOS:
            return state = {
                ...state,
                aptos: action.payload
            }
        case ADD_APTO:
                return state = {
                    ...state,
                    aptos: [...state.aptos, action.payload]
                }
        default:
            return state;
    }
}