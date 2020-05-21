import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router';
import ContainerUser from '../Containers/ContainerUser';
import ContainerUnidad from '../Containers/ContainerUnidad';
import Aptos from './ContainerAptos';
import SignIn from '../Components/Forms/SignIn'
import MyDialog from './MyDialog'

const useStyles = makeStyles((theme) => ({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(1),
    },
}));

export default function MainContent() {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
                <Route path="/usuarios">
                    <ContainerUser/>
                </Route>
                <Route path="/conjuntos">
                    <MyDialog tipo="Crear Unidad"/>
                    <ContainerUnidad />
                    
                </Route>
                <Route path="/casa">
                    <Aptos/>
                </Route>
                <Route path="/salir">
                    <h2>login</h2>
                </Route>
                <Route path="/login">
                    <SignIn/>
                </Route>
                <Route path="/">
                    <h2>dasboard</h2>
                </Route>
            </Switch>
        </main>
    );
}

MainContent.propTypes = {
    children: PropTypes.node,
};