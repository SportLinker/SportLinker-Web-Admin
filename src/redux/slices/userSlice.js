import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

//fetch data function example
export const fetchUsers = createAsyncThunk(
	'users/fetchAll',
	async ({currentPage, pageSize}, {rejectWithValue}) => {
		try {
			let url = `/users?page_size=${pageSize}&page_number=${currentPage}`;
			const response = await api.get(url);
			return response.data.metadata;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
// Create user async thunk
export const createUser = createAsyncThunk(
    'users/create',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post('/users', userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Update user async thunk
export const updateUser = createAsyncThunk(
    'users/update',
    async ({ userId, userData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/users/${userId}`, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Delete user async thunk
export const deleteUser = createAsyncThunk(
    'users/delete',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/users/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const userSlice = createSlice({
	name: 'userSlice',
	initialState: {
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
				state.loading = true;
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = true;
                // Update state as needed after creating user
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = true;
                // Update state as needed after updating user
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = true;
                // Update state as needed after deleting user
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
	},
});
