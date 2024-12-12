import { createContext, useEffect, useContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const AuthUserContext = createContext(null);

export const useAuthUser = () => {
  return useContext(AuthUserContext);
};

const getValueFromLocalStorage = () => {
  const authUser = localStorage.getItem("authUser");
  return authUser ? JSON.parse(authUser) : null;
};

function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(getValueFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("authUser", JSON.stringify(authUser));
  }, [authUser]);

  return (
    <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthUserContext.Provider>
  );
}

export default AuthProvider;
