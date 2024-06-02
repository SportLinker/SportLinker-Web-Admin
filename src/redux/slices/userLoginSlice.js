import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const handleLogin = createAsyncThunk(
	'userLoginSlice/handleLogin',
	async ({phone, password}) => {
		console.log(phone, password);
		try {
			const data = await api.post(`/authen/login?type=phone`, {
				phone: phone,
				password: password,
			});
			return data.data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const userLoginSlice = createSlice({
	name: 'userLoginSlice',
	initialState: {
		userInfo: {
			userId: '',
			userPhone: '',
			name: '',
			email: '',
			password: '',
			bio: '',
			avatar_url: '',
			gender: '',
			date_of_birth: '',
			role: '',
			accessToken: '',
			refreshToken: '',
			last_active_time: null,
			status: '',
		},
	},
	reducers: {
		//handle save state internal
		setUser: (state, action) => {
			state.userInfo = action.payload;
			console.log('setUser', action.payload);
		},
		logout: (state, action) => {
			state.userInfo = action.payload;
			console.log('logout', action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(handleLogin.fulfilled, (state, action) => {
			state.userInfo = action.payload.metadata;

			localStorage.setItem('user', JSON.stringify(action.payload.metadata));
		});
	},
});

export default userLoginSlice;
