import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../ducks/reducer";

import "./Nav.css";

const Nav = props => {
  console.log(props.user);
  const { user } = props;
  return (
    <div className="navbar">
      <div className="nav-user">
        <img src={user.profilePic} alt={`${user.username}'s profile pic`} />
        <span>{user.username}</span>
        <Link to="/dashboard">
          <button>Home</button>
        </Link>
        <Link to="/new">
          <button>New Post</button>
        </Link>
      </div>
      <Link to="/">
        <button onClick={props.logout}>Logout</button>
      </Link>
    </div>
  );
};

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { logout }
)(Nav);
