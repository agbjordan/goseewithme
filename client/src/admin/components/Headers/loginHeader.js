import React from 'react';
import PropTypes from 'prop-types';

//material ui
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

//default styles
const styles = theme => ({
	root: {
		flexGrow: 1,
		zIndex: 1,
		position: 'relative',
		display: 'flex',
		height: '100%',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36,
	},
});

class LoginHeader extends React.Component {
	render() {
		const { classes } = this.props;

		const HeaderBar = (
			<AppBar position="absolute" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="title" color="inherit" noWrap>
						Administration
					</Typography>
				</Toolbar>
			</AppBar>
		);

		return (
			<CssBaseline>
				<div className={classes.root}>{HeaderBar}</div>
			</CssBaseline>
		);
	}
}

LoginHeader.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(LoginHeader);
