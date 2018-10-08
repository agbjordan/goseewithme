import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Spinner from '../../Spinner';

import {
	travellerGetAll,
	redirect,
	travellerClear,
	travellerDelete,
} from '../../../../actions/travellerActions';

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
import CardTravelIcon from '@material-ui/icons/CardTravel';
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
								colSpan={9}
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
							<TableCell className={classes.cellAction} numeric />
							<TableCell className={classes.cellAction} numeric />
							<TableCell className={classes.cellAction} numeric />
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
													<CardTravelIcon
														component={Link}
														to={`/admin/bookings/u/${
															row._id
														}`}
													/>
												</IconButton>
											</TableCell>
											<TableCell
												className={classes.cellAction}
												numeric
											>
												<IconButton aria-label="Edit">
													<ReviewIcon
														component={Link}
														to={`/admin/reviews/u/${
															row._id
														}`}
													/>
												</IconButton>
											</TableCell>
											<TableCell
												className={classes.cellAction}
												numeric
											>
												<IconButton aria-label="Edit">
													<TransactionIcon
														component={Link}
														to={`/admin/transactions/u/${
															row._id
														}`}
													/>
												</IconButton>
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
								colSpan={9}
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
			console.log('loading');
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
	travellerGetAll: PropTypes.func.isRequired,
	redirect: PropTypes.func.isRequired,
	travellerClear: PropTypes.func.isRequired,
	travellerDelete: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	traveller: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
	traveller: state.traveller,
});

export default connect(
	mapStateToProps,
	{ travellerGetAll, redirect, travellerClear, travellerDelete }
)(withStyles(styles, { withTheme: true })(TravellerUserTable));
