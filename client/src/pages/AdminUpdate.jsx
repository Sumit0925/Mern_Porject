import React, { useState } from "react";

export const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="section-contact">
        <div className="container contact-content">
          <h1 className="main-heading">Contact Us</h1>
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
