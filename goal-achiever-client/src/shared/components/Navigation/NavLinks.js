import React from 'react';
import { NavLink } from 'react-router-dom';
import * as routesConsts from '../../httpRequests/routes';
import './NavLinks.scss';

const NavLinkItem = ({ to, caption }) => (
  <li>
    <NavLink to={to}>{caption}</NavLink>
    <span />
  </li>
);

const NavLinks = () => {
  return (
    <ul className="nav-links">
      <NavLinkItem to={routesConsts.HOME} caption="Home" />
    </ul>
  );
};

export default NavLinks;
