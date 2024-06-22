//selectors.js

// users
export const getUserLoginSelector = (state) => state.userLoginSlice.userInfo;
export const getUserSelector = (state) => state.userSlice.userInfo;
export const getAllUserSelector = (state) => state.userSlice.users;
// events
export const getEventSelector = (state) => state.eventSlice?.eventInfo || {};
export const getAllEventSelector = (state) => state.eventSlice?.events || [];
//vouchers
export const getVoucherSelector = (state) => state.voucherSlice?.voucherInfo || {};
export const getAllVoucherSelector = (state) => state.voucherSlice?.vouchers || [];
