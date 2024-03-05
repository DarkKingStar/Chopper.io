import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  isLoading: true,
  user_id:null,
  user_details:{},
  error:'',
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    
    userInfoRequest: (state, action) => {
      state.status = action.type;
    },
    userInfoSuccess: (state, action) => {
      state.user_details = action.payload;
      state.status = action.type;
    },
    userInfoFailure: (state, action) => {
      state.error = action.error;
      state.status = action.type;
    }
  }, 
});

export const {
  userInfoRequest,
  userInfoSuccess,
  userInfoFailure
  
} = UserSlice.actions;

export default UserSlice.reducer;
