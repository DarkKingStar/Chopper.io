import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  
};

const AnimeSlice = createSlice({
  name: 'Anime',
  initialState:{
    recentReleased: {},
    newSeason: {},
    popularAnime: {},
    animeMovies: {},
    animeSearch:{},
    status:'',
    loading:false,
  },
  reducers: {
    recentReleasedRequest: (state, action) => {
      state.status = action.type;
    },
    recentReleasedSuccess: (state, action) => {
      if(state?.recentReleased?.results && state?.recentReleased?.results?.lenght !== 0){
        let results = state?.recentReleased?.results?.concat(action?.payload?.results);
        results = results.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
        state.recentReleased = action.payload;
        state.recentReleased.results = results;
      }else{
        state.recentReleased = action.payload;
      }
      state.status = action.type;
    },
    recentReleasedFailure: (state, action) => {
      state.status = action.type;
    },

    newSeasonRequest: (state, action) => {
      state.status = action.type;
    },
    newSeasonSuccess: (state, action) => {
      if(state?.newSeason?.results && state?.newSeason?.results?.lenght !== 0){
        let results = state?.newSeason?.results?.concat(action?.payload?.results);
        results = results.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
        state.newSeason = action.payload;
        state.newSeason.results = results;
      }else{
        state.newSeason = action.payload;
      }
      state.status = action.type;
    },
    newSeasonFailure: (state, action) => {
      state.status = action.type;
    },

    popularAnimeRequest: (state, action) => {
      state.status = action.type;
    },
    popularAnimeSuccess: (state, action) => {
      if(state?.popularAnime?.results && state?.popularAnime?.results?.lenght !== 0){
        let results = state?.popularAnime?.results?.concat(action?.payload?.results);
        results = results.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
        state.popularAnime = action.payload;
        state.popularAnime.results = results;
      }else{
        state.popularAnime = action.payload;
      }
      state.status = action.type;
    },
    popularAnimeFailure: (state, action) => {
      state.status = action.type;
    },

    animeMoviesRequest: (state, action) => {
      state.status = action.type;
    },
    animeMoviesSuccess: (state, action) => {
      if(state?.animeMovies?.results && state?.animeMovies?.results?.lenght !== 0){
        let results = state?.animeMovies?.results?.concat(action?.payload?.results);
        results = results.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
        state.animeMovies = action.payload;
        state.animeMovies.results = results;
      }else{
        state.animeMovies = action.payload;
      }
      state.status = action.type;
    },
    animeMoviesFailure: (state, action) => {
      state.status = action.type;
    },
    
    animeSearchRequest: (state, action) => {
      state.status = action.type;
    },
    animeSearchSuccess: (state, action) => {
      state.animeSearch = action.payload;
      state.status = action.type;
    },
    animeSearchFailure: (state, action) => {
      state.status = action.type;
    }

  },
});

export const {

  recentReleasedRequest,
  recentReleasedSuccess,
  recentReleasedFailure,

  newSeasonRequest,
  newSeasonSuccess,
  newSeasonFailure,

  popularAnimeRequest,
  popularAnimeSuccess,
  popularAnimeFailure,

  animeMoviesRequest,
  animeMoviesSuccess,
  animeMoviesFailure,

  animeSearchRequest,
  animeSearchSuccess,
  animeSearchFailure

} = AnimeSlice.actions;

export default AnimeSlice.reducer;
