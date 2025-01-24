import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For React Native
import userDataReducer from './features/userDataSlice'; // Your user reducer
import userAuthReducer from './features/userAuthSlice'; // Your user reducer
import userDietReduceer from './features/userDietSlice'

// Configure persistence
const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Use AsyncStorage to persist state in React Native
};

const rootReducer = combineReducers({
    userData: userDataReducer,
    auth : userAuthReducer , 
    diet : userDietReduceer

})

// Wrap your reducer with `persistReducer`
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
const store = configureStore({
  reducer: {
    user : persistedReducer, // Use persisted reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

// Create a persistor for the store
export const persistor = persistStore(store);

export default store;
