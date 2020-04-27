const initialState = {
    usuarios: [],
    conjuntos: [],
    contador: 2,
}


export default function(state = initialState, action){
    switch(action.type){
        case 'GET_USER': 
            return  state = {
                ...state,
                usuarios: action.payload
            }
        case "SUMAR":
            return state = {
                ...state,
                contador: state.contador + action.numero
            }
        case "GET_UNIDAD":
            return state = {
                ...state,
                conjuntos: action.payload
            }
        case 'CLEAR_POST_DATA':
            return null
        default:
            return state;
    }
}