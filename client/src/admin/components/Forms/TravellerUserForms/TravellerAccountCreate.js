import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//actions
import { travellerRegister } from '../../../../actions/travellerActions';

//material ui
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
//icons
import CreateIcon from '@material-ui/icons/Create';

//styles
import styles from './styles';

const initialState = {
	id: '',
	name: '',
	email: '',
	password: '',
	confirm: '',
	role: 'Traveller',
	profilePic: '',
	contactInfo: {
		telephone: '',
		mobile: '',
		email: '',
		addressLine01: '',
		addressLine02: '',
		city: '',
		state: '',
		country: '',
		zipcode: '',
	},
	socialMedia: {
		facebook: '',
		twitter: '',
		line: '',
		wechat: '',
		whatsapp: '',
		linkedin: '',
		instagram: '',
	},
	newsletters: {
		productNews: true,
		websiteNews: true,
		guideNews: true,
		agentNews: true,
		competitionNews: true,
	},
	errors: {},
	success: false,
};

export class TravellerRegistration extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onChangeToggle = this.onChangeToggle.bind(this);
		this.onError = this.onError.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.traveller) {
			this.setState({ traveller: nextProps.traveller });
		}
	}

	onSubmit = event => {
		event.preventDefault();

		const newTraveller = {
			id: this.state.id,
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			confirm: this.state.confirm,
			role: this.state.role,
			profilePic: this.state.profilePic,
			contactInfo: {
				telephone: this.state.telephone,
				mobile: this.state.mobile,
				email: this.state.email,
				addressLine01: this.state.addressLine01,
				addressLine02: this.state.addressLine02,
				city: this.state.city,
				state: this.state.state,
				country: this.state.country,
				zipcode: this.state.zipcode,
			},
			socialMedia: {
				facebook: this.state.facebook,
				twitter: this.state.twitter,
				line: this.state.line,
				wechat: this.state.wechat,
				whatsapp: this.state.whatsapp,
				linkedin: this.state.linkedin,
				instagram: this.state.instagram,
			},
			newsletters: {
				productNews: this.state.productNews,
				websiteNews: this.state.websiteNews,
				guideNews: this.state.guideNews,
				agentNews: this.state.agentNews,
				competitionNews: competitionNews,
			},
		};

		this.props.travellerRegister(newTraveller);
	};

	onChangeToggle = event => {
		let newsletters = this.state.newsletters;
		newsletters[event.target.name] = event.target.checked;
		this.setState({ newsletters: newsletters });
	};

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

	render() {
		const { classes } = this.props;
		const { errors, customRoles } = this.state;
		const { isSuccess } = this.props.admin;

		const dialogSuccess = (
			<Dialog
				open={isSuccess}
				onClose={this.onClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{'Traveller Registered'}
				</DialogTitle>

				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						A New Traveller Account has been sucessfully created
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={this.onClose}
						color="primary"
						autoFocus
						component={Link}
						to="/admin/traveller"
					>
						OK
					</Button>
				</DialogActions>
			</Dialog>
		);

		const contactInformForm = (
			<React.Fragment>
				<Grid container justify="flex-start">
					<Grid item xs={12} sm={12} md={2} xl={1}>
						<Typography
							variant="body2"
							className={classes.mobilePadding}
						>
							Contact Numbers
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={10} xl={6}>
						<TextField
							error={this.isError('telephone')}
							name="telephone"
							id="telephone"
							label="telephone"
							placeholder="+66 (0)202 555 555"
							value={this.state.telephone}
							onChange={this.onChange}
							helperText={errors.telephone}
							className={classes.textField}
							type="telephone"
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={10} xl={6}>
						<TextField
							error={this.isError('mobile')}
							name="mobile"
							id="mobile"
							label="mobile"
							placeholder="+66 (0)202 555 555"
							value={this.state.mobile}
							onChange={this.onChange}
							helperText={errors.mobile}
							className={classes.textField}
							type="telephone"
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
				</Grid>
				<Divider className={classes.divider} />
				<Grid
					container
					justify="flex-start"
					className={classes.gridPadding}
				>
					<Grid item xs={12} sm={12} md={2} xl={1}>
						<Typography
							variant="body2"
							className={classes.mobilePadding}
						>
							Contact Address
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={10} xl={11}>
						<TextField
							error={this.isError('addressLine01')}
							name="addressLine01"
							id="addressLine01"
							label="Address Line 01"
							placeholder=""
							value={this.state.addressLine01}
							onChange={this.onChange}
							helperText={errors.addressLine01}
							className={classes.textField}
							fullWidth
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
				</Grid>
			</React.Fragment>
		);

		const accountRegistration = (
			<React.Fragment>
				<Grid container justify="flex-start">
					<Grid item xs={12} sm={12} md={2} xl={1}>
						<Typography
							variant="body2"
							className={classes.mobilePadding}
						>
							Name
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={10} xl={11}>
						<TextField
							error={this.isError('name')}
							name="name"
							id="name"
							label="Name"
							placeholder="Name"
							value={this.state.name}
							onChange={this.onChange}
							helperText={errors.name}
							className={classes.textField}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
				</Grid>

				<Grid
					container
					justify="flex-start"
					className={classes.gridPadding}
				>
					<Grid item xs={12} sm={12} md={2} xl={1} />
					<Grid item xs={12} sm={12} md={10} xl={11}>
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
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
				</Grid>
				<Divider className={classes.divider} />
				<Grid
					container
					justify="flex-start"
					className={classes.gridPadding}
				>
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
							value={this.state.password}
							onChange={this.onChange}
							helperText={errors.password}
							placeholder="**********"
							className={classes.textField}
							fullWidth
							type="password"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
				</Grid>
				<Grid
					container
					justify="flex-start"
					className={classes.gridPadding}
				>
					<Grid item xs={12} sm={12} md={2} xl={1} />
					<Grid item xs={12} sm={12} md={5} xl={6}>
						<TextField
							error={this.isError('confirm')}
							name="confirm"
							id="confirm"
							label="Confirm Password"
							value={this.state.confirm}
							onChange={this.onChange}
							helperText={errors.confirm}
							placeholder="**********"
							className={classes.textField}
							fullWidth
							type="password"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
				</Grid>
			</React.Fragment>
		);

		return (
			<Paper className={classes.root} square elevation={4}>
				<form
					noValidate
					className={classes.container}
					autoComplete="off"
					onSubmit={this.onSubmit}
				>
					<Divider className={classes.divider} />
					<Grid
						container
						justify="flex-start"
						className={classes.gridPadding}
					>
						<Grid item xs={12} sm={12} md={2} xl={1}>
							<Typography
								variant="body2"
								className={classes.mobilePadding}
							>
								Roles
							</Typography>
						</Grid>
						<Grid item xs={12} sm={12} md={10} xl={11}>
							<Typography variant="body2">
								Administration Role
							</Typography>
						</Grid>
					</Grid>
					<Grid
						container
						justify="flex-start"
						className={classes.gridPadding}
					>
						<Grid item xs={12} sm={12} md={2} xl={1} />
						<Grid item xs={12} sm={12} md={10} xl={11}>
							<FormControl component="fieldset">
								<FormGroup row>{userRoles}</FormGroup>
							</FormControl>
						</Grid>
					</Grid>
					<Grid
						container
						justify="flex-start"
						className={classes.gridPadding}
					>
						<Grid item xs={12} sm={12} md={2} xl={1} />
						<Grid item xs={12} sm={12} md={10} xl={11}>
							<FormControl component="fieldset">
								<Typography variant="body2">
									Management Settings
								</Typography>
								<FormGroup row>{customRolesList}</FormGroup>
							</FormControl>
						</Grid>
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
				</form>
				{dialogSuccess}
			</Paper>
		);
	}
}

TravellerRegistration.propTypes = {
	travellerRegister: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	traveller: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	errors: state.errors,
	traveller: state.traveller.traveller,
});

export default connect(
	mapStateToProps,
	{ travellerRegister }
)(withStyles(styles, { withTheme: true })(travellerRegistration));
