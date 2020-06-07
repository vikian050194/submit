import * as sagas from "./sagas";

const initializeSagas = (sagaMiddleware) => {
    Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};

export default initializeSagas;