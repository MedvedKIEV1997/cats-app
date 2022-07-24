import { createSlice, configureStore } from "@reduxjs/toolkit";

const logsSlice = createSlice({
  name: "logs",
  initialState: {
    votesLog: [],
    favoritesLog: [],
  },
  reducers: {
    addLogToVotes: (state, { payload }) => {
      state.votesLog.unshift(payload);
    },
    addLogToFavorites: (state, { payload }) => {
      state.favoritesLog.unshift(payload);
    },
  },
});

export const { addLogToFavorites, addLogToVotes } = logsSlice.actions;

export const selectVotesLog = (state) => state.votesLog;
export const selectFavoritesLog = (state) => state.favoritesLog;

export const store = configureStore({
  reducer: logsSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
