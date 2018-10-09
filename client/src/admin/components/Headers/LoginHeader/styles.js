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

export default styles;
