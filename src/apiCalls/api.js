import axios from "axios";

import configURL from './config';

axios.defaults.baseURL = configURL;

console.log(configURL);

export async function loginAPI(data) {
  const res = await axios({
    method: 'POST',
    url: 'users/login/',
    data: data
  })
    .catch(err => err.response)

  return res;
}

export async function logoutAPI(refreshToken) {
  const res = await axios({
    method: 'POST',
    url: 'users/logout/',
    data: { refresh: refreshToken }
  })

  return res;
}

export async function verifyTokenAPI(token) {
  const res = await axios({
    method: 'POST',
    url: 'users/verify-token/',
    data: { token: token }
  }).catch(err => err.response)

  return res;
}

export async function getAccessTokenAPI(refreshToken) {
  const res = await axios({
    method: 'POST',
    url: 'users/get-access-token/',
    data: { refresh: refreshToken }
  }).catch(err => err.response)

  return res;
}