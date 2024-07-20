import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

// Fetch all stadiums
export const fetchStadiums = createAsyncThunk(
    'stadiums/fetchAll',
    async ({ currentPage, pageSize }, { rejectWithValue }) => {
        try {
            const url = `/stadiums/getByAdmin?page_size=${pageSize}&page_number=${currentPage}`;
            const response = await api.get(url);
            return response.data.metadata;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Update stadium status
export const updateStadiumStatus = createAsyncThunk(
    'stadiums/updateStatus',
    async ({ stadiumId, status }, { rejectWithValue, getState }) => {
        try {
            const url = `/stadiums/${stadiumId}`;
            const response = await api.patch(url, { stadium_status: status });

            // Update the local state with the updated stadium
            const updatedStadium = response.data;
            const currentStadiums = getState().stadiumSlice.stadiums;
            const updatedStadiums = currentStadiums.map(stadium =>
                stadium.id === updatedStadium.id ? updatedStadium : stadium
            );

            return updatedStadiums;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const stadiumSlice = createSlice({
    name: 'stadiumSlice',
    initialState: {
        stadiums: [],
        loading: false,
        error: null,
    },
    reducers: {
        setStadium: (state, action) => {
            state.stadiumInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStadiums.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStadiums.fulfilled, (state, action) => {
                state.loading = false;
                state.stadiums = action.payload;
            })
            .addCase(fetchStadiums.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateStadiumStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateStadiumStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedStadium = action.payload;
                state.stadiums = state.stadiums.map(stadium =>
                    stadium.id === updatedStadium.id ? updatedStadium : stadium
                );
            })
            .addCase(updateStadiumStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setStadium } = stadiumSlice.actions;
export default stadiumSlice.reducer;
