import React from "react";
import { Provider } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./../redux/configureStore";

import SignIn from "./menu/SignIn.jsx";
import SignUp from "./menu/SignUp.jsx";
import Menu from "./menu/Menu.jsx";
import Rooms from "./menu/Rooms.jsx";
import Settings from "./menu/Settings.jsx";
import Game from "./game/Game.jsx";
import PageNotFound from "./404/PageNotFound";

const App = () => {
    const store = configureStore();

    console.info(`App is started at ${(new Date()).toLocaleString()}`);

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/signin" />
                    </Route>
                    <Route path="/signin" exact component={SignIn} />
                    <Route path="/signup" exact component={SignUp} />
                    <Route path="/menu" exact component={Menu} />
                    <Route path="/rooms" exact component={Rooms} />
                    <Route path="/rooms/:id" exact component={Game} />
                    <Route path="/settings" exact component={Settings} />
                    <Route component={PageNotFound} />
                </Switch>
            </ConnectedRouter>
        </Provider>
    );
};

export default App;