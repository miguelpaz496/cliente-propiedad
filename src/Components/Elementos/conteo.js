import React from 'react'
import { connect } from 'react-redux'
import {  sumarAction } from '../../Actions/index'

const contador = ({user, sumar}) => (
    
    <div>
    <h4>{user.contador}</h4>
    <button onClick={() => sumar(1)}>Sumar</button>
</div>
)


const mapStateToProps = state =>({
    user: state.user
})


const mapDispatchToProps = dispatch => ({

    sumar(num) {
        
        dispatch(sumarAction(num))
    }
})


export default connect(mapStateToProps,mapDispatchToProps)(contador)