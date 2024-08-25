import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  const { AuthorizationToken, API } = useAuth();

  //* Fetching all Contacts
  const getAllContacts = async () => {
    try {
      const response = await axios.get(`${API}/api/admin/contacts`, {
        headers: {
          Authorization: AuthorizationToken,
        },
      });
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

  //* Deleting the Contact on Delete Button
  const deleteContact = async (id) => {
    try {
      const response = await axios.delete(
        `${API}/api/admin/contacts/delete/${id}`,
        {
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );
      if (response.status == "200") {
        toast.success(response.data.message);
        getAllContacts();
      }
    } catch (error) {
      console.error("Error deleting Contact", error);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <>
      <section className="admin-contacts-section">
        <div className="container">
          <h1>Admin Contacts Data</h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className>
              {contacts.map((curContact, index) => {
                const { _id, username, email, message } = curContact;
                return (
                  <tr key={index}>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{message}</td>
                    <td>
                      <button onClick={() => deleteContact(_id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* <section className="admin-contacts-section">
        <h1>Admin Contacts Data</h1>
        <div className="container admin-users">
          {contacts.map((curContact, index) => {
            const {_id, username, email, message } = curContact;
            return (
              <div key={index}>
                <p>{username}</p>
                <p>{email}</p>
                <p>{message}</p>
                <p>
                  <button onClick={() => deleteContact(_id)}>
                    Delete
                  </button>
                </p>
              </div>
            );
          })}
        </div>
      </section> */}
    </>
  );
};
