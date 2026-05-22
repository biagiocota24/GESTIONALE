import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  modalAperta: string | null
  sidebar: boolean
}

const initialState: UiState = {
  modalAperta: null,
  sidebar: true,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    apriModal(state, action: PayloadAction<string>) {
      state.modalAperta = action.payload
    },
    chiudiModal(state) {
      state.modalAperta = null
    },
    toggleSidebar(state) {
      state.sidebar = !state.sidebar
    },
  },
})

export const { apriModal, chiudiModal, toggleSidebar } = uiSlice.actions

export default uiSlice.reducer
