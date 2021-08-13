import React, { ReactElement, useEffect, useState } from "react";

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
  const [loginId, setLoginId] = useState(localStorage.getItem("loginId")||"");

  const login = (authId: string, cb: () => void) => {
    setLoginId(authId);
    cb();
  };

  useEffect(() => {
    localStorage.setItem("loginId", loginId)
  }, [loginId])

  const logout = () => {
    localStorage.removeItem("loginId");
    localStorage.removeItem("verified");
    setLoginId("");
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
