import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./UserModel.css";
import { RiArrowGoBackLine } from "react-icons/ri";

const UserDetail = () => {
  const { uuid } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${uuid}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle error as needed (e.g., set an error state)
      }
    };

    fetchUserDetails();
  }, [uuid]);

  return (
    <div className="card user-detail">
      <div className="card-content user-detail-content">
        <h1 className="title is-4">User Detail</h1>

        {user ? (
          <div className="content user-info">
            <p className="subtitle is-6">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="subtitle is-6">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="subtitle is-6">
              <strong>Phone:</strong> {user.phone}
            </p>
            <p className="subtitle is-6">
              <strong>Address:</strong> {user.address}
            </p>
            <p className="subtitle is-6">
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <Link to="/users" className="goBackLink">
          <RiArrowGoBackLine className="goBackIcon" />
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default UserDetail;
