//selectors.js

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

// transactions
export const getTransactionSelector = (state) => state.transactionSlice?.transactionInfo || {};
export const getAllTransactionsSelector = (state) => state.transactionSlice?.transactions || [];
export const getLoadingTransactionSelector = (state) => state.transactionSlice.loading;
// stadiums
export const getStadiumSelector = (state) => state.stadiumSlice?.stadiumInfo || {};
export const getAllStadiumSelector = (state) => state.stadiumSlice?.stadiums || [];
export const getLoadingStadiumSelector = (state) => state.stadiumSlice.loading;