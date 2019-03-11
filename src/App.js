import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Nav/Nav";
import routes from "./routes";
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(window);
    console.log(this.props);
    return (
      <div className="App">
        {window.location.hash === "#/" ? null : <Nav />}
        {routes}
      </div>
    );
  }
}

export default App;
