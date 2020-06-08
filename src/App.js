import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { allunidad, updatealert } from './Actions'

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router } from "react-router-dom";
import Header from './Containers/Header';
import Sidebar from './Containers/Sidebar';
import MainContent from './Containers/MainContent';
import PageSignIn from './Containers/PageSignIn'
import MyAlert from './Components/Alerts/MyAlert'


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

const App =  ( {authenticated, alert, close} ) => {

  const classes = useStyles();

  const handleClose = () =>{

    const new_alert = {
        open_alert:false,
        mensaje: alert.mensaje,
        tipo: alert.tipo
    }
    
    close(new_alert)

  }

  const pagina = (
    (authenticated) ?
      <Fragment>
        <CssBaseline />
        <Header/>
        <Sidebar/>
        <MainContent/> 
        <MyAlert alert={alert} handleClose={handleClose}/>
      </Fragment>


    : 
    <PageSignIn/>  
  )
  
  return (
      <Router>
        <div className="App">
          <div className={classes.root}>
           {pagina}
          </div>
        </div>
      </Router>
  )
}

const mapStateToProps = state =>({
  authenticated: state.user.authenticated,
  alert: state.user.alert
})

const mapDispatchToProps = dispatch => ({

  inicio( unidades) {
      dispatch(allunidad(unidades))
      
  },

  close( alert) {
    dispatch(updatealert(alert))
    
  }

})


export default connect(mapStateToProps,mapDispatchToProps)(App);
