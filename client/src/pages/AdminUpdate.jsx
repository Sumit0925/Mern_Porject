import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const { AuthorizationToken } = useAuth();
  //* Fetching single  user data
  const params = useParams();

  const getSingleUserData = async () => {
    try {
      // console.log(params)
      const id = params.id;
      const response = await axios.get(
        `http://localhost:3000/api/admin/users/${id}`,
        {
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );
      // console.log(response)
      if (response.status == "200") {
        const userData = await response.data.user;
        setData(userData);
      }
    } catch (error) {
      console.error("Error fetching single user data in Admin Page");
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //* Updating User data
    try {
      const id = params.id;
      const response = await axios.patch(
        `http://localhost:3000/api/admin/users/update/${id}`,
        data,
        {
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );
      // console.log(response);
      if (response.status == "200") {
        toast.success(response.data.message);
      } else {
        toast.error("Not Updated!!");
      }
    } catch (error) {
      console.error("Error Updating User data", error);
      toast.error(
        error.response.data.extraDetails
          ? error.response.data.extraDetails
          : error.response.data.message
      );
    }
  };
  return (
    <>
      <section className="section-contact">
        <div className="container contact-content">
          <h1 className="main-heading">Update User</h1>
        </div>

        {/* Contact main page */}

        <div className="container grid grid-two-cols">
          {/* contact form  */}

          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={data.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone">phone</label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={data.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <button type="submit" className="btn">
                  Update
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};
