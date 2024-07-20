import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const getAllDashboard = createAsyncThunk(
	'dashboards/getAllDashboard',
	async ({month, year}, {rejectWithValue}) => {
		try {
			const response = await api.get(`/dashboards?month=${month}&year=${year}`);
			return response.data.metadata;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const dashboardSlice = createSlice({
	name: 'dashboardSlice',
	initialState: {
		dashboards: null,
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			//add case for fetch data function example
			.addCase(getAllDashboard.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllDashboard.fulfilled, (state, action) => {
				state.loading = false;
				state.dashboards = action.payload;
			})
			.addCase(getAllDashboard.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
