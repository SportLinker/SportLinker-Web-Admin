import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userSlice } from './slices/userSlice';
import userLoginSlice from './slices/userLoginSlice';
import { eventSlice } from './slices/eventSlice';
import { voucherSlice } from './slices/voucherSlice';
import { transactionSlice } from './slices/transactionSlice'; // Import transactionSlice
import { stadiumSlice } from './slices/stadiumSlice';
const rootPersistConfig = {
  key: 'root',
  storage,
  safelist: ['userSlice'], // Add 'transactionSlice' to persist
};

const rootReducer = combineReducers({
  userSlice: userSlice.reducer,
  userLoginSlice: userLoginSlice.reducer,
  eventSlice: eventSlice.reducer,
  voucherSlice: voucherSlice.reducer,
  transactionSlice: transactionSlice.reducer, 
  stadiumSlice: stadiumSlice.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export * from './selectors'; // Export selectors
