import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ApartmentIcon from '@material-ui/icons/Apartment';
import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { signOut } from '../../Actions'


const mainListItems = ({authenticated, logout}) => {



  const salir = (e) => {
    e.preventDefault();
    logout();
  };

  const links = (

    (authenticated) ?
    <div>
      <ListItem  component={Link} to="/" button> 
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Inicio" />
      </ListItem>
      <ListItem component={Link} to="/usuarios" button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItem>
      <ListItem component={Link} to="/conjuntos" button>
        <ListItemIcon>
          <ApartmentIcon />
        </ListItemIcon>
        <ListItemText primary="Conjuntos" />
      </ListItem>
      <ListItem component={Link} to="/casa" button>
        <ListItemIcon>
          <HomeWorkIcon />
        </ListItemIcon>
        <ListItemText primary="Casas" />
      </ListItem>
      <ListItem component={Link}  to="/login" onClick = {salir}  button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Salir" />
      </ListItem>
    </div>
    :
    <div>
      <ListItem component={Link} to="/login" button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="login" />
      </ListItem>
    </div>
  )

  return links;
};

const mapStateToProps = state =>({
  authenticated: state.user.authenticated
})

const mapDispatchToProps = (dispatch) => ({
  logout() {
    dispatch(signOut());
  }
});


export default connect(mapStateToProps,mapDispatchToProps)(mainListItems);