import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nutrients: {},
  lastUpdated: null, // To track last update timestamp
  dailyIntakeHistory: [], // New array to store history of nutrients
};

const dailyIntakeSlice = createSlice({
  name: "dailyIntake",
  initialState,
  reducers: {
    setNutrients(state, action) {
      const currentTime = Date.now();

      // If it's been more than 24 hours, save current day's nutrients to history
      if (state.lastUpdated && currentTime - state.lastUpdated > 86400000) {
        // Store today's data in the history
        const currentDayData = {
          date: new Date(state.lastUpdated).toLocaleDateString(),
          nutrients: { ...state.nutrients },
        };
        state.dailyIntakeHistory.push(currentDayData);

        // Reset the nutrients for the new day
        state.nutrients = {};
      }

      // Add new nutrients to the existing ones or create new if they don't exist
      const newNutrients = action.payload;

      Object.entries(newNutrients).forEach(([key, value]) => {
        if (state.nutrients[key]) {
          state.nutrients[key] += value; // Add to existing
        } else {
          state.nutrients[key] = value; // Create new
        }
      });

      // Update the timestamp for the current day
      state.lastUpdated = currentTime;
    },
    resetNutrients(state) {
      state.nutrients = {};
      state.lastUpdated = null;
    },
  },
});

export const { setNutrients, resetNutrients } = dailyIntakeSlice.actions;

export default dailyIntakeSlice.reducer;
