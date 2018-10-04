// The basics
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

// Action creators and helpers
//import { establishCurrentUser } from "../reducers/auth";
import { isServer } from "../store";

import Routes from "./routes";

// import './app.css';

class App extends Component {
  componentWillMount() {}

  render() {
    return (
      <div id="app">
        <div id="content">
          <Routes />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
