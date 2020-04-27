import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, } from "react-router-dom";
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import {Provider} from 'react-redux'
import store from '../Store'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));


function App() {
  const classes = useStyles();
  return (
    <Router>
      <Provider store={store}  >
      <div className="App">
        <div className={classes.root}>
          <CssBaseline />

          <Header/>

          <Sidebar/>
          <MainContent/>   

        </div>
      </div>
      </Provider>
    </Router>
  );
}

export default App;
