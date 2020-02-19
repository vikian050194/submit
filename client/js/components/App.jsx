import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./../redux/configureStore";

import { throttle } from "lodash";

import Routes from "./Routes";

import { saveState, loadState } from "./localStorage";

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
                <Routes />
            </ConnectedRouter>
        </Provider>
    );
};

export default App;