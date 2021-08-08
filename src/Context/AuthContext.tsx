import React, { ReactElement, useState } from "react";

interface AuthInterface {
  loginId: string | null;
  login: (authId: string, cb: () => void) => void;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthInterface>({
  loginId: "",
  login: () => {},
  logout: () => {},
});

function AuthContextProvider(props: { children: ReactElement }) {
  const [loginId, setLoginId] = useState(localStorage.getItem("loginId"));

  const login = (authId: string, cb: () => void) => {
    localStorage.setItem("loginId", authId);
    setLoginId(loginId);
    cb();
  };

  const logout = () => {
    localStorage.removeItem("loginId");
    localStorage.removeItem("verified");
    setLoginId(null);
  };

  const value: AuthInterface = {
    loginId,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
