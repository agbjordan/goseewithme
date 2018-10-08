import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//actions
import { authAdminLogin } from '../../../../actions/authActions';

//material ui
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
//icons
import CreateIcon from '@material-ui/icons/CallMade';

import styles from './styles';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { email: '', password: '', errors: {}, success: false };

		this.onChange = this.onChange.bind(this);
		this.onError = this.onError.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.admin) {
			this.setState({ admin: nextProps.admin });
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
	};

	render() {
		const { classes } = this.props;
		const { errors } = this.state;

		const LoginForm = (
			<Paper>
				<Typography variant="title" color="inherit" noWrap>
					Administration Login
				</Typography>
				<form onSubmit={this.onSubmit}>
					<Grid container justify="flex-start">
						<Grid item xs={12} sm={12} md={2} xl={1}>
							<Typography
								variant="body2"
								className={classes.mobilePadding}
							>
								Email Address
							</Typography>
						</Grid>
						<Grid item xs={12} sm={12} md={5} xl={6}>
							<TextField
								error={this.isError('email')}
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
						<Grid item xs={12} sm={12} md={2} xl={1}>
							<Typography
								variant="body2"
								className={classes.mobilePadding}
							>
								Password
							</Typography>
						</Grid>
						<Grid item xs={12} sm={12} md={5} xl={6}>
							<TextField
								error={this.isError('password')}
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
						<Divider className={classes.divider} />
						<Grid
							container
							justify="flex-start"
							className={classes.gridPadding}
						>
							<Grid item xs={12} sm={12} md={2} xl={1} />
							<Grid item xs={12} sm={12} md={2} xl={1}>
								<Button
									type="submit"
									variant="contained"
									size="small"
									className={classes.button}
									color="secondary"
								>
									Create
									<CreateIcon className={classes.rightIcon} />
								</Button>
							</Grid>
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
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	adminAdminLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	errors: state.errors,
	auth: state.auth,
});

export default connect(
	mapStateToProps,
	{ authAdminLogin }
)(withStyles(styles, { withTheme: true })(LoginForm));
