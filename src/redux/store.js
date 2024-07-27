import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {dashboardSlice} from './slices/dashboardSlice';
import {eventSlice} from './slices/eventSlice';
import {transactionSlice} from './slices/transactionSlice'; // Import transactionSlice
import userLoginSlice from './slices/userLoginSlice';
import {voucherSlice} from './slices/voucherSlice';
import {stadiumSlice} from './slices/stadiumSlice';
import {bookingSlice} from './slices/bookingSlice';

import {userSlice} from './slices/userSlice';

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
	bookingSlice: bookingSlice.reducer,
	dashboardSlice: dashboardSlice.reducer,
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
