import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { AuthorizationToken } = useAuth();
  const getAllUsersData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/users",
        {
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );
      // console.log(response);
      if (response.status == "200") {
        const usersData = await response.data;
        console.log("users", usersData);
        setUsers(usersData);
      }
    } catch (error) {
      console.log("Getting all users error", error);
    }
  };

  //* delete the user on delete button

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/admin/users/delete/${id}`,
        {
          headers: {
            Authorization: AuthorizationToken,
          },
        }
      );
      if(response.status == "200"){
        // console.log(response);
        toast.success(response.data.message);
        getAllUsersData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Users Data</h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.phone}</td>
                    <td>
                      <Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link>
                    </td>
                    <td>
                      <button onClick={() => deleteUser(curUser._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
