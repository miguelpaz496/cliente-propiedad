
export const fetchPosts = () => async (dispatch, getState, api) => {


    const landingPageAPI = 'http://localhost:4000/graphql';

    const _query = {
        query: `  {
            getUsers {
              id,
              name,
              job_title,
              email
            }
          }
        `
    };

    await api.post(landingPageAPI, _query).then(response => {
        dispatch({
            type: 'GET_USER',
            payload: response.data
        })
    }).catch((err) => {
        console.log('error', err);
    })
    
};
/*
export const mensaje = () => async (dispatch, getState, api) => {

    console.log("boton");

    return{
        type: 'SUMAR',
        numero: 1
    }

    const landingPageAPI = 'http://localhost:4000/graphql';

    const _query = {
        query: `  {
            getUsers {
              id,
              name,
              job_title,
              email
            }
          }
        `
    };
 

};   */

export function alluser(user) {
    return{
        type: 'GET_USER',
        payload: user
    }
}

export function allunidad(unidad) {
    return{
        type: 'GET_UNIDAD',
        payload: unidad
    }
}

export function sumarAction(num) {
    return{
        type: 'SUMAR',
        numero: num
    }
}