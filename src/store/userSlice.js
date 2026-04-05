import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    focusArea: null,
    gender: null,
  },
  reducers: {
    setFocusArea: (state, action) => {
      state.focusArea = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
  },
});

export const { setFocusArea, setGender } = userSlice.actions;
export default userSlice.reducer;
