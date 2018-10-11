import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

//material ui
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

//components
import BtnAdd from '../../Buttons/Btn_Add_Float';
import AdminUserTable from '../../Tables/AdminUserTable/AdminUserTable';

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
	render() {
		const { classes, theme } = this.props;

		// update state based on if ID is present

		const NavBar = (
			<div className={classes.appBar}>
				<AppBar position="static" color="default">
					<Toolbar>
						<Typography
							className={classes.grow}
							variant="button"
							color="primary"
						>
							LIST OF ADMINISTRATORS
						</Typography>
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
						<AdminUserTable />
					</TabContainer>
				</SwipeableViews>

				<BtnAdd
					color="primary"
					tooltip="Create Administrator"
					redirect="/admin/administrators/create"
				/>
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
