import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { throttle } from "lodash";

import configureStore, { history } from "./../redux/configureStore";

import Game from "./game/Game.jsx";
import PageNotFound from "./PageNotFound";

import { saveState, loadState } from "../utils/localStorage";

import "./App.css";

const App = () => {
    const persistedState = loadState();
    const store = configureStore(persistedState);

    store.subscribe(throttle(() => {
        const { user } = store.getState();
        saveState({ user });
    }, 1000));

    console.info(`App is started at ${(new Date()).toLocaleString()}`);

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/" exact={true} component={Game} />
                    <Route component={PageNotFound} />
                </Switch>
            </ConnectedRouter>
        </Provider>
    );
};

export default App;