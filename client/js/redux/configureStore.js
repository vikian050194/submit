import { applyMiddleware, compose, createStore } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import reduxImmutableStateInveriant from "redux-immutable-state-invariant";
import createRootReducer from "./reducers";
import initializeSagas from "./initializeSagas";

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        createRootReducer(history),
        initialState,
        composeEnhancers(
            applyMiddleware(
                reduxImmutableStateInveriant(),
                routerMiddleware(history),
                thunk,
                sagaMiddleware
            )
        )
    );

    initializeSagas(sagaMiddleware);

    return store;
}