import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../components/Navbar.css";
import { useAuth } from "../store/auth";

export const Navbar = () => {
  const { user, isLoggedIn, userAuthentication,token } = useAuth();
  // console.log(user.isAdmin)


  useEffect(() => {
    if (isLoggedIn) {
      userAuthentication();
    }
  }, [token]);

  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">Dev Technical</NavLink>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/services">Services</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>

              {user.isAdmin && isLoggedIn &&(
                <li>
                  <NavLink to="/admin">Admin</NavLink>
                </li>
              )}

              {isLoggedIn ? (
                <li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
