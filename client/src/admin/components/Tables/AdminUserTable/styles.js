//styles
const styles = theme => ({
	root: {
		width: '100%',
	},
	table: {
		minWidth: 500,
	},
	tableWrapper: {
		overflowX: 'auto',
	},
	cellName: {
		minWidth: 150,
		paddingLeft: 15,
		paddingRight: 25,
	},
	cellEmail: {
		paddingLeft: 15,
		paddingRight: 25,
	},
	cellRole: {
		minWidth: 150,
		paddingLeft: 15,
		paddingRight: 25,
	},
	cellLogin: {
		minWidth: 50,
		paddingLeft: 25,
		paddingRight: 15,
	},
	cellDate: {
		minWidth: 120,
		paddingLeft: 15,
		paddingRight: 25,
	},
	cellAction: {
		minWidth: 50,
		paddingLeft: 15,
		paddingRight: 0,
	},
	rows: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.background.default,
			border: 'none',
		},
		'&:nth-of-type(even)': {
			border: 'none',
		},
		'&:hover': {
			backgroundColor: theme.palette.grey.A100,
		},
	},
	tableHead: {
		backgroundColor: '#eeeeee',
		border: 'none',
	},
});

export default styles;
