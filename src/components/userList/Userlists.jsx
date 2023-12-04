import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Userlists = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete User ",
      message: "Are you sure you want to delete this user? ",
      buttons: [
        {
          label: "Delete ",
          onClick: () => deleteUser(id), // Fix: Call deleteUser instead of delProduct
        },
        {
          label: "Cancel ",
        },
      ],
    });
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">List of Users</h2>
      <Link to="/users/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table1">
        <thead>
          <tr>
            <th>No. </th>
            <th>Name </th>
            <th>Email </th>
            <th>Role </th>
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td style={{ textAlign: "left", padding: "4px" }}>{user.name}</td>
              <td style={{ textAlign: "left",padding: "4px" }}>{user.email}</td>
              <td style={{ textAlign: "left", padding: "4px" }}>{user.role}</td>
              <td className="icons">
                <span>
                  <Link to={`/user-detail/${user.uuid}`}>
                    <AiOutlineEye size={22} color={"black"} />
                  </Link>
                </span>
                <span>
                  <Link
                    to={`/users/edit/${user.uuid}`}
                    style={{ textDecoration: "none", color: "green" }}
                  >
                    <FaEdit size={22} />
                  </Link>
                </span>
                <span>
                  <FaTrashAlt
                    size={20}
                    color={"blue"}
                    onClick={() => confirmDelete(user.uuid)}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlists;
