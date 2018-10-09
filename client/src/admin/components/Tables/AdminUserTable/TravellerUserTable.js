import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import React from 'react';
import Spinner from '../../Spinner';

import {
	redirect,
	travellerClear,
	travellerDelete,
	travellerGetAll,
} from '../../../../actions/travellerActions';

//material ui
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
//icons
import CardTravelIcon from '@material-ui/icons/CardTravel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import ReviewIcon from '@material-ui/icons/Stars';
import TransactionIcon from '@material-ui/icons/MonetizationOn';

//components
import PaginationActions from './TablePaginationActions';

//styles
import styles from './styles';

////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

class TravellerUserTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			travellerss: {},
			page: 0,
			rowsPerPage: 10,
			travellerDeleteId: '',
			showDeleteDialog: false,
			order: 'asc',
			orderBy: 'calories',
		};

		this.handleClickDelete = this.handleClickDelete.bind(this);
		this.handleClickUpdate = this.handleClickUpdate.bind(this);
		this.handleClickBookings = this.handleClickBookings.bind(this);
		this.handleClickReviews = this.handleClickReviews.bind(this);
		this.handleClickTransactions = this.handleClickTransactions.bind(this);
		this.handleShowDialog = this.handleShowDialog.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleChangePage = this.handleChangePage.bind(this);
		this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
	}

	componentWillMount() {
		this.props.travellerGetAll();
		this.props.travellerClear();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.travellers) {
			this.setState({ traveller: nextProps.traveller });
		}
	}

	handleClickBookings = value => {
		this.props.redirect(`/admin/bookings/u/${value}`);
	};

	handleClickReviews = value => {
		this.props.redirect(`/admin/reviews/u/${value}`);
	};

	handleClickTransactions = value => {
		this.props.redirect(`/admin/transactions/u/${value}`);
	};

	handleClickUpdate = value => {
		this.props.redirect(`/admin/travellers/update/${value}`);
	};

	handleClickDelete = value => {
		this.setState({ showDeleteDialog: true, travellerDeleteId: value });
	};

	handleShowDialog = () => {
		this.setState({ showDeleteDialog: false, travellerDeleteId: '' });
	};

	handleDelete = value => {
		this.props.travellerDelete(value);
		this.props.travellerGetAll();
		this.props.travellerClear();
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
		const { travellers, loading } = this.props.traveller;

		let count = 0;
		if (travellers && travellers.length > 0) {
			count = travellers.length;
		}

		const DialogDelete = (
			<Dialog
				open={showDeleteDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{'Delete Traveller Account'}
				</DialogTitle>

				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete this Traveller?
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
							this.handleDelete(this.state.travellerDeleteId)
						}
						color="secondary"
						autoFocus
					>
						DELETE
					</Button>
				</DialogActions>
			</Dialog>
		);

		const TravellerUserTable = (
			<div className={classes.tableWrapper}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TablePagination
								colSpan={5}
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
							<TableCell className={classes.cellLogin} numeric>
								Logins
							</TableCell>
							<TableCell className={classes.cellDate} numeric>
								Last Login
							</TableCell>
							<TableCell className={classes.cellAction} numeric />
						</TableRow>
					</TableHead>
					<TableBody>
						{travellers && Object.keys(travellers).length > 0 ? (
							travellers
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row, i) => {
									return (
										<TableRow
											className={classes.rows}
											key={i}
										>
											<TableCell
												className={classes.cellName}
												scope="row"
											>
												{row.name}
											</TableCell>
											<TableCell
												className={classes.cellEmail}
											>
												{row.email}
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
												<IconButton aria-label="Bookings">
													<CardTravelIcon
														onClick={() =>
															this.handleClickBookings(
																row._id
															)
														}
													/>
												</IconButton>
												<IconButton aria-label="Reviews">
													<ReviewIcon
														onClick={() =>
															this.handleClickReviews(
																row._id
															)
														}
													/>
												</IconButton>
												<IconButton aria-label="Transactions">
													<TransactionIcon
														onClick={() =>
															this.handleClickTransactions(
																row._id
															)
														}
													/>
												</IconButton>
												<IconButton aria-label="Edit">
													<EditIcon
														onClick={() =>
															this.handleClickUpdate(
																row._id
															)
														}
													/>
												</IconButton>
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
								colSpan={5}
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

		let TravellerTable;
		if (travellers === null || loading === true) {
			TravellerTable = <Spinner />;
		} else {
			TravellerTable = TravellerUserTable;
		}

		return (
			<Paper className={classes.root} square elevation={4}>
				{TravellerTable}
			</Paper>
		);
	}
}

TravellerUserTable.propTypes = {
	classes: PropTypes.object.isRequired,
	redirect: PropTypes.func.isRequired,
	traveller: PropTypes.object.isRequired,
	travellerClear: PropTypes.func.isRequired,
	travellerDelete: PropTypes.func.isRequired,
	travellerGetAll: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
	traveller: state.traveller,
});

export default connect(
	mapStateToProps,
	{ redirect, travellerClear, travellerDelete, travellerGetAll }
)(withStyles(styles, { withTheme: true })(TravellerUserTable));
