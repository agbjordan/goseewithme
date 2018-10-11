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
import TravellerUserTable from '../../Tables/AdminUserTable/TravellerUserTable';
import styles from './styles';

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
class TravellerPanelDefault extends React.Component {
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
							LIST OF TRAVELLER ACCOUNTS
						</Typography>
					</Toolbar>
				</AppBar>
			</div>
		);

		return (
			<React.Fragment>
				<Typography variant="headline" gutterBottom>
					Traveller Accounts
				</Typography>
				<Divider />
				{NavBar}

				<SwipeableViews className={classes.swipeableViews}>
					<TabContainer dir={theme.direction}>
						<TravellerUserTable />
					</TabContainer>
				</SwipeableViews>

				<BtnAdd
					color="primary"
					tooltip="Create Traveller Account"
					redirect="/admin/travellers/create"
				/>
			</React.Fragment>
		);
	}
}

//prop-types
TravellerPanelDefault.propTypes = {
	classes: PropTypes.object.isRequired,
};

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
	dir: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(TravellerPanelDefault);
