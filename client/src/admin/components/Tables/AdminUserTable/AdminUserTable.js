import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Spinner from '../../Spinner';

import {
	adminGetAll,
	redirect,
	adminClear,
	adminDelete,
} from '../../../../actions/adminActions';

//material ui
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
//icons
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

//components
import PaginationActions from './TablePaginationActions';

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

////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

class AdminUserTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			admins: {},
			page: 0,
			rowsPerPage: 10,
			adminDeleteId: '',
			showDeleteDialog: false,
			order: 'asc',
			orderBy: 'calories',
		};

		this.handleClickDelete = this.handleClickDelete.bind(this);
		this.handleClickUpdate = this.handleClickUpdate.bind(this);
		this.handleShowDialog = this.handleShowDialog.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleChangePage = this.handleChangePage.bind(this);
		this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
	}

	componentWillMount() {
		this.props.adminGetAll();
		this.props.adminClear();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.admins) {
			this.setState({ admin: nextProps.admin });
		}
	}

	handleClickUpdate = value => {
		this.props.redirect(`/admin/administrators/update/${value}`);
	};

	handleClickDelete = value => {
		this.setState({ showDeleteDialog: true, adminDeleteId: value });
	};

	handleShowDialog = () => {
		this.setState({ showDeleteDialog: false, adminDeleteId: '' });
	};

	handleDelete = value => {
		this.props.adminDelete(value);
		this.props.adminGetAll();
		this.props.adminClear();
		this.handleShowDialog();
	};

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	render() {
		const { classes } = this.props;
		const { rowsPerPage, page, showDeleteDialog } = this.state;
		const { admins, loading } = this.props.admin;

		let count = 0;
		if (admins && admins.length > 0) {
			count = admins.length;
		}

		const DialogDelete = (
			<Dialog
				open={showDeleteDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{'Administrator Delete'}
				</DialogTitle>

				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete this Administrator
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={this.handleShowDialog}
						color="primary"
						autoFocus
					>
						CLOSE
					</Button>

					<Button
						onClick={() =>
							this.handleDelete(this.state.adminDeleteId)
						}
						color="secondary"
						autoFocus
					>
						DELETE
					</Button>
				</DialogActions>
			</Dialog>
		);

		const AdminUserTable = (
			<div className={classes.tableWrapper}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TablePagination
								colSpan={7}
								count={count}
								rowsPerPage={rowsPerPage}
								page={page}
								onChangePage={this.handleChangePage}
								onChangeRowsPerPage={
									this.handleChangeRowsPerPage
								}
								ActionsComponent={PaginationActions}
							/>
						</TableRow>
					</TableHead>
					<TableHead>
						<TableRow className={classes.tableHead}>
							<TableCell className={classes.cellName}>
								Name
							</TableCell>
							<TableCell className={classes.cellEmail}>
								Email
							</TableCell>
							<TableCell className={classes.cellRole}>
								Role
							</TableCell>
							<TableCell className={classes.cellLogin} numeric>
								Logins
							</TableCell>
							<TableCell className={classes.cellDate} numeric>
								Last Login
							</TableCell>
							<TableCell className={classes.cellAction} numeric />
							<TableCell className={classes.cellAction} numeric />
						</TableRow>
					</TableHead>
					<TableBody>
						{admins && Object.keys(admins).length > 0 ? (
							admins
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row, i) => {
									let name =
										row.firstname + ' ' + row.surname;
									return (
										<TableRow
											className={classes.rows}
											key={i}
										>
											<TableCell
												className={classes.cellName}
												scope="row"
											>
												{name}
											</TableCell>
											<TableCell
												className={classes.cellEmail}
											>
												{row.email}
											</TableCell>
											<TableCell
												className={classes.cellRole}
											>
												{row.userRole}
											</TableCell>
											<TableCell
												className={classes.cellLogin}
												numeric
											>
												{row.totalLogins}
											</TableCell>
											<TableCell
												className={classes.cellDate}
												numeric
											>
												<Moment format="DD MMM YYYY">
													{row.lastLogin}
												</Moment>
											</TableCell>
											<TableCell
												className={classes.cellAction}
												numeric
											>
												<IconButton aria-label="Edit">
													<EditIcon
														onClick={() =>
															this.handleClickUpdate(
																row._id
															)
														}
													/>
												</IconButton>
											</TableCell>
											<TableCell
												className={classes.cellAction}
												numeric
											>
												<IconButton aria-label="Delete">
													<DeleteForeverIcon
														onClick={() =>
															this.handleClickDelete(
																row._id
															)
														}
													/>
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})
						) : (
							<tr />
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								colSpan={7}
								count={count}
								rowsPerPage={rowsPerPage}
								page={page}
								onChangePage={this.handleChangePage}
								onChangeRowsPerPage={
									this.handleChangeRowsPerPage
								}
								ActionsComponent={PaginationActions}
							/>
						</TableRow>
					</TableFooter>
				</Table>
				{DialogDelete}
			</div>
		);

		let AdminTable;
		if (admins === null || loading === true) {
			AdminTable = <Spinner />;
		} else {
			AdminTable = AdminUserTable;
		}

		return (
			<Paper className={classes.root} square elevation={4}>
				{AdminTable}
			</Paper>
		);
	}
}

AdminUserTable.propTypes = {
	adminGetAll: PropTypes.func.isRequired,
	redirect: PropTypes.func.isRequired,
	adminClear: PropTypes.func.isRequired,
	adminDelete: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	admin: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
	admin: state.admin,
});

export default connect(
	mapStateToProps,
	{ adminGetAll, redirect, adminClear, adminDelete }
)(withStyles(styles, { withTheme: true })(AdminUserTable));
