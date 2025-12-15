import { NavLink } from "react-router-dom";
import s from "./ButtonLink.module.css";
import * as React from "react";

type ButtonLinkProps={
  to: string
  children: React.ReactNode;
  isActive?: boolean;
}

export const ButtonLink = ({ to, children, isActive }: ButtonLinkProps) => {
  return (
    <NavLink
      to={to}
      className={`${s.button} ${isActive ? s.active : ""}`}
    >
      {children}
    </NavLink>
  );
};
