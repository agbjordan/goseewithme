// The basics
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Routes from './routes';

// Action creators and helpers
import { establishCurrentAdmin } from '../actions/authActions';
import { isServer } from '../store';

class App extends Component {
	componentWillMount() {
		if (!isServer) {
			this.props.establishCurrentAdmin();
		}
	}

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
	adminIsAuthenticated: state.auth.adminIsAuthenticated,
	userIsAuthenticated: state.auth.userIsAuthenticated,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ establishCurrentAdmin }, dispatch);

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
);
