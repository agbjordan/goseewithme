import React from "react";
import PropTypes from "prop-types";

//material ui
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";

//components
import PaginationActions from "../Tables/TablePaginationActions";

//styles
const styles = theme => ({
  root: {
    width: "100%"
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  },
  rows: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
      border: "none"
    },
    "&:nth-of-type(even)": {
      border: "none"
    }
  },
  tableHead: {
    backgroundColor: "#eeeeee",
    border: "none"
  }
});

//functions
let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

class AdminUserTable extends React.Component {
  state = {
    rows: [
      createData("Cupcake", 305, 3.7),
      createData("Donut", 452, 25.0),
      createData("Eclair", 262, 16.0),
      createData("Frozen yoghurt", 159, 6.0),
      createData("Gingerbread", 356, 16.0),
      createData("Honeycomb", 408, 3.2),
      createData("Ice cream sandwich", 237, 9.0),
      createData("Jelly Bean", 375, 0.0),
      createData("KitKat", 518, 26.0),
      createData("Lollipop", 392, 0.2),
      createData("Marshmallow", 318, 0),
      createData("Nougat", 360, 19.0),
      createData("Oreo", 437, 18.0)
    ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
    page: 0,
    rowsPerPage: 5
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Paper className={classes.root} square elevation={4}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={PaginationActions}
                />
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow className={classes.tableHead}>
                <TableCell>Product Name</TableCell>
                <TableCell numeric>Calories</TableCell>
                <TableCell numeric>Fat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow className={classes.rows} key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell numeric>{row.calories}</TableCell>
                      <TableCell numeric>{row.fat}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={PaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

AdminUserTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminUserTable);
