const styles = theme => ({
	root: {
		width: '100%',
		padding: theme.spacing.unit * 5,
	},
	container: {
		width: '100%',
	},
	textField: {
		paddingRight: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
	},
	divider: {
		marginTop: theme.spacing.unit * 3,
		marginBottom: theme.spacing.unit * 4,
	},
	group: {
		marginBottom: theme.spacing.unit * 2,
	},
	switch: {
		width: '180px',
	},
	button: {
		padding: `1ex 2.5ex 1ex 3ex`,
		marginRight: theme.spacing.unit * 2,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit * 2,
	},
	iconSmall: {
		fontSize: 20,
	},
	mobilePadding: {
		[theme.breakpoints.down('md')]: {
			marginBottom: theme.spacing.unit * 2,
		},
	},
	slideContainer: {
		height: 100,
		WebkitOverflowScrolling: 'touch', // iOS momentum scrolling
	},
});

export default styles;
