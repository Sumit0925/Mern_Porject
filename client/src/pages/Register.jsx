import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

  
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  
  const handleChange = (e) => {
    // console.log(e);
    
    let name = e.target.name;
    let value = e.target.value;
    
    setUser({
      ...user,
      [name]: value, //* [name] is a dynamic value i.e username,email,phone,password
    });
  };
  
  const navigate = useNavigate();

  //* Hanlde form submit
  const handleSubmit = async (e,req,res) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        user
      );
      console.log(response);
      if (response.status == "201") {
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate('/login');
      }
    } catch (error) {
      console.log("Registration", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/register.png"
                  alt="a girl trying to fill registration form"
                  height="500"
                  width="500"
                />
              </div>

              {/* lets takle registration form */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="username"
                      value={user.username}
                      onChange={handleChange}
                      id="username"
                      autoComplete="off"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={user.email}
                      onChange={handleChange}
                      id="email"
                      autoComplete="off"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="phone"
                      value={user.phone}
                      onChange={handleChange}
                      id="phone"
                      autoComplete="off"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      value={user.password}
                      onChange={handleChange}
                      id="password"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <br />

                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Register;
