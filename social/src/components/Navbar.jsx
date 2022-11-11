import React, { useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to="profile">Profile</Link>
        </li>,
        <li>
          <Link to="newpost">Create Post</Link>
        </li>,
        <li>
          <Link to="myfollowingposts">Friend's Posts</Link>
        </li>,
        <li>
          <button
            className="btn #b71c1c red darken-4"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              navigate("/login");
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to="login">Login</Link>
        </li>,
        <li>
          <Link to="signup">Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <>
      <nav>
        <div className="nav-wrapper white">
          <Link to={state ? "/" : "/login"} className="brand-logo left">
            Instagram
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
