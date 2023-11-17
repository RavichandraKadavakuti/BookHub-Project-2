import React from "react";
import {
  NavLink,
  Link,
  withRouter,
} from "react-router-dom/cjs/react-router-dom";
import "./index.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Cookies from "js-cookie";

const Navbar = (pops) => {
  const onclickLogout = () => {
    Cookies.remove("jwt_token");
    const { history } = pops;
    history.replace("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-success-subtle">
      <div className="container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1680171066/Group_7732_pif35n.png"
            alt="navbar-logo"
            className="navbar-brand"
          />
        </Link>
        <button
          className="navbar-toggler shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-lg-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav align-items-lg-center">
            <li className="nav-item nav-link">
              <NavLink to="/" exact activeClassName="active">
                Home
              </NavLink>
            </li>
            <li className="nav-item nav-link">
              <NavLink to="/bookshelves" exact activeClassName="active">
                Bookshelves
              </NavLink>
            </li>
            <li className="nav-item nav-link">
              <Popup
                modal
                closeOnDocumentClick={false}
                trigger={
                  <button type="button" className="btn btn-warning logout-btn">
                    Logout
                  </button>
                }
              >
                {(close) => (
                  <div className="d-flex flex-column align-items-center text-center border border-primary shadow m-2 p-5 rounded">
                    <h3>Confirm Logout</h3>
                    <p>Are you sure you want to logout?</p>
                    <div className="d-flex justify-content-between w-100">
                      <button
                        onClick={onclickLogout}
                        type="button"
                        className="btn btn-lg btn-primary rounded-pill w-50 me-3"
                      >
                        Yes
                      </button>
                      <button
                        onClick={close}
                        type="button"
                        className="btn btn-lg btn-danger rounded-pill w-50"
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
