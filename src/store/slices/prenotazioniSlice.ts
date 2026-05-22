import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Prenotazione {
  id: string
  nome: string
  data: string
  ora: string
  persone: number
  note?: string
  stato: 'confermata' | 'in_attesa' | 'annullata'
}

interface PrenotazioniState {
  lista: Prenotazione[]
  selezionata: Prenotazione | null
  loading: boolean
  error: string | null
}

const initialState: PrenotazioniState = {
  lista: [],
  selezionata: null,
  loading: false,
  error: null,
}

const prenotazioniSlice = createSlice({
  name: 'prenotazioni',
  initialState,
  reducers: {
    aggiungi(state, action: PayloadAction<Prenotazione>) {
      state.lista.push(action.payload)
    },
    rimuovi(state, action: PayloadAction<string>) {
      state.lista = state.lista.filter(p => p.id !== action.payload)
    },
    aggiorna(state, action: PayloadAction<Prenotazione>) {
      const index = state.lista.findIndex(p => p.id === action.payload.id)
      if (index !== -1) state.lista[index] = action.payload
    },
    seleziona(state, action: PayloadAction<Prenotazione | null>) {
      state.selezionata = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
  },
})

export const {
  aggiungi,
  rimuovi,
  aggiorna,
  seleziona,
  setLoading,
  setError,
} = prenotazioniSlice.actions

export default prenotazioniSlice.reducer
