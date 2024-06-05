import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api, api_mockoi} from '../../services/api';

//fetch data function example
export const fetchUsers = createAsyncThunk('users/fetchAll', async (_, {rejectWithValue}) => {
	try {
		const data = await fetchAllUsers();
		return data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

const fetchAllUsers = async () => {
	const response = await api.get('/users');
	return response.data;
};

export const userSlice = createSlice({
	name: 'userSlice',
	initialState: {
		userInfo: {
			fullName: '',
			role: '',
			status: '',
			gender: '',
			email: '',
			phone: '',
			userId: '',
		},
		users: null,
		loading: false,
		error: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.userInfo = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			//add case for fetch data function example
			.addCase(fetchUsers.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
