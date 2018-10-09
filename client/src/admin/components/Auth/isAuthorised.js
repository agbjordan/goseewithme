import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				rest.isAuthenticated ? (
					!rest.customRole ? (
						<Component {...props} />
					) : rest.customRole &&
					rest.roles[rest.customRole] === true ? (
						<Component {...props} />
					) : rest.redirectRole ? (
						<Redirect to={rest.redirectRole} />
					) : (
						<Redirect to={rest.redirect} />
					)
				) : (
					<Redirect to={rest.redirect} />
				)
			}
		/>
	);
};

AuthenticatedRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	roles: PropTypes.object,
	customRole: PropTypes.string,
	redirectRole: PropTypes.string,
	redirect: PropTypes.string,
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.adminIsAuthenticated,
	roles: state.auth.administrator.roles,
});

export default connect(
	mapStateToProps,
	null
)(AuthenticatedRoute);
