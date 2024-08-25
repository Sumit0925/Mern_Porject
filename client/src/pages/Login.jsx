import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


const Login = () => {
  
  const {API}=useAuth();

  const URL = `${API}/api/auth/login`;
  
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    // console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      // console.log(response);
      const res_data = await response.json();
      // console.log(res_data);
      if (response.ok) {
        storeTokenInLS(res_data.token);
        setUser({
          email: "",
          password: "",
        });
        navigate("/");
        toast.success(res_data.message);
        // toast.success("Login Successfull");
      } else {
        toast.error(res_data.extraDetails?res_data.extraDetails:res_data.message);
      }
    } catch (error) {
      console.log("Login", error);
    }
  };
  return (
    <>
      <section>
        <main>
          <div className="section-login">
            <div className="container grid grid-two-cols">
              <div className="login-image">
                <img
                  src="/images/login.png"
                  alt="login-image"
                  height="500"
                  width="500"
                />
              </div>

              <div className="login-form">
                <h1 className="main-heading mb-3">Login Form</h1>

                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      value={user.email}
                      onChange={handleChange}
                      id="email"
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
                    Login Now
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

export default Login;
