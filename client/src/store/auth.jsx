import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

//* creating provider
export const AuthProvider = ({ children }) => {
  //* remember to write {children} in small letters not like this {Children}
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [admin, setAdmin] = useState(localStorage.getItem("admin"));
  const AuthorizationToken = `Bearer ${token}`;

  const API = import.meta.env.VITE_APP_URI_API;

  // //* setting role in local Storage
  // const storeRoleInLS = (userRole) => {
  //   setAdmin(userRole);
  //   return localStorage.setItem("role", userRole);
  // };

  // //* removing role from local Storage
  // const removingRoleInLS = () => {
  //   setAdmin("");
  //   return localStorage.removeItem("role");
  // };

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token; //* If the token is present it will be "True" otherwise it will be "False"
  // console.log(isLoggedIn);

  //* Takling the logout fuctionality
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  //! JWT AUTHENTICATION -  To Get Currently loggedIN user data
  // ^ "try" block with "axios"
  // if (isLoggedIn) {
  //   const userAuthentication = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${API}/api/auth/user`,
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
      setIsLoading(true);
      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // our main goal is to get the user data 👇
        // console.log("data",data.userData);
        setIsLoading(false);
        setUser(data.userData);
      } else {
        setIsLoading(false);
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //* takling fetching service data from database
  const getServices = async () => {
    try {
      const response = await axios.get(`${API}/api/data/service`);
      // console.log(response);
      if (response.statusText == "OK") {
        // console.log(response.data.serviceData);
        setServices(response.data.serviceData);
      }
    } catch (error) {
      console.error(`Error fetching Service data ${error}`);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      userAuthentication();
    }
    getServices();
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          token,
          storeTokenInLS,
          LogoutUser,
          isLoggedIn,
          user,
          services,
          AuthorizationToken,
          isLoading,
          API,
          userAuthentication,
        }}
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
