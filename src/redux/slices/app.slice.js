import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  branches: [],
  offers: [],
  postulations: [],
  messages: [],
  notifications: [],
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setBranches: (state, action) => {
      state.branches = action.payload
    },
    setOffers: (state, action) => {
      state.offers = action.payload
    },
    setPostulations: (state, action) => {
      state.postulations = action.payload
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload
    },
  },
})

export const {
  setBranches,
  setOffers,
  setPostulations,
  setMessages,
  setNotifications,
} = appSlice.actions

export default appSlice.reducer
