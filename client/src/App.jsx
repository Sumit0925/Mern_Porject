import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Service from "./pages/Service";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Contact } from "./pages/Contact";
import { Navbar } from "./components/Navbar";
import { Error } from "./pages/Error";
import { Footer } from "./components/Footer";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/layout/AdminLayout";
import { AdminUsers } from "./pages/AdminUsers";
import { AdminContacts } from "./pages/AdminContacts";
import { AdminUpdate } from "./pages/AdminUpdate";
import { useAuth } from "./store/auth";

function App() {
  
  const {isLoggedIn} = useAuth();

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Service />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="logout" element={<Logout/>}/>
            {/* For wild path i.e path other than we created */}
          <Route path="*" element={<Error />} />

          {/* Nested Route  */}
          <Route path="/admin" element={<AdminLayout/>}>
          {/* To access route under parent route i.e "/admin" you have to use <Outlet/> component in parent route  */}
            <Route path="users" element={<AdminUsers/>} />
            <Route path="contacts" element={<AdminContacts/>} />
            <Route path="users/:id/edit" element={<AdminUpdate/>} />
          </Route>


        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
