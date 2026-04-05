import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    focusArea: null,
    gender: null,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  reducers: {
    setFocusArea: (state, action) => {
      state.focusArea = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const { setFocusArea, setGender, setAvatar } = userSlice.actions;
export default userSlice.reducer;
