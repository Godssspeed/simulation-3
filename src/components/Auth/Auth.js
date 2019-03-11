import React, { Component } from "react";
import { connect } from "react-redux";
import { handleChange, registerUser, loginUser } from "../../ducks/reducer";
import { Redirect } from "react-router-dom";

export class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleLogin = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.loginUser(username, password);
  };

  handleRegister = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.registerUser(username, password);
  };

  handleLogin;
  render() {
    console.log(this.state);
    console.log(this.props.isLoggedIn);
    if (this.props.isLoggedIn) return <Redirect to="/dashboard" />;
    return (
      <div>
        <form>
          <input
            type="username"
            id="username"
            placeholder="username"
            onChange={e => this.handleChange(e)}
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            onChange={e => this.handleChange(e)}
          />
        </form>
        <button onClick={this.handleLogin}>Login</button>
        <button onClick={this.handleRegister}>Register</button>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { handleChange, registerUser, loginUser }
)(Auth);
