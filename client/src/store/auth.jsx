import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

//* creating provider
export const AuthProvider = ({ children }) => {  //* remember to write {children} in small letters not like this {Children}
  const [token,setToken] = useState(localStorage.getItem("token"));
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token; //* If the token is present it will be "True" otherwise it will be "Flase"
  // console.log(isLoggedIn); 


  //* Takling the logout fuctionality
  const LogoutUser = ()=>{
    setToken("");
    return localStorage.removeItem("token");
  }
  return (
    <>
      <AuthContext.Provider value={{ storeTokenInLS ,LogoutUser,isLoggedIn  }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

//* creating consumer (using Custom Hook)
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {  //* if we don't get the value of "authContextValue" that means we haven;t wrapped the <App/> component in AuthProvider;
    throw new Error("useAuth used outside the provider");
  }
  return authContextValue;
};
