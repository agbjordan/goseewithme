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

export default styles;
