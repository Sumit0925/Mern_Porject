import { createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ Children }) => {
  const storeTokenInLs = (serverToken) => {
    localStorage.setItem("Token", serverToken);
  };
  return (
    <>
      <AuthContext.Provider value={{ storeTokenInLs }}>
        {Children}
      </AuthContext.Provider>
    </>
  );
};
