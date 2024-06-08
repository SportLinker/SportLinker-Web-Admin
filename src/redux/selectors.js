//get state out of the reducer
export const getUserLoginSelector = (state) => state.userLoginSlice.userInfo;
export const getUserSelector = (state) => state.userSlice.userInfo;
export const getAllUserSelector = (state) => state.userSlice.users;
// selectors.js
export const getEventSelector = (state) => state.eventSlice?.eventInfo || {};
export const getAllEventSelector = (state) => state.eventSlice?.events || [];
