import { createSlice } from '@reduxjs/toolkit';

// Utility to generate random 6 char string (3 letters, 3 numbers)
const generateId = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let lettersPart = '';
  let numbersPart = '';
  for (let i = 0; i < 3; i++) {
    lettersPart += letters.charAt(Math.floor(Math.random() * letters.length));
    numbersPart += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return lettersPart + numbersPart;
};

const historySlice = createSlice({
  name: 'history',
  initialState: {
    transactions: [],
  },
  reducers: {
    addTransaction: (state, action) => {
      const { items, total, orderType } = action.payload;
      const id = generateId();
      const date = new Date().toISOString();
      state.transactions.unshift({
        id,
        items,
        total,
        orderType,
        date,
      });
    },
  },
});

export const { addTransaction } = historySlice.actions;
export default historySlice.reducer;
