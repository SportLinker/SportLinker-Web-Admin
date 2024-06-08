import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

// Fetch all events
export const fetchEvents = createAsyncThunk(
    'events/fetchAll',
    async ({ currentPage, pageSize, month, year }, { rejectWithValue }) => {
      try {
        const url = `/matches/admin/getAllMatch?page_size=${pageSize}&page_number=${currentPage}&month=${month}&year=${year}`;
        const response = await api.get(url);
        return response.data.metadata;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);


// Create event
export const createEvent = createAsyncThunk(
  'events/create',
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await api.post('/matches/admin/createMatch', eventData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update event
export const updateEvent = createAsyncThunk(
  'events/update',
  async ({ eventId, eventData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/matches/admin/updateMatch/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete event
export const deleteEvent = createAsyncThunk(
  'events/delete',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/matches/admin/deleteMatch/${eventId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const eventSlice = createSlice({
  name: 'eventSlice',
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {
    setEvent: (state, action) => {
      state.eventInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
