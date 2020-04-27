import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_USERS, GET_UNIDAD } from "./Queries";
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux'
import {  alluser, allunidad } from './Actions/index'

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, } from "react-router-dom";
import Header from './Containers/Header';
import Sidebar from './Containers/Sidebar';
import MainContent from './Containers/MainContent';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

function App( {inicio} ) {

  const classes = useStyles();

  const getAllUsers = useQuery(GET_USERS);
  const getAllUnidad = useQuery(GET_UNIDAD);
  if (getAllUsers.loading || getAllUnidad.loading) return <Spinner color="dark" />;
  if (getAllUsers.error || getAllUnidad.error) return <React.Fragment>Error :(</React.Fragment>;

  inicio(getAllUsers.data.getUsers, getAllUnidad.data.getUnidades)

  return (
      <Router>
        <div className="App">
          <div className={classes.root}>
            <CssBaseline />

            <Header/>

            <Sidebar/>
            <MainContent/>   

          </div>
        </div>
      </Router>
  )
}

const mapDispatchToProps = dispatch => ({

  inicio(usuarios, unidades) {
      
      dispatch(alluser(usuarios))
      dispatch(allunidad(unidades))
  }

})


export default connect(null,mapDispatchToProps)(App);
