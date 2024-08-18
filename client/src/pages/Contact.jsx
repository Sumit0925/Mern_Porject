import React, { useState } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
import { toast } from "react-toastify";

export const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  //* Fetching loggedIn user data
  const [userData, setUserData] = useState(true);
  const { user, } = useAuth();
  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });
    setUserData(false);
  }

  const handleChange = (e) => {
    // console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(contact);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/form/contact",
        contact
      );
      // console.log(response);
      if (response.status == "200") {
        setContact({
          ...contact,
          message: "",
        });
        toast.success("Message sent sucessfully");
      }
    } catch (error) {
      console.error("contact form error");
    }
  };

  return (
    <div>
      <section className="section-contact">
        <div className="container contact-content">
          <h1 className="main-heading">Contact Us</h1>
        </div>

        {/* Contact main page */}

        <div className="container grid grid-two-cols">
          <div className="contact-image">
            <img
              src="/images/support.png"
              alt="we are always ready to help"
              height="500"
              width="500"
            />
          </div>

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
                  value={contact.username}
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
                  value={contact.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">message</label>

                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleChange}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>
              <div>
                <button type="submit" className="btn">
                  submit
                </button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6721.398130035233!2d74.8514316!3d32.614202399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1723215469606!5m2!1sen!2sin"
            width="100%"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </div>
  );
};
