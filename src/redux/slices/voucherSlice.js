import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

// Fetch all vouchers
export const fetchVouchers = createAsyncThunk(
	'vouchers/fetchAll',
	async ({pageSize, currentPage}, {rejectWithValue}) => {
		try {
			const url = `/vouchers?page_size=${pageSize}&page_number=${currentPage}`;
			const response = await api.get(url);
			return response.data.metadata.vouchers;
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
const handleModalSuccess = async () => {
    form.validateFields()
        .then(async (values) => {
            const formattedDate = moment(values.expired_at).format('YYYY-MM-DD');
            try {
                const response = await axios.post('http://localhost:5173/v1/api/vouchers', {
                    voucher_code: values.voucher_code,
                    voucher_name: values.voucher_name,
                    expired_at: formattedDate,
                    value: parseFloat(values.value),
                    to: values.to
                });

                message.success('Voucher created successfully');
                setModalVisible(false);
                form.resetFields();
                dispatch(fetchVouchers({ pageSize: 10, currentPage: 1 }));
            } catch (error) {
                console.error('Error creating voucher:', error);
                message.error('Failed to create voucher');
            }
        })
        .catch((error) => {
            console.error('Form validation error:', error);
        });
};

export const voucherSlice = createSlice({
	name: 'voucherSlice',
	initialState: {
		vouchers: [],
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
				state.vouchers = action.payload;
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
			});
	},
});

export default voucherSlice.reducer;
