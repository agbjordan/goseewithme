import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

class TabContainer extends Component {
	render() {
		const { dir, children } = this.props;

		return (
			<Typography component="div" dir={dir}>
				{children}
			</Typography>
		);
	}
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
	dir: PropTypes.string.isRequired,
};

export default TabContainer;
