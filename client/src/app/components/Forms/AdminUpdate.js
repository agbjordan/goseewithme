import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createMatchSelector } from "connected-react-router";
import isEmpty from "../../../validation/is_Empty";
import Spinner from "../Spinner";

import { adminUpdate, adminGetById } from "../../../actions/adminActions";

//material ui
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
//icons
import CreateIcon from "@material-ui/icons/Create";

//styles
import styles from "./styles";

const initialState = {
  id: "",
  firstname: "",
  surname: "",
  email: "",
  password: "",
  confirm: "",
  userRole: "Administrator",
  customRoles: {
    bookings: true,
    products: true,
    reviews: true,
    transactions: true,
    travellers: true,
    guides: true,
    agents: true,
    affiliates: true,
    influencers: true,
    administrators: true,
    settings: false
  },
  errors: {
    firstname: "",
    surname: "",
    email: "",
    password: "",
    confirm: "",
    userRole: ""
  },
  success: false,
  missingId: false,
  doNotUpdate: false
};

export class AdminUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeToggle = this.onChangeToggle.bind(this);
    this.isError = this.isError.bind(this);
    this.capitalise = this.capitalise.bind(this);
  }

  componentDidMount() {
    if (this.props.params.id) {
      this.props.adminGetById(this.props.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.params) {
      this.setState({ params: nextProps.params });
    }

    if (nextProps.admin.admin && this.state.doNotUpdate === false) {
      const adminUpdate = nextProps.admin.admin;

      adminUpdate._id = !isEmpty(adminUpdate._id)
        ? adminUpdate._id
        : initialState.firstname;
      adminUpdate.firstname = !isEmpty(adminUpdate.firstname)
        ? adminUpdate.firstname
        : initialState.firstname;
      adminUpdate.surname = !isEmpty(adminUpdate.surname)
        ? adminUpdate.surname
        : initialState.surname;
      adminUpdate.email = !isEmpty(adminUpdate.email)
        ? adminUpdate.email
        : initialState.email;
      adminUpdate.password = "nochange";
      adminUpdate.userRoles = !isEmpty(adminUpdate.userRoles)
        ? adminUpdate.userRoles
        : initialState.userRoles;
      adminUpdate.customerRoles = !isEmpty(adminUpdate.customRoles)
        ? adminUpdate.userRoles
        : initialState.customRoles;

      this.setState({
        _id: adminUpdate._id,
        firstname: adminUpdate.firstname,
        surname: adminUpdate.surname,
        email: adminUpdate.email,
        password: adminUpdate.password,
        confirm: adminUpdate.password,
        userRole: adminUpdate.userRole,
        customRoles: adminUpdate.customRoles
      });
    }
  }

  onSubmit = event => {
    event.preventDefault();

    const updatedAdmin = {
      _id: this.state._id,
      firstname: this.state.firstname,
      surname: this.state.surname,
      email: this.state.email,
      password: this.state.password,
      confirm: this.state.confirm,
      userRole: this.state.userRole,
      customRoles: this.state.customRoles
    };

    this.setState({ doNotUpdate: true });
    this.props.adminUpdate(updatedAdmin);
  };

  onChangeToggle = event => {
    let roles = this.state.customRoles;
    roles[event.target.name] = event.target.checked;
    this.setState({ customRoles: roles });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isError = name => {
    if (this.state.errors[name] && this.state.errors[name].trim().length > 0) {
      return true;
    }
    return false;
  };

  capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    const { classes } = this.props;
    const { errors, customRoles } = this.state;
    const { isSuccess, admin, loading } = this.props.admin;

    const dialogMissingId = (
      <Dialog
        open={!this.props.params.id}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Administrator Not Found"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The Administrator you are attempting to update could not be found.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            autoFocus
            component={Link}
            to="/admin/administrators"
          >
            GO BACK
          </Button>
        </DialogActions>
      </Dialog>
    );

    const dialogSuccess = (
      <Dialog
        open={isSuccess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Administrator Updated"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            An Administrator has been sucessfully updated
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            autoFocus
            component={Link}
            to="/admin/administrators"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );

    const userRoles = (
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="Administration Role"
          name="userRole"
          id="userRole"
          row
          className={classes.group}
          value={this.state.value}
          onChange={this.onChange}
        >
          <FormControlLabel
            value="Administrator"
            className={classes.switch}
            control={
              <Radio
                color="primary"
                checked={this.state.userRole === "Administrator"}
              />
            }
            label="Administrator"
          />
          <FormControlLabel
            value="Customer Services"
            className={classes.switch}
            control={
              <Radio
                color="primary"
                checked={this.state.userRole === "Customer Services"}
              />
            }
            label="Customer Services"
          />
          <FormControlLabel
            value="SuperAdmin"
            className={classes.switch}
            control={
              <Radio
                color="primary"
                checked={this.state.userRole === "SuperAdmin"}
              />
            }
            label="SuperAdmin"
          />
        </RadioGroup>
      </FormControl>
    );

    const customRolesList = (
      <React.Fragment>
        {this.state.customRoles &&
        Object.keys(this.state.customRoles).length > 0
          ? Object.keys(this.state.customRoles)
              .sort()
              .map((role, index) => {
                return (
                  <FormControlLabel
                    className={classes.switch}
                    key={index}
                    control={
                      <Switch
                        checked={customRoles[role]}
                        onChange={this.onChangeToggle}
                        name={role}
                        value={role}
                        color="primary"
                      />
                    }
                    label={this.capitalise(role)}
                  />
                );
              })
          : null}
      </React.Fragment>
    );

    const AdminUpdateForm = (
      <form
        noValidate
        className={classes.container}
        autoComplete="off"
        onSubmit={this.onSubmit}
      >
        <Grid container justify="flex-start">
          <Grid item xs={12} sm={12} md={2} xl={1}>
            <Typography variant="body2" className={classes.mobilePadding}>
              Name
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={5} xl={6}>
            <TextField
              error={this.isError("firstname")}
              name="firstname"
              id="firstname"
              label="First Name"
              placeholder="First Name"
              value={this.state.firstname}
              onChange={this.onChange}
              helperText={errors.firstname}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5} xl={6}>
            <TextField
              error={this.isError("surname")}
              name="surname"
              id="surname"
              label="Surname"
              placeholder="Surname"
              value={this.state.surname}
              onChange={this.onChange}
              helperText={errors.surname}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container justify="flex-start" className={classes.gridPadding}>
          <Grid item xs={12} sm={12} md={2} xl={1} />
          <Grid item xs={12} sm={12} md={10} xl={11}>
            <TextField
              error={this.isError("email")}
              disabled
              name="email"
              id="email"
              label="Email Address"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.onChange}
              helperText={errors.email}
              className={classes.textField}
              fullWidth
              type="email"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid container justify="flex-start" className={classes.gridPadding}>
          <Grid item xs={12} sm={12} md={2} xl={1}>
            <Typography variant="body2" className={classes.mobilePadding}>
              Password
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={5} xl={6}>
            <TextField
              error={this.isError("password")}
              name="password"
              id="password"
              label="Password"
              value={this.state.password}
              onChange={this.onChange}
              helperText={errors.password}
              placeholder="**********"
              className={classes.textField}
              fullWidth
              type="password"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
        </Grid>
        <Grid container justify="flex-start" className={classes.gridPadding}>
          <Grid item xs={12} sm={12} md={2} xl={1} />
          <Grid item xs={12} sm={12} md={5} xl={6}>
            <TextField
              error={this.isError("confirm")}
              name="confirm"
              id="confirm"
              label="Confirm Password"
              value={this.state.confirm}
              onChange={this.onChange}
              helperText={errors.confirm}
              placeholder="**********"
              className={classes.textField}
              fullWidth
              type="password"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid container justify="flex-start" className={classes.gridPadding}>
          <Grid item xs={12} sm={12} md={2} xl={1}>
            <Typography variant="body2" className={classes.mobilePadding}>
              Roles
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={10} xl={11}>
            <Typography variant="body2">Administration Role</Typography>
          </Grid>
        </Grid>
        <Grid container justify="flex-start" className={classes.gridPadding}>
          <Grid item xs={12} sm={12} md={2} xl={1} />
          <Grid item xs={12} sm={12} md={10} xl={11}>
            <FormControl component="fieldset">
              <FormGroup row>{userRoles}</FormGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container justify="flex-start" className={classes.gridPadding}>
          <Grid item xs={12} sm={12} md={2} xl={1} />
          <Grid item xs={12} sm={12} md={10} xl={11}>
            <FormControl component="fieldset">
              <Typography variant="body2">Management Settings</Typography>
              <FormGroup row>{customRolesList}</FormGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid container justify="flex-start" className={classes.gridPadding}>
          <Grid item xs={12} sm={12} md={2} xl={1} />
          <Grid item xs={12} sm={12} md={2} xl={1}>
            <Button
              type="submit"
              variant="contained"
              size="small"
              className={classes.button}
              color="secondary"
            >
              Update
              <CreateIcon className={classes.rightIcon} />
            </Button>
          </Grid>
        </Grid>
      </form>
    );

    let AdminUpdate;
    if (admin === null || loading === true) {
      AdminUpdate = <Spinner />;
      console.log("loading");
    } else {
      AdminUpdate = AdminUpdateForm;
    }

    return (
      <Paper className={classes.root} square elevation={4}>
        {AdminUpdate}
        {dialogSuccess}
        {dialogMissingId}
      </Paper>
    );
  }
}

AdminUpdate.propTypes = {
  adminUpdate: PropTypes.func.isRequired,
  adminGetById: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const matchSelector = createMatchSelector({
    path: "/admin/administrators/update/:id"
  });
  const match = matchSelector(state);

  return {
    admin: state.admin,
    errors: state.errors,
    params: match.params
  };
};

export default connect(
  mapStateToProps,
  { adminUpdate, adminGetById }
)(withStyles(styles, { withTheme: true })(AdminUpdate));
