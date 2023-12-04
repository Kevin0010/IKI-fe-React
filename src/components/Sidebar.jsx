import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { BsBasket } from "react-icons/bs";
import { LogOut, reset } from "../features/authSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <aside className="menu pl-2 has-shadow">
      <MenuSection title="General (监事)">
        <MenuItem to="/dashboard" icon={<IoHome />} label="Dashboard (仪表盘)" />
        <MenuItem to="/products" icon={<IoPricetag />} label="Products (产品)" />
      </MenuSection>

      {user && user.role === "supervisor" && (
        <MenuSection title="Supervisor (监事)">
          <MenuItem to="/users" icon={<IoPerson />} label="Users (用户)" />
          <MenuItem to="/stocks" icon={<BsBasket />} label= "Stock (股票)" />
        </MenuSection>
      )}

      <MenuSection title="Settings (设置)">
        <MenuItem onClick={logout} icon={<IoLogOut />} label="Logout (登出)" />
      </MenuSection>
    </aside>
  );
};

const MenuSection = ({ title, children }) => (
  <div>
    <p className="menu-label has-text-weight-bold has-text-black">{title}</p>
    <ul className="menu-list">{children}</ul>
  </div>
);

const MenuItem = ({ to, onClick, icon, label }) => (
  <li>
    {to ? (
      <NavLink to={to}>
        {icon}
        {label}
      </NavLink>
    ) : (
      <button onClick={onClick} className="button is-white">
        {icon}
        {label}
      </button>
    )}
  </li>
);

export default SideBar;
