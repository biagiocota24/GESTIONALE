import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reservationsReducer from "../reducers/reservationsReducer";
import guestsReducer from "../reducers/guestsReducer";
import roomsReducer from "../reducers/roomsReducer";

const rootReducer = combineReducers({
  reservations: reservationsReducer,
  guests: guestsReducer,
  rooms:roomsReducer
});

const loadState = () => {
  try {
    const saved = localStorage.getItem("reduxState");
    return saved ? JSON.parse(saved) : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem("reduxState", JSON.stringify(state));
  } catch (error) {
    console.warn("impossibile salvare lo stato", error);
  }
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
});

store.subscribe(() => saveState(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
