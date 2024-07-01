import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

// Fetch all transactions
export const fetchTransactions = createAsyncThunk(
    'transactions/fetchAll',
    async ({ currentPage, pageSize }, { rejectWithValue }) => {
        try {
            const url = `/transactions?page_size=${pageSize}&page_number=${currentPage}`;
            const response = await api.get(url);
            return response.data.metadata;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Update transaction status
export const updateTransactionStatus = createAsyncThunk(
    'transactions/updateStatus',
    async ({ transactionId, status, rejectedReason }, { rejectWithValue }) => {
        try {
            const url = `transactions/${transactionId}`;
            const response = await api.put(url, { status, rejected_reason: rejectedReason });
            return response.data;
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
            .addCase(updateTransactionStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTransactionStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedTransaction = action.payload;
                state.transactions = state.transactions.map(transaction =>
                    transaction.id === updatedTransaction.id ? updatedTransaction : transaction
                );
            })
            .addCase(updateTransactionStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
