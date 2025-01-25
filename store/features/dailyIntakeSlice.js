import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nutrients: {},
  lastUpdated: null, // To track last update timestamp
};

const dailyIntakeSlice = createSlice({
  name: "dailyIntake",
  initialState,
  reducers: {
    setNutrients(state, action) {
      const currentTime = Date.now();

      // If it's been more than 24 hours, reset the nutrients
      if (state.lastUpdated && currentTime - state.lastUpdated > 86400000) {
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

      // Update the timestamp
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
