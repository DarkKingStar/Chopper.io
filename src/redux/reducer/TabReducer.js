import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  isLoading: true,
  error:'',
  currentEpisodeList: {},
  currentEpisodeNumber:null,
  currentEpisoodeDetails:{},
  isTabOpen: false,
};

const UserSlice = createSlice({
  name: 'Tab',
  initialState,
  reducers: {
    getCurrentEpisodeListRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    getCurrentEpisodeListSuccess(state, action) {
      state.currentEpisodeList = action.payload;
      state.status = action.type;
      state.isLoading = false;
    },
    getCurrentEpisodeListFailure(state, action) {
      state.status = action.type;
      state.isLoading = false;
    },
    getCurrentEpisoodeDetailsRequest(state, action) {
      state.status = action.type;
      state.isLoading = true;
    },
    getCurrentEpisoodeDetailsSuccess(state, action) {
      state.currentEpisoodeDetails = action.payload;
      state.currentEpisodeNumber = action.payload?.number;
      state.status = action.type;
      state.isLoading = false;
    },
    getCurrentEpisoodeDetailsFailure(state, action) {
      state.status = action.type;
      state.isLoading = false;
    },
    setTabOpen(state, action) {
      state.isTabOpen = action.payload;
    },
  },
});

export const {
  getCurrentEpisodeListRequest,
  getCurrentEpisodeListSuccess,
  getCurrentEpisodeListFailure,
  getCurrentEpisoodeDetailsRequest,
  getCurrentEpisoodeDetailsSuccess,
  getCurrentEpisoodeDetailsFailure,
  setTabOpen
  
} = UserSlice.actions;

export default UserSlice.reducer;