import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authUser: false,
    userData: null,
    userType: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload.authUser;
      state.userData = action.payload.userData;
      state.userType = action.payload.userType;
    },
    logout: (state) => {
      state.authUser = false;
      state.userData = null;
      state.userType = null;
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
      dispatch(setAuthUser({ authUser: true, userData: response.data ,userType: response.data.userType}));
    }
  } catch (error) {
    console.error('Error during authentication check', error);
    dispatch(setAuthUser({ authUser: false, userData: null , userType: null }));
  }
};

export default authSlice.reducer;
