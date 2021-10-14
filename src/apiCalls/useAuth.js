import { createContext, useState, useContext } from "react"
import { useHistory } from "react-router-dom";

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
    username: null,
    email: null,
  }
  const [user, setUser] = useState(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const login = ({ username, email, callBack }) => {
    setUser({
      username: username,
      email: email
    })

    setIsLoggedIn(true)

    callBack();
  }

  const logout = ({ callBack }) => {
    setUser({
      username: null,
      email: null
    })
    setIsLoggedIn(false)
    callBack()
  }

  return {
    user,
    isLoggedIn,
    login,
    logout
  }
}