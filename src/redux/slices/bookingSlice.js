// bookingSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '../../services/api';

// Define an async thunk for fetching bookings
export const fetchBookings = createAsyncThunk(
	'events/fetchAll',
	async ({currentPage, pageSize}, {rejectWithValue}) => {
		try {
			const url = `/bookings/getByAdmin?page_size=${pageSize}&page_number=${currentPage}`;
			const response = await api.get(url);
			return response.data.metadata;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
// Create the bookings slice
export const bookingSlice = createSlice({
	name: 'bookingSlice',
	initialState: {
		bookings: [],
		loading: false,
		error: null,
	},
	reducers: {
		setBooking: (state, action) => {
			state.bookingInfo = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBookings.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchBookings.fulfilled, (state, action) => {
				state.loading = false;
				state.bookings = action.payload;
			})
			.addCase(fetchBookings.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

// Export the async thunk and reducer
export default bookingSlice.reducer;
