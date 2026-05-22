import { configureStore } from '@reduxjs/toolkit'
import prenotazioniReducer from './slices/prenotazioniSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    prenotazioni: prenotazioniReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
