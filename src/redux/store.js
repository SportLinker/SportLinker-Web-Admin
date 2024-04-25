import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {userSlice} from './slices/userSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';

const rootPersistConfig = {
	key: 'root',
	storage,
	safelist: ['userSlice'], // name of reducer which will be stored
};

const rootReducer = combineReducers({
	userSlice: userSlice.reducer,
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
