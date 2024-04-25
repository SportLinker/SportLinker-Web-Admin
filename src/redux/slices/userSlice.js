import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//fetch data function example
// export const fetchUsers = createAsyncThunk(
// 	'users/fetchAll',
// 	async ({currentPage, searchName, searchRole}, {rejectWithValue}) => {
// 		try {
// 			const data = await fetchAllUsers(currentPage, searchName, searchRole);
// 			return data;
// 		} catch (error) {
// 			return rejectWithValue(error.response.data);
// 		}
// 	}
// );

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userInfo: {
      fullName: "",
      role: "admin",
      status: "",
      gender: "",
      email: "",
      phone: "",
      userId: "",
    },
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder
    //add case for fetch data function example
    // 	.addCase(fetchUsers.pending, (state) => {
    // 		state.loading = true;
    // 	})
    // 	.addCase(fetchUsers.fulfilled, (state, action) => {
    // 		state.loading = false;
    // 		state.users = action.payload;
    // 	})
    // 	.addCase(fetchUsers.rejected, (state, action) => {
    // 		state.loading = false;
    // 		state.error = action.payload;
    // 	})
  },
});
