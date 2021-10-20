import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/users/';

export async function loginAPI(data) {
  const res = await axios({
    method: 'POST',
    url: 'login/',
    data: data
  })
    .catch(err => err.response)
  console.log(res);
  return res;
}

export async function logoutAPI(refreshToken) {
  const res = await axios({
    method: 'POST',
    url: 'logout/',
    data: { refresh: refreshToken }
  })

  return res;
}

export async function verifyTokenAPI(token) {
  const res = await axios({
    method: 'POST',
    url: 'verify-token/',
    data: { token: token }
  }).catch(err => err.response)

  return res;
}

export async function getAccessTokenAPI(refreshToken) {
  const res = await axios({
    method: 'POST',
    url: 'get-access-token/',
    data: { refresh: refreshToken }
  }).catch(err => err.response)

  return res;
}