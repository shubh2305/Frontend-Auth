import { createContext, useState, useContext } from "react"

import { loginAPI, logoutAPI, verifyTokenAPI, getAccessTokenAPI } from "./api";

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
    email: null,
  }
  const [user, setUser] = useState(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const login = async ({ data, callBack }) => {

    const response = await loginAPI(data);

    if (response.status === 200) {
      const userData = response.data;
      setUser({ email: userData.user });
      setIsLoggedIn(true);
      localStorage.setItem('access', userData.access);
      localStorage.setItem('refresh', userData.refresh);
      localStorage.setItem('user', userData.user)
      callBack();
    }

  }

  const logout = async ({ callBack }) => {
    const refresh = localStorage.getItem('refresh');
    const response = await logoutAPI(refresh)
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    setUser({
      email: null,
    })
    setIsLoggedIn(false)
    callBack()
  }

  const getUser = async () => {

    if (!(localStorage.getItem('access')) || !(localStorage.getItem('refresh')) || !(localStorage.getItem('user'))) {
      setUser({ email: null });
      setIsLoggedIn(false);
      return;
    }

    const responseForAccessToken = await verifyTokenAPI(localStorage.getItem('access'));

    if (responseForAccessToken.status >= 400) {
      const newAccessTokenResponse = await getAccessTokenAPI(localStorage.getItem('refresh'));

      if (newAccessTokenResponse.status >= 400) {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');
        setUser({ email: null });
        setIsLoggedIn(false);
        return;
      }

      localStorage.removeItem('access');
      localStorage.setItem('access', newAccessTokenResponse.data.access);
    }

    setUser({ email: localStorage.getItem('user') })
    setIsLoggedIn(true)
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
    getUser
  }
}