import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex((i) => i.id === action.payload.id);
      if (itemIndex >= 0) {
        if(state.items[itemIndex].quantity < 100) {
          state.items[itemIndex].quantity += 1;
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1, note: '', selected: true });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload.id);
    },
    increaseQuantity: (state, action) => {
      const itemIndex = state.items.findIndex((i) => i.id === action.payload.id);
      if (itemIndex >= 0 && state.items[itemIndex].quantity < 100) {
        state.items[itemIndex].quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.items.findIndex((i) => i.id === action.payload.id);
      if (itemIndex >= 0) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateItemNote: (state, action) => {
      const itemIndex = state.items.findIndex((i) => i.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].note = action.payload.note;
      }
    },
    toggleSelectItem: (state, action) => {
      const itemIndex = state.items.findIndex((i) => i.id === action.payload);
      if (itemIndex >= 0) {
        state.items[itemIndex].selected = !state.items[itemIndex].selected;
      }
    },
    toggleSelectAll: (state, action) => {
      state.items.forEach(item => {
        item.selected = action.payload;
      });
    },
    checkoutSelectedItems: (state) => {
      state.items = state.items.filter(item => !item.selected);
    },
    setQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex((i) => i.id === id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, updateItemNote, toggleSelectItem, toggleSelectAll, checkoutSelectedItems, setQuantity } = cartSlice.actions;
export default cartSlice.reducer;
