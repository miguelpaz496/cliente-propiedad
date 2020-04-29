import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import {   allunidad } from './Actions/index'

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import Header from './Containers/Header';
import Sidebar from './Containers/Sidebar';
import MainContent from './Containers/MainContent';
import PageSignIn from './Containers/PageSignIn'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

function App( {authenticated} ) {

  const classes = useStyles();

  const pagina = (
    (authenticated) ?
      <Fragment>
        <CssBaseline />
        <Header/>
        <Sidebar/>
        <MainContent/> 
      </Fragment>
    : 
    <PageSignIn/>  
  )
  
  return (
      <Router history={useHistory}>
        <div className="App">
          <div className={classes.root}>
           {pagina}
          </div>
        </div>
      </Router>
  )
}

const mapStateToProps = state =>({
  authenticated: state.user.authenticated
})

const mapDispatchToProps = dispatch => ({

  inicio( unidades) {
      dispatch(allunidad(unidades))
      
  }

})


export default connect(mapStateToProps,mapDispatchToProps)(App);
