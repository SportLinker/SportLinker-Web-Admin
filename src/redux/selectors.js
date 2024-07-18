//selectors.js

// users
export const getUserLoginSelector = (state) => state.userLoginSlice.userInfo;
export const getUserSelector = (state) => state.userSlice.userInfo;
export const getAllUserSelector = (state) => state.userSlice.users;
export const getLoadingUserSelector = (state) => state.userSlice.loading;

// events
export const getEventSelector = (state) => state.eventSlice?.eventInfo || {};
export const getAllEventSelector = (state) => state.eventSlice?.events || [];
//vouchers
export const getVoucherSelector = (state) => state.voucherSlice?.voucherInfo || {};
export const getAllVoucherSelector = (state) => state.voucherSlice?.vouchers || [];
// transactions
export const getTransactionSelector = (state) => state.transactionSlice?.transactionInfo || {};
export const getAllTransactionsSelector = (state) => state.transactionSlice?.transactions || [];

// dashboard
export const getAllDashboardSelector = (state) => state.dashboardSlice.dashboards;
