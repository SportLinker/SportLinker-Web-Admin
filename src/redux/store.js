import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {userSlice} from './slices/userSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import userLoginSlice from './slices/userLoginSlice';
import {eventSlice} from './slices/eventSlice';
import {voucherSlice} from './slices/voucherSlice';

const rootPersistConfig = {
	key: 'root',
	storage,
	safelist: ['userSlice'], // name of reducer which will be stored
};

const rootReducer = combineReducers({
	userSlice: userSlice.reducer,
	userLoginSlice: userLoginSlice.reducer,
	eventSlice: eventSlice.reducer,
	voucherSlice: voucherSlice.reducer,
	//add more reducer here
	//...
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
