import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "@/components/Logo";

const Header = () => {
  return (
    <header
      style={{
        padding: "20px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <Logo />
      </Link>
      <nav
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <NavLink to={"/shop"} style={{ textDecoration: "none" }}>
          shop
        </NavLink>
        <NavLink to={"/about"} style={{ textDecoration: "none" }}>
          about
        </NavLink>
        <NavLink to={"/blog"} style={{ textDecoration: "none" }}>
          blog
        </NavLink>
        <NavLink to={"/cart"} style={{ textDecoration: "none" }}>
          cart
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
