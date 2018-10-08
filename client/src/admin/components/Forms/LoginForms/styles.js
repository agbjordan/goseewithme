//default styles
const styles = theme => ({
	root: {
		flexGrow: 1,
		zIndex: 1,
		position: 'relative',
		display: 'flex',
		height: '100%',
	},
	container: {
		width: '100%',
	},
	divider: {
		marginTop: theme.spacing.unit * 2,
		marginBottom: theme.spacing.unit * 3,
	},
	loginForm: {
		margin: 'auto',
		maxWidth: 500,
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
