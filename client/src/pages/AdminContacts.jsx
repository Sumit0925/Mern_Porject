import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  const { AuthorizationToken } = useAuth();

  //* Fetching all Contacts
  const getAllContacts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/contacts",
        {
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );
      // console.log("Contacts ",response);
      if (response.status == "200") {
        const contactsData = response.data;
        // console.log(contactsData)
        setContacts(contactsData);
      }
    } catch (error) {
      console.error("Error Fetching Contacts", error);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <>
      <section className="admin-contacts-section">
        <h1>Admin Contacts Data</h1>
        <div className="container admin-users">
          {contacts.map((curContact, index) => {
            const { username, email, message } = curContact;
            return (
              <div key={index}>
                <p>{username}</p>
                <p>{email}</p>
                <p>{message}</p>
                <p>
                  <button className="btn">Delete</button>
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
