import { configureStore } from "@reduxjs/toolkit";
import { chatReducers } from "./page/Home/slice";
import { name, reducer, rootSagaFetchSaga } from "snap-fetch";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    chat: chatReducers,
    [name]: reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSagaFetchSaga);
