import React from "react";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1 className="title">PT. INTI KARYA INDONESIA</h1>
      <hr/>
      <h2 className="subtitle">Hello <strong>{user && user.name}</strong></h2>
      <h2 className="subtitle">You Login as <strong>{user && user.role && user.role.toUpperCase()}</strong></h2>
    </div>
  );
};

export default Welcome;
