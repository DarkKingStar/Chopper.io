import axios from 'axios';
import constants from '../constants/constants';
import 'abortcontroller-polyfill'

export async function getApi(url, header) {
  console.log('GetApi: ', `${constants.BASE_URL}/${url}`);

  return await axios.get(`${constants.BASE_URL}/${url}`, {
    headers: {
      Accept: header.Accept,
      'Content-type': header.contenttype,
    },
  });
}

export async function getApiWithSignal(url, header) {
  console.log('GetApiwithSignal: ', `${constants.BASE_URL}/${url}`);
  const abortController = new AbortController();
  return await axios.get(`${constants.BASE_URL}/${url}`, {
    headers: {
      Accept: header.Accept,
      'Content-type': header.contenttype,
    },
    signal: abortController.signal
  });
}


export async function getApiWithParam(url, param, header) {
  console.log('getApiWithParam: ', `${constants.BASE_URL}/${url}`);

  return await axios({
    method: 'GET',
    baseURL: constants.BASE_URL,
    url: url,
    params: param,
    headers: {
      Accept: header.Accept,
      'Content-type': header.contenttype,
    },
  });
}


export async function getApiWithParamandSignal(url, param, signal, header) {
  console.log('getApiWithParamandSignal: ', `${constants.BASE_URL}/${url}`);

  return await axios({
    method: 'GET',
    baseURL: constants.BASE_URL,
    url: url,
    params: param,
    headers: {
      Accept: header.Accept,
      'Content-type': header.contenttype,
    },
    signal: signal
  });
}

export async function postApi(url, payload, header) {
  console.log('PostApi: ', `${constants.BASE_URL}/${url}`);

  return await axios.post(`${constants.BASE_URL}/${url}`, payload, {
    headers: {
      Accept: header.Accept,
      'Content-Type': header.contenttype,
      Authorization: 'Bearer' + ' ' + header.accesstoken,
    },
  });
}

export async function deleteApi(url, header) {
  // console.log('Delete Api: ', `${constants.BASE_URL}/${url}`, header);
  return await axios.delete(`${constants.BASE_URL}/${url}`, {
    headers: {
      Authorization: 'Bearer' + ' ' + header?.accesstoken,
    },
  });
}
