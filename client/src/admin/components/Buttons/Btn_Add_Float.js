import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
	fab: {
		margin: theme.spacing.unit * 2,
	},
	absolute: {
		position: 'fixed',
		zIndex: 5000,
		bottom: theme.spacing.unit * 3,
		right: theme.spacing.unit * 3,
	},
});

function SimpleTooltips(props) {
	const { classes, tooltip, color, redirect } = props;
	return (
		<Tooltip title={tooltip} placement="left">
			<Button
				variant="fab"
				color={color}
				className={classes.absolute}
				component={Link}
				to={redirect}
			>
				<AddIcon />
			</Button>
		</Tooltip>
	);
}

SimpleTooltips.propTypes = {
	classes: PropTypes.object.isRequired,
	redirect: PropTypes.string.isRequired,
};

export default withStyles(styles)(SimpleTooltips);
