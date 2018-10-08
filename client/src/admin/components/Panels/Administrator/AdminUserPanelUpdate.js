import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { Link } from 'react-router-dom';

//material ui
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//components
import BtnAdd from '../../Buttons/Btn_Add_Float';
import AdminUpdate from '../../Forms/AdministratorForms/AdminUpdate';

//styles
const styles = theme => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: '100%',
	},
	grow: {
		flexGrow: 1,
	},
	appBar: {
		paddingTop: theme.spacing.unit * 2,
	},
	table: {
		minWidth: 500,
	},
	tableWrapper: {
		overflowX: 'auto',
	},
	swipeableViews: {
		width: `calc(100% + ${theme.spacing.unit}px * 4)`,
		marginLeft: theme.spacing.unit * -2,
		marginRight: theme.spacing.unit * -2,
	},
});

//functions
const TabContainer = ({ children, dir }) => {
	return (
		<Typography
			component="div"
			dir={dir}
			style={{ padding: 8 * 2, marginTop: 8 }}
		>
			{children}
		</Typography>
	);
};

//default class
class AdminUsersPanelDefault extends React.Component {
	state = {
		value: 0,
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes, theme } = this.props;

		const NavBar = (
			<div className={classes.appBar}>
				<AppBar position="static" color="default">
					<Toolbar>
						<Typography
							className={classes.grow}
							variant="button"
							color="primary"
						>
							UPDATE AN ADMINISTRATOR
						</Typography>
						<Button
							label="BACK TO LIST"
							value={1}
							component={Link}
							to="/admin/administrators"
						>
							BACK TO LIST
						</Button>
					</Toolbar>
				</AppBar>
			</div>
		);

		return (
			<React.Fragment>
				<Typography variant="headline" gutterBottom>
					Administrative Users
				</Typography>
				<Divider />
				{NavBar}
				<SwipeableViews className={classes.swipeableViews}>
					<TabContainer dir={theme.direction}>
						<AdminUpdate />
					</TabContainer>
				</SwipeableViews>
				<BtnAdd color="primary" tooltip="Update Administrator" />
			</React.Fragment>
		);
	}
}

//prop-types
AdminUsersPanelDefault.propTypes = {
	classes: PropTypes.object.isRequired,
};

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
	dir: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(AdminUsersPanelDefault);
