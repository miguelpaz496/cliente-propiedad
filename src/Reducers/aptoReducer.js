import {    
    GET_APTOS,
    
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
            
        default:
            return state;
    }
}