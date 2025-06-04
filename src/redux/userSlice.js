import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  users: JSON.parse(localStorage.getItem('users')) || [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find((u) => u.email === email && u.password === password);
      if (user) {
        state.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    }
  }
});

export const { registerUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
