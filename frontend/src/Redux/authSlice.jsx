import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authUser: false,
    userData: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload.authUser;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.authUser = false;
      state.userData = null;
    },
  },
});

export const { setAuthUser, logout } = authSlice.actions;


export const checkAuth = () => async (dispatch) => {
  try {
    const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/check-auth`, {
      withCredentials: true,
    });
    if (response.ok) {
      dispatch(setAuthUser({ authUser: true, userData: response.data }));
    }
  } catch (error) {
    console.error('Error during authentication check', error);
    dispatch(setAuthUser({ authUser: false, userData: null }));
  }
};

export default authSlice.reducer;
