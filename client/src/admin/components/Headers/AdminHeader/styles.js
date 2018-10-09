//default draw width
const drawerWidth = 240;
const drawerWidthClosed = 72;

const styles = theme => ({
	root: {
		flexGrow: 1,
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		height: '100%',
	},
	grow: {
		flexGrow: 1,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	button: {
		marginTop: theme.spacing.unit * 2,
		padding: `1ex 2.5ex 1ex 3ex`,
	},
	btn_logout: {
		color: theme.palette.common.white,
		marginTop: theme.spacing.unit / 2,
		marginRight: theme.spacing.unit * 2,
	},
	icon_logout: {
		color: theme.palette.common.white,
		marginLeft: theme.spacing.unit * 2,
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	drawerHideScroll: {
		height: '100%',
		width: `calc(${drawerWidth}px)`,
	},
	drawerHideScrollClose: {
		height: '100%',
		//overflowX: "hidden",
		width: 0,
		[theme.breakpoints.up('sm')]: {
			width: drawerWidthClosed,
		},
	},
	drawer: {
		height: '100%',
		//overflowX: "hidden"
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		//overflowX: "hidden",
		height: '100%',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		//overflowX: "hidden",
		height: '100%',
		width: 0,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		[theme.breakpoints.up('sm')]: {
			width: drawerWidthClosed,
			height: '100%',
			overflowX: 'hidden',
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingLeft: theme.spacing.unit * 1.6,
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidthClosed}px - (${
				theme.spacing.unit
			}px * 2))`,
		},
	},
});

export default styles;
