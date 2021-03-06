import { connect } from 'react-redux';
import { createMatchSelector } from 'connected-react-router';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import isEmpty from '../../../../validation/is_Empty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';

//components
import TabContainer from '../../TabContainer';

//actions
import {
	travellerUpdate,
	travellerGetById,
} from '../../../../actions/travellerActions';

//material ui
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import { InputAdornment } from '@material-ui/core';
//icons
import CreateIcon from '@material-ui/icons/Create';
import RightIcon from '@material-ui/icons/ChevronRight';

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebookSquare,
	faTwitterSquare,
	faInstagram,
	faLine,
	faWeixin,
	faWhatsappSquare,
	faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

//styles
import styles from './styles';

const initialState = {
	_id: '',
	user: '',
	name: '',
	email: '',
	password: '',
	confirm: '',
	role: 'Traveller',
	profilePic: '',
	telephone: '',
	mobile: '',
	addressLine01: '',
	addressLine02: '',
	city: '',
	state: '',
	country: '',
	zipcode: '',
	facebook: '',
	twitter: '',
	line: '',
	wechat: '',
	whatsapp: '',
	linkedin: '',
	instagram: '',
	productNews: true,
	websiteNews: true,
	guideNews: true,
	agentNews: true,
	competitionNews: true,
	value: 0,
	errors: {},
	success: false,
	disabled: false,
};

export class TravellerRegistration extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onChangeTab = this.onChangeTab.bind(this);
		this.onChangeToggle = this.onChangeToggle.bind(this);
		this.onClickNextSlide = this.onClickNextSlide.bind(this);
		this.onError = this.onError.bind(this);
	}

	componentDidMount() {
		if (this.props.params.id) {
			this.props.travellerGetById(this.props.params.id);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors,
				disabled: false,
			});
		}

		if (nextProps.params) {
			this.setState({ params: nextProps.params });
		}

		if (nextProps.traveller) {
			const travellerUpdate = nextProps.traveller.traveller;
			travellerUpdate._id = !isEmpty(travellerUpdate._id)
				? travellerUpdate._id
				: initialState._id;
			travellerUpdate.user = !isEmpty(travellerUpdate.user)
				? travellerUpdate.user
				: initialState.user;
			travellerUpdate.name = !isEmpty(travellerUpdate.name)
				? travellerUpdate.name
				: initialState.name;
			travellerUpdate.email = !isEmpty(travellerUpdate.email)
				? travellerUpdate.email
				: initialState.email;
			travellerUpdate.password = 'nochange';
			travellerUpdate.confirm = 'nochange';
			travellerUpdate.profilePic = !isEmpty(travellerUpdate.profilePic)
				? travellerUpdate.profilePic
				: initialState.profilePic;
			travellerUpdate.telephone = !isEmpty(travellerUpdate.telephone)
				? travellerUpdate.telephone
				: initialState.telephone;
			travellerUpdate.mobile = !isEmpty(travellerUpdate.mobile)
				? travellerUpdate.mobile
				: initialState.mobile;
			travellerUpdate.addressLine01 = !isEmpty(
				travellerUpdate.addressLine01
			)
				? travellerUpdate.addressLine01
				: initialState.addressLine01;
			travellerUpdate.addressLine02 = !isEmpty(
				travellerUpdate.addressLine02
			)
				? travellerUpdate.addressLine02
				: initialState.addressLine02;
			travellerUpdate.city = !isEmpty(travellerUpdate.city)
				? travellerUpdate.city
				: initialState.city;
			travellerUpdate.state = !isEmpty(travellerUpdate.state)
				? travellerUpdate.state
				: initialState.state;
			travellerUpdate.country = !isEmpty(travellerUpdate.country)
				? travellerUpdate.country
				: initialState.country;
			travellerUpdate.zipcode = !isEmpty(travellerUpdate.zipcode)
				? travellerUpdate.zipcode
				: initialState.zipcode;
			travellerUpdate.facebook = !isEmpty(travellerUpdate.facebook)
				? travellerUpdate.facebook
				: initialState.facebook;
			travellerUpdate.twitter = !isEmpty(travellerUpdate.twitter)
				? travellerUpdate.twitter
				: initialState.twitter;
			travellerUpdate.line = !isEmpty(travellerUpdate.line)
				? travellerUpdate.line
				: initialState.line;
			travellerUpdate.wechat = !isEmpty(travellerUpdate.wechat)
				? travellerUpdate.wechat
				: initialState.wechat;
			travellerUpdate.whatsapp = !isEmpty(travellerUpdate.whatsapp)
				? travellerUpdate.whatsapp
				: initialState.whatsapp;
			travellerUpdate.linkedin = !isEmpty(travellerUpdate.linkedin)
				? travellerUpdate.linkedin
				: initialState.linkedin;
			travellerUpdate.instagram = !isEmpty(travellerUpdate.instagram)
				? travellerUpdate.instagram
				: initialState.instagram;
			travellerUpdate.productNews = !isEmpty(travellerUpdate.productNews)
				? travellerUpdate.productNews
				: initialState.productNews;
			travellerUpdate.agentNews = !isEmpty(travellerUpdate.agentNews)
				? travellerUpdate.agentNews
				: initialState.agentNews;
			travellerUpdate.guideNews = !isEmpty(travellerUpdate.guideNews)
				? travellerUpdate.guideNews
				: initialState.guideNews;
			travellerUpdate.websiteNews = !isEmpty(travellerUpdate.websiteNews)
				? travellerUpdate.websiteNews
				: initialState.websiteNews;
			travellerUpdate.competitionNews = !isEmpty(
				travellerUpdate.competitionNews
			)
				? travellerUpdate.competitionNews
				: initialState.competitionNews;

			this.setState({
				_id: this.state._id,
				user: this.state.user,
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				confirm: this.state.confirm,
				role: 'Traveller',
				profilePic: this.state.profilePic,
				telephone: this.state.telephone,
				mobile: this.state.mobile,
				addressLine01: this.state.addressLine01,
				addressLine02: this.state.addressLine02,
				city: this.state.city,
				state: this.state.state,
				country: this.state.country,
				zipcode: this.state.zipcode,
				facebook: this.state.facebook,
				twitter: this.state.twitter,
				line: this.state.line,
				wechat: this.state.wechat,
				whatsapp: this.state.whatsapp,
				linkedin: this.state.linkedin,
				instagram: this.state.instagram,
				productNews: this.state.productNews,
				websiteNews: this.state.websiteNews,
				guideNews: this.state.guideNews,
				agentNews: this.state.agentNews,
				competitionNews: this.state.competitionNews,
			});
		}
	}

	onSubmit = event => {
		event.preventDefault();

		// disable submit button
		this.setState({ disabled: true });

		const newTraveller = {
			_id: this.state._id,
			user: this.state.user,
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			confirm: this.state.confirm,
			role: this.state.role,
			profilePic: this.state.profilePic,
			telephone: this.state.telephone,
			mobile: this.state.mobile,
			addressLine01: this.state.addressLine01,
			addressLine02: this.state.addressLine02,
			city: this.state.city,
			state: this.state.state,
			country: this.state.country,
			zipcode: this.state.zipcode,
			facebook: this.state.facebook,
			twitter: this.state.twitter,
			line: this.state.line,
			wechat: this.state.wechat,
			whatsapp: this.state.whatsapp,
			linkedin: this.state.linkedin,
			instagram: this.state.instagram,
			productNews: this.state.productNews,
			websiteNews: this.state.websiteNews,
			guideNews: this.state.guideNews,
			agentNews: this.state.agentNews,
			competitionNews: this.state.competitionNews,
		};

		this.props.travellerUpdate(newTraveller);
	};

	onChangeTab = (event, value) => {
		this.setState({ value });
	};

	onClickNextSlide = () => {
		this.setState(prevState => {
			return { value: prevState.value + 1 };
		});
	};

	onChangeToggle = event => {
		this.setState({
			[event.target.name]: event.target.checked,
		});
	};

	onChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
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
		const { classes, theme } = this.props;
		const { errors } = this.state;
		const { isSuccess } = this.props.traveller;

		///////////////////////////////////////////////////
		///////////////////////////////////////////////////
		//TAB MENUS
		///////////////////////////////////////////////////
		///////////////////////////////////////////////////

		const TabMenu = (
			<AppBar position="static" color="default">
				<Tabs
					value={this.state.value}
					onChange={this.onChangeTab}
					indicatorColor="primary"
					textColor="primary"
				>
					<Tab label="Required Information" />
					<Tab label="Contact Information" />
					<Tab label="Social Media &amp; Subscriptions" />
				</Tabs>
			</AppBar>
		);

		///////////////////////////////////////////////////
		///////////////////////////////////////////////////
		//DIALOG BOX - MISSING ID
		///////////////////////////////////////////////////
		///////////////////////////////////////////////////

		const dialogMissingId = (
			<Dialog
				open={!this.props.params.id}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{'Traveller Not Found'}
				</DialogTitle>

				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						The Traveller you are attempting to update could not be
						found.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						color="primary"
						autoFocus
						component={Link}
						to="/admin/travellers"
					>
						GO BACK
					</Button>
				</DialogActions>
			</Dialog>
		);

		///////////////////////////////////////////////////
		///////////////////////////////////////////////////
		//DIALOG BOX - SUCCESS
		///////////////////////////////////////////////////
		///////////////////////////////////////////////////

		const dialogSuccess = (
			<Dialog
				open={isSuccess}
				onClose={this.onClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{'Traveller Updated'}
				</DialogTitle>

				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						A Traveller Account has been sucessfully updated
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={this.onClose}
						color="primary"
						autoFocus
						component={Link}
						to="/admin/travellers"
					>
						OK
					</Button>
				</DialogActions>
			</Dialog>
		);

		///////////////////////////////////////////////////
		///////////////////////////////////////////////////
		//NEWSLETTERS
		///////////////////////////////////////////////////
		///////////////////////////////////////////////////

		const newsletterForm = (
			<React.Fragment>
				<Divider className={classes.divider} />
				<Grid container justify="flex-start">
					<Grid item xs={12} sm={12} md={2} xl={2}>
						<Typography
							variant="body2"
							className={classes.mobilePadding}
						>
							Subscriptions
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={3} xl={3}>
						<FormGroup row>
							<FormControlLabel
								control={
									<Switch
										checked={this.state.productNews}
										onChange={this.onChangeToggle}
										name="productNews"
										value="true"
									/>
								}
								label="Product News"
							/>
						</FormGroup>
					</Grid>
					<Grid item xs={12} sm={6} md={3} xl={3}>
						<FormGroup row>
							<FormControlLabel
								control={
									<Switch
										checked={this.state.websiteNews}
										onChange={this.onChangeToggle}
										name="websiteNews"
										value="true"
									/>
								}
								label="Website News"
							/>
						</FormGroup>
					</Grid>
					<Grid item xs={12} sm={6} md={3} xl={3}>
						<FormGroup row>
							<FormControlLabel
								control={
									<Switch
										checked={this.state.guideNews}
										onChange={this.onChangeToggle}
										name="guideNews"
										value="true"
									/>
								}
								label="Tour Guide News"
							/>
						</FormGroup>
					</Grid>
					<Grid item xs={false} md={2} xl={2} />
					<Grid item xs={12} sm={6} md={3} xl={3}>
						<FormGroup row>
							<FormControlLabel
								control={
									<Switch
										checked={this.state.agentNews}
										onChange={this.onChangeToggle}
										name="agentNews"
										value="true"
									/>
								}
								label="Tour Agent News"
							/>
						</FormGroup>
					</Grid>
					<Grid item xs={12} sm={6} md={3} xl={3}>
						<FormGroup row>
							<FormControlLabel
								control={
									<Switch
										checked={this.state.competitionNews}
										onChange={this.onChangeToggle}
										name="competitionNews"
										value="true"
									/>
								}
								label="Competition News"
							/>
						</FormGroup>
					</Grid>
				</Grid>
			</React.Fragment>
		);

		///////////////////////////////////////////////////
		///////////////////////////////////////////////////
		//SOCIAL MEDIA
		///////////////////////////////////////////////////
		///////////////////////////////////////////////////

		const socialMediaForm = (
			<React.Fragment>
				<Grid container justify="flex-start">
					<Grid item xs={12} sm={12} md={2} xl={2}>
						<Typography
							variant="body2"
							className={classes.mobilePadding}
						>
							Social Media
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={5} xl={5}>
						<TextField
							error={this.onError('facebook')}
							name="facebook"
							id="facebook"
							label="Facebook"
							placeholder="http://www.facebook.com"
							value={this.state.facebook}
							onChange={this.onChange}
							helperText={errors.facebook}
							className={classes.textField}
							fullWidth
							InputLabelProps={{ shrink: true }}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<FontAwesomeIcon
											icon={faFacebookSquare}
											size="lg"
										/>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={5} xl={5}>
						<TextField
							error={this.onError('twitter')}
							name="twitter"
							id="twitter"
							label="Twitter"
							placeholder="http://www.twitter.com"
							value={this.state.twitter}
							onChange={this.onChange}
							helperText={errors.twitter}
							className={classes.textField}
							fullWidth
							InputLabelProps={{ shrink: true }}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<FontAwesomeIcon
											icon={faTwitterSquare}
											size="lg"
										/>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
				</Grid>
				<Grid container justify="flex-start">
					<Grid item xs={12} sm={12} md={2} xl={2} />
					<Grid item xs={12} sm={12} md={5} xl={5}>
						<TextField
							error={this.onError('line')}
							name="line"
							id="line"
							label="Line"
							placeholder="https://line.me"
							value={this.state.line}
							onChange={this.onChange}
							helperText={errors.line}
							className={classes.textField}
							fullWidth
							InputLabelProps={{ shrink: true }}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<FontAwesomeIcon
											icon={faLine}
											size="lg"
										/>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={5} xl={5}>
						<TextField
							error={this.onError('wechat')}
							name="wechat"
							id="wechat"
							label="WeChat"
							placeholder="https://web.wechat.com/"
							value={this.state.wechat}
							onChange={this.onChange}
							helperText={errors.wechat}
							className={classes.textField}
							fullWidth
							InputLabelProps={{ shrink: true }}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<FontAwesomeIcon
											icon={faWeixin}
											size="lg"
										/>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
				</Grid>
				<Grid container justify="flex-start">
					<Grid item xs={12} sm={12} md={2} xl={2} />
					<Grid item xs={12} sm={12} md={5} xl={5}>
						<TextField
							error={this.onError('whatsapp')}
							name="whatsapp"
							id="whatsapp"
							label="Whatsapp"
							placeholder="https://web.whatsapp.com/"
							value={this.state.whatsapp}
							onChange={this.onChange}
							helperText={errors.whatsapp}
							className={classes.textField}
							fullWidth
							InputLabelProps={{ shrink: true }}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<FontAwesomeIcon
											icon={faWhatsappSquare}
											size="lg"
										/>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={5} xl={5}>
						<TextField
							error={this.onError('linkedin')}
							name="linkedin"
							id="linkedin"
							label="linkedin"
							placeholder="https://www.linkedin.com/"
							value={this.state.linkedin}
							onChange={this.onChange}
							helperText={errors.linkedin}
							className={classes.textField}
							fullWidth
							InputLabelProps={{ shrink: true }}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<FontAwesomeIcon
											icon={faLinkedin}
											size="lg"
										/>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
				</Grid>
				<Grid container justify="flex-start">
					<Grid item xs={12} sm={12} md={2} xl={2} />
					<Grid item xs={12} sm={12} md={5} xl={5}>
						<TextField
							error={this.onError('instagram')}
							name="instagram"
							id="instagram"
							label="Instagram"
							placeholder="https://www.instagram.com/"
							value={this.state.instagram}
							onChange={this.onChange}
							helperText={errors.instagram}
							className={classes.textField}
							fullWidth
							InputLabelProps={{ shrink: true }}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<FontAwesomeIcon
											icon={faInstagram}
											size="lg"
										/>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
				</Grid>
			</React.Fragment>
		);

		///////////////////////////////////////////////////
		///////////////////////////////////////////////////
		//CONACT INFORMATION
		///////////////////////////////////////////////////
		///////////////////////////////////////////////////

		const contactInformForm = (
			<React.Fragment>
				<Grid container justify="flex-start">
					<Grid item xs={12} sm={12} md={2} xl={2}>
						<Typography
							variant="body2"
							className={classes.mobilePadding}
						>
							Contact Numbers
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={5} xl={5}>
						<TextField
							error={this.onError('telephone')}
							name="telephone"
							id="telephone"
							label="Telephone"
							placeholder=""
							value={this.state.telephone}
							onChange={this.onChange}
							helperText={errors.telephone}
							className={classes.textField}
							type="telephone"
							fullWidth
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={5} xl={2}>
						<TextField
							error={this.onError('mobile')}
							name="mobile"
							id="mobile"
							label="Mobile"
							placeholder=""
							value={this.state.mobile}
							onChange={this.onChange}
							helperText={errors.mobile}
							className={classes.textField}
							type="telephone"
							fullWidth
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
					<Grid item xs={12} sm={12} md={2} xl={2}>
						<Typography
							variant="body2"
							className={classes.mobilePadding}
						>
							Contact Address
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={10} xl={10}>
						<TextField
							error={this.onError('addressLine01')}
							name="addressLine01"
							id="addressLine01"
							label="Address"
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
				<Grid
					container
					justify="flex-start"
					className={classes.gridPadding}
				>
					<Grid item xs={12} sm={12} md={2} xl={2} />
					<Grid item xs={12} sm={12} md={10} xl={10}>
						<TextField
							error={this.onError('addressLine02')}
							name="addressLine02"
							id="addressLine02"
							placeholder=""
							value={this.state.addressLine02}
							onChange={this.onChange}
							helperText={errors.addressLine02}
							className={classes.textField}
							fullWidth
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
				</Grid>
				<Grid
					container
					justify="flex-start"
					className={classes.gridPadding}
				>
					<Grid item xs={12} sm={12} md={2} xl={2} />
					<Grid item xs={12} sm={12} md={5} xl={5}>
						<TextField
							error={this.onError('city')}
							name="city"
							id="city"
							label="City"
							placeholder=""
							value={this.state.city}
							onChange={this.onChange}
							helperText={errors.city}
							className={classes.textField}
							fullWidth
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={5} xl={5}>
						<TextField
							error={this.onError('state')}
							name="state"
							id="state"
							label="State"
							placeholder=""
							value={this.state.state}
							onChange={this.onChange}
							helperText={errors.state}
							className={classes.textField}
							fullWidth
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
				</Grid>
				<Grid
					container
					justify="flex-start"
					className={classes.gridPadding}
				>
					<Grid item xs={12} sm={12} md={2} xl={2} />
					<Grid item xs={12} sm={12} md={5} xl={5}>
						<TextField
							error={this.onError('country')}
							name="country"
							id="country"
							label="Country"
							placeholder=""
							value={this.state.country}
							onChange={this.onChange}
							helperText={errors.country}
							className={classes.textField}
							fullWidth
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={2} xl={2}>
						<TextField
							error={this.onError('zipcode')}
							name="zipcode"
							id="zipcode"
							label="Zip/Post Code"
							placeholder=""
							value={this.state.zipcode}
							onChange={this.onChange}
							helperText={errors.zipcode}
							className={classes.textField}
							InputLabelProps={{ shrink: true }}
							fullWidth
						/>
					</Grid>
				</Grid>
			</React.Fragment>
		);

		///////////////////////////////////////////////////
		///////////////////////////////////////////////////
		//ACCOUNT INFORMATION
		///////////////////////////////////////////////////
		///////////////////////////////////////////////////

		const accountRegistration = (
			<React.Fragment>
				<Grid container justify="flex-start">
					<Grid item xs={12} sm={12} md={2} xl={2}>
						<Typography
							variant="body2"
							className={classes.mobilePadding}
						>
							Name
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={10} xl={10}>
						<TextField
							error={this.onError('name')}
							name="name"
							id="name"
							placeholder="Name"
							value={this.state.name}
							onChange={this.onChange}
							helperText={errors.name}
							className={classes.textField}
							InputLabelProps={{ shrink: true }}
							fullWidth
						/>
					</Grid>
				</Grid>

				<Grid
					container
					justify="flex-start"
					className={classes.gridPadding}
				>
					<Grid item xs={12} sm={12} md={2} xl={2}>
						<Typography
							variant="body2"
							className={classes.mobilePadding}
						>
							Email Address
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={10} xl={10}>
						<TextField
							disabled
							error={this.onError('email')}
							name="email"
							id="email"
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
				</Grid>
				<Divider className={classes.divider} />
				<Grid
					container
					justify="flex-start"
					className={classes.gridPadding}
				>
					<Grid item xs={12} sm={12} md={2} xl={2}>
						<Typography
							variant="body2"
							className={classes.mobilePadding}
						>
							Password
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={5} xl={5}>
						<TextField
							error={this.onError('password')}
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
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
				</Grid>
				<Grid
					container
					justify="flex-start"
					className={classes.gridPadding}
				>
					<Grid item xs={12} sm={12} md={2} xl={2} />
					<Grid item xs={12} sm={12} md={5} xl={5}>
						<TextField
							error={this.onError('confirm')}
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
							InputLabelProps={{ shrink: true }}
						/>
					</Grid>
				</Grid>
			</React.Fragment>
		);

		return (
			<React.Fragment>
				{TabMenu}
				<Paper className={classes.root} square elevation={4}>
					<form
						noValidate
						className={classes.container}
						autoComplete="off"
						onSubmit={this.onSubmit}
					>
						<SwipeableViews
							axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
							index={this.state.value}
							onChangeIndex={this.handleChangeIndex}
							containerStyle={styles.slideContainer}
							animateHeight
						>
							<TabContainer
								dir={theme.direction}
								className={classnames(
									classes.root,
									classes.slide
								)}
							>
								{accountRegistration}
							</TabContainer>
							<TabContainer
								dir={theme.direction}
								className={classnames(
									classes.root,
									classes.slide
								)}
							>
								{contactInformForm}
							</TabContainer>
							<TabContainer
								dir={theme.direction}
								className={classnames(
									classes.root,
									classes.slide
								)}
							>
								{socialMediaForm}
								{newsletterForm}
							</TabContainer>
						</SwipeableViews>
						<Divider className={classes.divider} />
						<Grid
							container
							justify="flex-start"
							className={classes.gridPadding}
						>
							<Grid item xs={12} sm={12} md={2} xl={2} />
							<Grid item xs={12} sm={12} md={10} xl={10}>
								<Button
									type="submit"
									variant="contained"
									size="small"
									className={classes.button}
									color="secondary"
									disabled={this.state.disabled}
								>
									Update
									<CreateIcon className={classes.rightIcon} />
								</Button>
								{this.state.value < 2 ? (
									<Button
										type="button"
										variant="outlined"
										size="small"
										className={classes.button}
										color="secondary"
										onClick={this.onClickNextSlide}
									>
										Next Slide
										<RightIcon
											className={classes.rightIcon}
										/>
									</Button>
								) : null}
							</Grid>
						</Grid>
					</form>
					{dialogSuccess}
					{dialogMissingId}
				</Paper>
			</React.Fragment>
		);
	}
}

TravellerRegistration.propTypes = {
	travellerUpdate: PropTypes.func.isRequired,
	travellerGetById: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	traveller: PropTypes.object.isRequired,
	params: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	const matchSelector = createMatchSelector({
		path: '/admin/travellers/update/:id',
	});
	const match = matchSelector(state);

	return {
		errors: state.errors,
		traveller: state.traveller,
		params: match.params,
	};
};

export default connect(
	mapStateToProps,
	{ travellerUpdate, travellerGetById }
)(withStyles(styles, { withTheme: true })(TravellerRegistration));
