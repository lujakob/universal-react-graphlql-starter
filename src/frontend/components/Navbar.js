import React from 'react';
import { Link } from 'react-router-dom';
import NavbarLink from './NavbarLink';

const Navbar = () => (
  <nav className="navbar navbar-default">
    <div className="container">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/posts">
          React universal example
        </Link>
      </div>
      <ul className="nav navbar-nav">
        <NavbarLink title="Posts" href="/posts" />
        <NavbarLink title="About" href="/about" />
      </ul>
    </div>
  </nav>
);

export default Navbar;
