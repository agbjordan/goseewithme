import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

//actions
import { adminLogin, redirect } from '../../../../actions/authActions';

//material ui
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
//icons
import CreateIcon from '@material-ui/icons/CallMade';

import styles from './styles';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {},
			success: false,
		};

		this.onChange = this.onChange.bind(this);
		this.onError = this.onError.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.adminIsAuthenticated === true) {
			this.props.redirect('/admin/dashboard');
		}

		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	onError = name => {
		if (
			this.state.errors[name] &&
			this.state.errors[name].trim().length > 0
		) {
			return true;
		}
		return false;
	};

	onSubmit = e => {
		e.preventDefault();

		const newLogin = {
			email: this.state.email,
			password: this.state.password,
		};

		this.props.adminLogin(newLogin);
	};

	render() {
		const { classes } = this.props;
		const { errors } = this.state;

		const LoginForm = (
			<Paper className={classes.root}>
				<Typography variant="title" color="inherit" noWrap>
					Administration Login
				</Typography>
				<Divider className={classes.divider} />
				<form onSubmit={this.onSubmit} noValidate>
					<Grid container justify="flex-start">
						<Grid item xs={12} sm={12} md={4}>
							<Typography
								variant="body2"
								className={classes.mobilePadding}
							>
								Email Address
							</Typography>
						</Grid>
						<Grid item xs={12} sm={12} md={8}>
							<TextField
								error={this.onError('email')}
								name="email"
								id="email"
								label="Email Address"
								placeholder="Email Address"
								value={this.state.email}
								onChange={this.onChange}
								helperText={errors.email}
								className={classes.textField}
								fullWidth
								type="email"
								InputLabelProps={{ shrink: true }}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={4}>
							<Typography
								variant="body2"
								className={classes.mobilePadding}
							>
								Password
							</Typography>
						</Grid>
						<Grid item xs={12} sm={12} md={8}>
							<TextField
								error={this.onError('password')}
								name="password"
								id="password"
								label="Password"
								placeholder="********"
								value={this.state.password}
								onChange={this.onChange}
								helperText={errors.password}
								className={classes.textField}
								fullWidth
								type="password"
								InputLabelProps={{ shrink: true }}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={4} />
						<Grid item xs={12} sm={12} md={8}>
							<Button
								type="submit"
								variant="contained"
								size="small"
								className={classes.button}
								color="secondary"
							>
								Login
								<CreateIcon className={classes.rightIcon} />
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		);

		return (
			<CssBaseline>
				<div className={classes.loginForm}>{LoginForm}</div>
			</CssBaseline>
		);
	}
}

LoginForm.propTypes = {
	adminLogin: PropTypes.func.isRequired,
	redirect: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ adminLogin, redirect }
)(withStyles(styles, { withTheme: true })(LoginForm));
