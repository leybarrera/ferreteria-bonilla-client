import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  info: {},
  users: [],
  employees: [],
  branches: [],
  jobOffers: [],
  postulations: [],
}

export const admninSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setInfoAdmin: (state, action) => {
      state.info = action.payload
    },
    setUsers: (state, action) => {
      state.users = action.payload
    },

    setEmployees: (state, action) => {
      state.employees = action.payload
    },

    setBranches: (state, action) => {
      state.branches = action.payload
    },

    setJobOffers: (state, action) => {
      state.jobOffers = action.payload
    },

    setPostulations: (state, action) => {
      state.postulations = action.payload
    },

    resetState: (state) => {
      state.users = []
      state.employees = []
      state.branches = []
      state.jobOffers = []
      state.postulations = []
    },

    setToken: (state, action) => {
      state.token = action.payload
    },
  },
})

export const {
  resetState,
  setInfoAdmin,
  setBranches,
  setEmployees,
  setJobOffers,
  setPostulations,
  setUsers,
  setToken,
} = admninSlice.actions

export default admninSlice.reducer
