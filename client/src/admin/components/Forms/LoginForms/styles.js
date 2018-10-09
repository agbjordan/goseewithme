//default styles
const styles = theme => ({
	root: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		padding: theme.spacing.unit * 3,
	},
	container: {
		width: '100%',
	},
	divider: {
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 3,
	},
	loginForm: {
		maxWidth: 500,
	},
	button: {
		marginTop: theme.spacing.unit * 2,
		padding: `1ex 2.5ex 1ex 3ex`,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit,
	},
	textField: {
		paddingRight: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
	},
	mobilePadding: {
		[theme.breakpoints.down('md')]: {
			marginBottom: theme.spacing.unit * 2,
		},
	},
});

export default styles;
