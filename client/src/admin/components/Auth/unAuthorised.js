import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const UnauthenticatedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				!rest.adminIsAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to={rest.redirect} />
				)
			}
		/>
	);
};

const mapStateToProps = state => ({
	adminIsAuthenticated: state.auth.adminIsAuthenticated,
});

export default connect(
	mapStateToProps,
	null
)(UnauthenticatedRoute);
