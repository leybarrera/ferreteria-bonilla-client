import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  branches: [],
  filteredBranches: [],
  offers: [],
  filteredOffers: [],
  postulations: [],
  filteredPostulations: [],
  messages: [],
  notifications: [],
  filteredNotifications: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setBranches: (state, action) => {
      state.branches = action.payload;
      state.filteredBranches = action.payload;
    },
    setOffers: (state, action) => {
      state.offers = action.payload;
      state.filteredOffers = action.payload;
    },

    setFilteredOffers: (state, action) => {
      state.filteredOffers = action.payload;
    },
    setPostulations: (state, action) => {
      state.postulations = action.payload;
      state.filteredPostulations = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const {
  setBranches,
  setOffers,
  setFilteredOffers,
  setPostulations,
  setMessages,
  setNotifications,
} = appSlice.actions;

export default appSlice.reducer;
