import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import Button from "../../../common/button";
import "./Header.scss";

const Header = (props) => {
  return (
    <header className="header">
      <div className="header-wrapper dflex justify-between max-width-1500 align-center">
        <div className="brand-logo">
          <NavLink to="/" className="brand">
            Bankr
          </NavLink>
        </div>
        <nav className="header-right dflex align-center">
          <div className="header-links">
            <ul className="dflex">
              <li>
                <NavLink to="/" className="header-link-item">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="header-link-item">
                  Features
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="header-link-item">
                  Help
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="header-link-item">
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="header-link-item">
                  Pricing
                </NavLink>
              </li>
            </ul>
          </div>
          <Button
            className="header-action-wrapper"
            onClick={() => props.history.push("/login")}
          >
            <div className="header-action">Get Started</div>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default withRouter(Header);
