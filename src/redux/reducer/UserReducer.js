import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  isLoading: false,
  user_id:null,
  user_details:{},
  user_playlist:{},
  error:'',
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    
    userInfoRequest: (state, action) => {
      state.status = action.type;
      state.isLoading = true;
    },
    userInfoSuccess: (state, action) => {
      state.user_details = action.payload?.userDetails;
      state.status = action.type;
      state.isLoading = false;
    },
    userInfoFailure: (state, action) => {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },
    userPlayListShowRequest: (state, action) => {
      state.status = action.type;
      state.isLoading = true;
    },
    userPlayListShowSuccess: (state, action) => {
      state.user_playlist = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },
    userPlayListShowFailure: (state, action) => {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },
    userPlayListAddRequest: (state, action) => {
      state.status = action.type;
      state.isLoading = true;
    },
    userPlayListAddSuccess: (state, action) => {
      state.status = action.type;
      state.user_playlist = action.payload;
      state.isLoading = false;
    },
    userPlayListAddFailure: (state, action) => {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },
    userPlayListDeleteRequest: (state, action) => {
      state.status = action.type;
      state.isLoading = true;
    },
    userPlayListDeleteSuccess: (state, action) => {
      state.status = action.type;
      state.user_playlist = action.payload;
      state.isLoading = false;
    },
    userPlayListDeleteFailure: (state, action) => {
      state.error = action.error;
      state.status = action.type;
      state.isLoading = false;
    },
  }, 
});

export const {
  userInfoRequest,
  userInfoSuccess,
  userInfoFailure,
  userPlayListShowRequest,
  userPlayListShowSuccess,
  userPlayListShowFailure,
  userPlayListAddRequest,
  userPlayListAddSuccess,
  userPlayListAddFailure,
  userPlayListDeleteRequest,
  userPlayListDeleteSuccess,
  userPlayListDeleteFailure
  
} = UserSlice.actions;

export default UserSlice.reducer;
