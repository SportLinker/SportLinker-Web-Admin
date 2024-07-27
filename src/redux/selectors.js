//selectors.js
import {createSelector} from 'reselect';
// users
export const getUserLoginSelector = (state) => state.userLoginSlice.userInfo;
export const getUserSelector = (state) => state.userSlice.userInfo;
export const getAllUserSelector = (state) => state.userSlice.users;
export const getLoadingUserSelector = (state) => state.userSlice.loading;

// events
export const getEventSelector = (state) => state.eventSlice?.eventInfo || {};
export const getAllEventSelector = (state) => state.eventSlice?.events || [];
export const getLoadingEventSelector = (state) => state.eventSlice.loading;
//vouchers
export const getVoucherSelector = (state) => state.voucherSlice?.voucherInfo || {};
export const getAllVoucherSelector = (state) => state.voucherSlice?.vouchers || [];
export const getLoadingVoucherSelector = (state) => state.voucherSlice.loading;
const getVoucherDetails = (state) => state.voucherSlice.voucherDetails;
export const getVoucherDetailsSelector = createSelector(
	[getVoucherDetails],
	(voucherDetails) => voucherDetails
);

// transactions
export const getTransactionSelector = (state) => state.transactionSlice?.transactionInfo || {};
export const getAllTransactionsSelector = (state) => state.transactionSlice?.transactions || [];
export const getLoadingTransactionSelector = (state) => state.transactionSlice.loading;
// stadiums
export const getStadiumSelector = (state) => state.stadiumSlice?.stadiumInfo || {};
export const getAllStadiumSelector = (state) => state.stadiumSlice?.stadiums || [];
export const getLoadingStadiumSelector = (state) => state.stadiumSlice.loading;
// bookings
export const getBookingSelector = (state) => state.bookingSlice?.bookingInfo || {};
export const getAllBookingSelector = (state) => state.bookingSlice?.bookings || [];
export const getLoadingBookingSelector = (state) => state.bookingSlice.loading;
// dashboard
export const getAllDashboardSelector = (state) => state.dashboardSlice.dashboards;
export const getLoadingDashboardSelector = (state) => state.dashboardSlice.loading;
