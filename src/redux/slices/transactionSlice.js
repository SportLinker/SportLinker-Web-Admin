import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

// Fetch all transactions
export const fetchTransactions = createAsyncThunk(
    'transactions/fetchAll',
    async ({ currentPage, pageSize}, { rejectWithValue }) => {
      try {
        const url = `/transactions?page_size=${pageSize}&page_number=${currentPage}`;
        const response = await api.get(url);
        return response.data.metadata;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

export const transactionSlice = createSlice({
  name: 'transactionSlice',
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {
    setTransaction: (state, action) => {
      state.transactionInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});
