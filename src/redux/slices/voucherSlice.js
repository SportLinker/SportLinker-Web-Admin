import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

// Fetch all vouchers
// Fetch all vouchers
export const fetchVouchers = createAsyncThunk(
	'vouchers/fetchAll',
	async ({pageSize, currentPage}, {rejectWithValue}) => {
	  try {
		const url = `/vouchers?page_size=${pageSize}&page_number=${currentPage}`;
		const response = await api.get(url);
		return response.data.metadata; // Ensure this returns an array of vouchers
	  } catch (error) {
		return rejectWithValue(error.response.data);
	  }
	}
  );
  

// Create voucher
export const createVoucher = createAsyncThunk(
  'vouchers/create',
  async (voucherData, {rejectWithValue}) => {
    try {
      const response = await api.post('/vouchers', voucherData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete voucher
export const deleteVoucher = createAsyncThunk(
  'vouchers/delete',
  async (voucherId, {rejectWithValue}) => {
    try {
      const response = await api.delete(`/vouchers/${voucherId}`);
      return {id: voucherId};
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const voucherSlice = createSlice({
	name: 'voucherSlice',
	initialState: {
	  vouchers: [], // This should be an array
	  loading: false,
	  error: null,
	},
	reducers: {
	  setVoucher: (state, action) => {
		state.voucherInfo = action.payload;
	  },
	},
	extraReducers: (builder) => {
	  builder
		// Fetch vouchers
		.addCase(fetchVouchers.pending, (state) => {
		  state.loading = true;
		})
		.addCase(fetchVouchers.fulfilled, (state, action) => {
		  state.loading = false;
		  state.vouchers = action.payload.vouchers || []; // Make sure to set an array
		})
		.addCase(fetchVouchers.rejected, (state, action) => {
		  state.loading = false;
		  state.error = action.payload;
		})
		// Create voucher
		.addCase(createVoucher.pending, (state) => {
		  state.loading = true;
		  state.error = null; // Clear previous error on pending
		})
		.addCase(createVoucher.fulfilled, (state, action) => {
		  state.loading = false;
		  state.vouchers.push(action.payload);
		  state.error = null; // Clear any previous error
		})
		.addCase(createVoucher.rejected, (state, action) => {
		  state.loading = false;
		  state.error = action.payload;
		  // Optionally handle error here if needed
		})
		// Delete voucher
		.addCase(deleteVoucher.pending, (state) => {
		  state.loading = true;
		})
		.addCase(deleteVoucher.fulfilled, (state, action) => {
		  state.loading = false;
		  state.vouchers = state.vouchers.filter(voucher => voucher.id !== action.payload.id);
		})
		.addCase(deleteVoucher.rejected, (state, action) => {
		  state.loading = false;
		  state.error = action.payload;
		});
	},
  });
  

export default voucherSlice.reducer;
