import { createContext, useState, useContext } from "react"

import { loginAPI, logoutAPI, verifyTokenAPI, getAccessTokenAPI, googleLoginAPI } from "./api";

const authContext = createContext();

export const AuthProvider = (props) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{props.children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext);
}


const useProvideAuth = () => {
  const defaultUser = {
    id: null,
    email: null,
  }
  const [user, setUser] = useState(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async ({ data, callBack }) => {

    setLoading(true);
    const response = await loginAPI(data);

    if (response.status === 200) {
      const userData = response.data;
      setUser({ email: userData.user.email });
      setIsLoggedIn(true);
      localStorage.setItem('access', userData.access);
      localStorage.setItem('refresh', userData.refresh);
      localStorage.setItem('user', JSON.stringify(userData.user))
      callBack();
    }
    setLoading(false);
  }

  const logout = async ({ callBack }) => {
    setLoading(true);
    const refresh = localStorage.getItem('refresh');
    const response = await logoutAPI(refresh)
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    setUser({
      id: null,
      email: null,
    })
    setIsLoggedIn(false)
    callBack()
    setLoading(false);
  }

  const getUser = async () => {
    setLoading(true);
    if (!(localStorage.getItem('access')) || !(localStorage.getItem('refresh')) || !(localStorage.getItem('user'))) {
      setUser({ id: null, email: null });
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    const responseForAccessToken = await verifyTokenAPI(localStorage.getItem('access'));

    if (responseForAccessToken.status >= 400) {
      const newAccessTokenResponse = await getAccessTokenAPI(localStorage.getItem('refresh'));

      if (newAccessTokenResponse.status >= 400) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');
        setUser({ id: null, email: null });
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      localStorage.removeItem('access');
      localStorage.setItem('access', newAccessTokenResponse.data.access);
    }

    let userData = JSON.parse(localStorage.getItem('user'))
    setUser({ email: userData.email })
    setIsLoggedIn(true)

    setLoading(false);
  }

  const googleLogin = async ({ response, callBack }) => {

    setLoading(true);
    const res = await googleLoginAPI(response)

    if (res.status === 200) {
      const userData = res.data;
      setUser({ email: userData.user.email });
      setIsLoggedIn(true);
      localStorage.setItem('access', userData.access);
      localStorage.setItem('refresh', userData.refresh);
      localStorage.setItem('user', JSON.stringify(userData.user));
      callBack();
    }

    setLoading(false);
  }

  return {
    user,
    isLoggedIn,
    loading,
    login,
    logout,
    getUser,
    googleLogin
  }
}