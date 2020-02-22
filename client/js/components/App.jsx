import React from "react";
import { Provider } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./../redux/configureStore";

import Join from "./Join.jsx";
import Game from "./game/Game.jsx";
import PageNotFound from "./PageNotFound";

const App = () => {
    const store = configureStore();

    console.info(`App is started at ${(new Date()).toLocaleString()}`);

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/join" />
                    </Route>
                    <Route path="/join" exact component={Join} />
                    <Route path="/game" exact component={Game} />
                    <Route component={PageNotFound} />
                </Switch>
            </ConnectedRouter>
        </Provider>
    );
};

export default App;