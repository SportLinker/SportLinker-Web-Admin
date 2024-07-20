import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api'; // Import your API module

// Fetch all vouchers
export const fetchVouchers = createAsyncThunk(
  'vouchers/fetchAll',
  async ({ pageSize, currentPage }, { rejectWithValue }) => {
    try {
      const url = `/vouchers?page_size=${pageSize}&page_number=${currentPage}`;
      const response = await api.get(url);
      return response.data.metadata; // Ensure this returns an array of vouchers
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch voucher details by ID
export const fetchVoucherDetails = createAsyncThunk(
  'vouchers/fetchDetails',
  async (voucherId, { rejectWithValue }) => {
    try {
      const url = `/vouchers/${voucherId}`;
      const response = await api.get(url);
      return response.data.metadata; // Ensure this returns detailed voucher info
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create voucher
export const createVoucher = createAsyncThunk(
  'vouchers/create',
  async (voucherData, { rejectWithValue }) => {
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
  async (voucherId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/vouchers/${voucherId}`);
      return { id: voucherId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const voucherSlice = createSlice({
  name: 'voucherSlice',
  initialState: {
    vouchers: [], // Array to store all vouchers
    loading: false, // Loading state
    error: null, // Error state
    voucherDetails: null, // State to hold voucher details
  },
  reducers: {
    // Additional reducers can be added here if needed
    setVoucher: (state, action) => {
      state.voucherInfo = action.payload;
    },
    setVoucherDetails: (state, action) => {
      state.voucherDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch vouchers
      .addCase(fetchVouchers.pending, (state) => {
        state.loading = true; // Set loading state to true while fetching
        state.error = null; // Clear previous error state
      })
      .addCase(fetchVouchers.fulfilled, (state, action) => {
        state.loading = false; // Set loading state to false after fetching
        state.vouchers = action.payload.vouchers || []; // Update vouchers array with fetched data
      })
      .addCase(fetchVouchers.rejected, (state, action) => {
        state.loading = false; // Set loading state to false on rejection
        state.error = action.payload; // Set error state with error payload
      })
      // Fetch voucher details
      .addCase(fetchVoucherDetails.pending, (state) => {
        state.loading = true; // Set loading state to true while fetching
        state.error = null; // Clear previous error state
      })
      .addCase(fetchVoucherDetails.fulfilled, (state, action) => {
        state.loading = false; // Set loading state to false after fetching
        state.voucherDetails = action.payload; // Update voucherDetails with fetched details
      })
      .addCase(fetchVoucherDetails.rejected, (state, action) => {
        state.loading = false; // Set loading state to false on rejection
        state.error = action.payload; // Set error state with error payload
      })
      // Create voucher
      .addCase(createVoucher.pending, (state) => {
        state.loading = true; // Set loading state to true while creating
        state.error = null; // Clear previous error state
      })
      .addCase(createVoucher.fulfilled, (state, action) => {
        state.loading = false; // Set loading state to false after creation
        state.vouchers.push(action.payload); // Add newly created voucher to vouchers array
      })
      .addCase(createVoucher.rejected, (state, action) => {
        state.loading = false; // Set loading state to false on rejection
        state.error = action.payload; // Set error state with error payload
      })
      // Delete voucher
      .addCase(deleteVoucher.pending, (state) => {
        state.loading = true; // Set loading state to true while deleting
        state.error = null; // Clear previous error state
      })
      .addCase(deleteVoucher.fulfilled, (state, action) => {
        state.loading = false; // Set loading state to false after deletion
        state.vouchers = state.vouchers.filter((voucher) => voucher.id !== action.payload.id); // Remove deleted voucher from vouchers array
      })
      .addCase(deleteVoucher.rejected, (state, action) => {
        state.loading = false; // Set loading state to false on rejection
        state.error = action.payload; // Set error state with error payload
      });
  },
});

export const { setVoucher, setVoucherDetails } = voucherSlice.actions;

export default voucherSlice.reducer;
