import {createSlice} from '@reduxjs/toolkit';

const guestdata ={
  error: false,
  message: "Guest Login successful",
  access_token: "guest",
  refresh_token: "guest",
  userDetails: {
    _id: "guest",
    email: "xyz@chopper.com",
    name: "Guest User",
    createdAt: "not applicable"
  }
}


const initialState = {
  status: '',
  isLoading: true,
  isStart: null,
  token: null,
  user_id:null,
  refresh_token: null,
  loginRes: {},
  signupRes: {},
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    /*set onStart */
    setStart(state, action) {
      state.isLoading = false;
      state.isStart = action.payload;
      state.status = action.type;
    },
    /*set Token */
    setUserToken(state, action) {
      state.isLoading = false;
      state.isStart = '1';
      state.token = action.payload?.token;
      state.refresh_token = action.payload?.refresh_token;
      state.user_id = action.payload?.user_id;
      state.status = action.type;
    },

    /* Guest Login */
    guestLoginRequest(state, action) {
      state.status = action.type;
    },
    guestLoginSuccess(state, action) {
      state.loginRes = guestdata;
      state.status = action.type;
    },
    guestLoginFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Login */
    loginRequest(state, action) {
      state.status = action.type;
    },
    loginSuccess(state, action) {
      state.loginRes = action.payload.data;
      state.status = action.type;
    },
    loginFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

     /* Sign Up */
    signupRequest(state, action) {
      state.status = action.type;
      state.loginRes = {};
    },
    signupSuccess(state, action) {
      state.signupRes = action.payload?.data;
      state.status = action.type;
    },
    signupFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
    
    /* Logout */
    logoutRequest(state, action) {
      state.status = action.type;
    },
    logoutSuccess(state, action) {
      state.loginRes = action.payload;
      state.status = action.type;
    },
    logoutFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

  },
});

export const {
  
  /*set onStart */
  setStart,

  /*Set token */
  setUserToken,

  /* Login */
  loginRequest,
  loginSuccess,
  loginFailure,

  /* Guest Login */
  guestLoginRequest,
  guestLoginSuccess,
  guestLoginFailure,

  /* Sign Up */
  signupFailure,
  signupSuccess,
  signupRequest,

  /* Logout */
  logoutRequest,
  logoutSuccess,
  logoutFailure,

} = AuthSlice.actions;

export default AuthSlice.reducer;
