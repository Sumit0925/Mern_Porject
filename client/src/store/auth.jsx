import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

//* creating provider
export const AuthProvider = ({ children }) => {
  //* remember to write {children} in small letters not like this {Children}
  const [token, setToken] = useState(localStorage.getItem("token"));
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token; //* If the token is present it will be "True" otherwise it will be "Flase"
  // console.log(isLoggedIn);

  //! JWT AUTHENTICATION -  To Get Currently loggedIN user data
  const [user, setUser] = useState();
  // ^ "try" block with "axios"
  // if (isLoggedIn) {
  //   const userAuthentication = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3000/api/auth/user",
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       console.log("user data response", response);
  //       if (response.status == "200") {
  //         const data = await response.data.userData;
  //         // console.log(data);
  //         setUser(data);
  //       }
  //     } catch (err) {

  //       console.error(`Error fetching user data ${err}`);
  //     }
  //   };
  //   useEffect(() => {
  //     userAuthentication();
  //   }, []);
  // }

  //^ "try" block with "fetch"
  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data.userData)
        setUser(data.userData);
      }
    } catch (err) {
      console.error(`Error fetching user data ${err}`);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);


  
  //* Takling the logout fuctionality
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };
  return (
    <>
      <AuthContext.Provider
        value={{ storeTokenInLS, LogoutUser, isLoggedIn, user }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

//* creating consumer (using Custom Hook)
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    //* if we don't get the value of "authContextValue" that means we haven;t wrapped the <App/> component in AuthProvider;
    throw new Error("useAuth used outside the provider");
  }
  return authContextValue;
};
