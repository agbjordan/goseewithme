import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

//actions
import { adminLogout } from '../../../../actions/authActions';

//material ui
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
//icons
import AffiliateIcon from '@material-ui/icons/BusinessCenter';
import AgentIcon from '@material-ui/icons/AssignmentInd';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DraftsIcon from '@material-ui/icons/Drafts';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import GuideIcon from '@material-ui/icons/Face';
import InfluencerIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ReviewIcon from '@material-ui/icons/Stars';
import SettingsIcon from '@material-ui/icons/Settings';
import TransactionIcon from '@material-ui/icons/MonetizationOn';
import TravellerIcon from '@material-ui/icons/SentimentVerySatisfied';
import UsersIcon from '@material-ui/icons/SupervisedUserCircle';
import ViewListIcon from '@material-ui/icons/ViewList';

//default styles
import styles from './styles';

class AdminHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			notifications: 2,
			inbox: 15,
			bookings: 3,
			reviews: 2,
			transactions: 1,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth) {
			this.setState({ auth: nextProps.auth });
		}
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	handleLogout = async () => {
		await this.props.adminLogout();
	};

	render() {
		const { classes, theme, children } = this.props;
		const { adminIsAuthenticated } = this.props.auth;

		const HeaderBar = (
			<AppBar
				position="absolute"
				className={classNames(
					classes.appBar,
					this.state.open && classes.appBarShift
				)}
			>
				<Toolbar disableGutters={!this.state.open}>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						onClick={this.handleDrawerOpen}
						className={classNames(
							classes.menuButton,
							this.state.open && classes.hide
						)}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="title"
						color="inherit"
						noWrap
						className={classes.grow}
					>
						Administration
					</Typography>
					{adminIsAuthenticated ? (
						<Button
							type="submit"
							size="small"
							className={classNames(classes.btn_logout)}
							onClick={this.handleLogout}
						>
							Logout
							{'  '}
							<LogoutIcon
								className={classNames(
									classes.rightIcon,
									classes.icon_logout
								)}
							/>
						</Button>
					) : null}
				</Toolbar>
			</AppBar>
		);

		const CollaspingHeader = (
			<div className={classes.toolbar}>
				<IconButton onClick={this.handleDrawerClose}>
					{theme.direction === 'rtl' ? (
						<ChevronRightIcon />
					) : (
						<ChevronLeftIcon />
					)}
				</IconButton>
			</div>
		);

		const SectionDashboard = (
			<List>
				<ListItem button component={Link} to="/admin/">
					<Tooltip title="Dashboard" placement="right">
						<ListItemIcon>
							<DashboardIcon />
						</ListItemIcon>
					</Tooltip>
					<ListItemText primary="Dashboard" />
				</ListItem>
			</List>
		);

		const SectionNotifications = (
			<List>
				<ListItem button component={Link} to="/admin/notifications">
					<Tooltip title="Notifications" placement="right">
						<ListItemIcon>
							{this.state.notifications <= 0 ? (
								<NotificationsIcon />
							) : (
								<Badge
									badgeContent={this.state.notifications}
									color="primary"
								>
									<NotificationsActiveIcon />
								</Badge>
							)}
						</ListItemIcon>
					</Tooltip>
					<ListItemText primary="Notifications" />
				</ListItem>
				<ListItem button component={Link} to="/admin/inbox">
					<Tooltip title="Inbox" placement="right">
						<ListItemIcon>
							{this.state.inbox <= 0 ? (
								<MailIcon />
							) : (
								<Badge
									badgeContent={this.state.inbox}
									color="primary"
								>
									<DraftsIcon />
								</Badge>
							)}
						</ListItemIcon>
					</Tooltip>
					<ListItemText primary="Inbox" />
				</ListItem>
			</List>
		);

		const SectionBookings = (
			<List>
				<ListItem button component={Link} to="/admin/bookings">
					<Tooltip title="Bookings" placement="right">
						<ListItemIcon>
							{this.state.bookings <= 0 ? (
								<CardTravelIcon />
							) : (
								<Badge
									badgeContent={this.state.bookings}
									color="primary"
								>
									<CardTravelIcon />
								</Badge>
							)}
						</ListItemIcon>
					</Tooltip>
					<ListItemText primary="Bookings" />
				</ListItem>
				<ListItem button component={Link} to="/admin/products">
					<Tooltip title="Products" placement="right">
						<ListItemIcon>
							<ViewListIcon />
						</ListItemIcon>
					</Tooltip>
					<ListItemText primary="Products" />
				</ListItem>
				<ListItem button component={Link} to="/admin/reviews">
					<Tooltip title="Reivews" placement="right">
						<ListItemIcon>
							{this.state.reviews <= 0 ? (
								<ReviewIcon />
							) : (
								<Badge
									badgeContent={this.state.reviews}
									color="primary"
								>
									<ReviewIcon />
								</Badge>
							)}
						</ListItemIcon>
					</Tooltip>
					<ListItemText primary="Reviews" />
				</ListItem>
				<ListItem button component={Link} to="/admin/transactions">
					<Tooltip title="Transactions" placement="right">
						<ListItemIcon>
							{this.state.transactions <= 0 ? (
								<TransactionIcon />
							) : (
								<Badge
									badgeContent={this.state.transactions}
									color="primary"
								>
									<TransactionIcon />
								</Badge>
							)}
						</ListItemIcon>
					</Tooltip>
					<ListItemText primary="Transactions" />
				</ListItem>
			</List>
		);

		const SectionAccounts = (
			<React.Fragment>
				<List>
					<ListItem button component={Link} to="/admin/travellers">
						<Tooltip title="Travellers" placement="right">
							<ListItemIcon>
								<TravellerIcon />
							</ListItemIcon>
						</Tooltip>
						<ListItemText primary="Travellers" />
					</ListItem>
					<ListItem button component={Link} to="/admin/guides">
						<Tooltip title="Guides" placement="right">
							<ListItemIcon>
								<GuideIcon />
							</ListItemIcon>
						</Tooltip>
						<ListItemText primary="Guides" />
					</ListItem>
					<ListItem button component={Link} to="/admin/agents">
						<Tooltip title="Agents" placement="right">
							<ListItemIcon>
								<AgentIcon />
							</ListItemIcon>
						</Tooltip>
						<ListItemText primary="Agents" />
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem button component={Link} to="/admin/affiliates">
						<Tooltip title="Affiliates" placement="right">
							<ListItemIcon>
								<AffiliateIcon />
							</ListItemIcon>
						</Tooltip>
						<ListItemText primary="Affiliates" />
					</ListItem>
					<ListItem button component={Link} to="/admin/influencers">
						<Tooltip title="Influencers" placement="right">
							<ListItemIcon>
								<InfluencerIcon />
							</ListItemIcon>
						</Tooltip>
						<ListItemText primary="Influencers" />
					</ListItem>
				</List>
			</React.Fragment>
		);

		const SectionPersonal = (
			<List>
				<ListItem button component={Link} to="/admin/administrators">
					<Tooltip title="Administrators" placement="right">
						<ListItemIcon>
							<UsersIcon />
						</ListItemIcon>
					</Tooltip>
					<ListItemText primary="Administrators" />
				</ListItem>
				<ListItem button component={Link} to="/admin/settings">
					<Tooltip title="Settings" placement="right">
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
					</Tooltip>
					<ListItemText primary="Settings" />
				</ListItem>
			</List>
		);

		return (
			<CssBaseline>
				<div className={classes.root}>
					{HeaderBar}
					<div
						className={classNames(
							classes.drawerHideScroll,
							!this.state.open && classes.drawerHideScrollClose
						)}
					>
						<Drawer
							variant="permanent"
							classes={{
								docked: classNames(classes.drawer),
								paper: classNames(
									classes.drawerPaper,
									!this.state.open && classes.drawerPaperClose
								),
							}}
							open={this.state.open}
						>
							{CollaspingHeader}
							<Divider />
							{SectionDashboard}
							<Divider />
							{SectionNotifications}
							<Divider />
							{SectionBookings}
							<Divider />
							{SectionAccounts}
							<Divider />
							{SectionPersonal}
						</Drawer>
					</div>
					<main className={classes.content}>
						<div className={classes.toolbar} />
						{children}
					</main>
				</div>
			</CssBaseline>
		);
	}
}

AdminHeader.propTypes = {
	auth: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	adminLogout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(
	mapStateToProps,
	{ adminLogout }
)(withStyles(styles, { withTheme: true })(AdminHeader));
