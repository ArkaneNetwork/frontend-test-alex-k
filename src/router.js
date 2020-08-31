import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import MainContainer from './containers';

// build the router
const AppRouter = () => (
    <Switch>
        <Route exact path="/" component={MainContainer} />
    </Switch>
);

export default AppRouter;