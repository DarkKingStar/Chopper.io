import {call, put, select, takeLatest} from 'redux-saga/effects';


let getItem = state => state.AuthReducer;


export function* getdata(action) {
  try {
 
  } catch (error) {
   
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('Help/getFQAListRequest', getdata);
  })(),
];

export default watchFunction;
