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
import TravellerRegistration from '../../Forms/TravellerUserForms/TravellerAccountUpdate';
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
							UPDATE A TRAVELLER ACCOUNT
						</Typography>
						<Button
							label="BACK TO LIST"
							value={1}
							component={Link}
							to="/admin/travellers"
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
					Traveller Accounts
				</Typography>
				<Divider />
				{NavBar}
				<SwipeableViews className={classes.swipeableViews}>
					<TabContainer dir={theme.direction}>
						<TravellerRegistration />
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
