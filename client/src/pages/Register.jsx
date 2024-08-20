import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

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
  const { storeTokenInLS } = useAuth(); //* form Context API

  //* Hanlde form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        user
        // {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   }
        // }
      );
      // console.log(response);
      if (response.status == "201") {
        // console.log("token",response.data);
        storeTokenInLS(response.data.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/login");
        toast.success(response.data.message);
        // toast.success("Resgistration Successfull");
      }
    } catch (error) {
      console.log("Registration", error);
      toast.error(
        error.response.data.extraDetails
          ? error.response.data.extraDetails
          : error.response.data.message
      );
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
