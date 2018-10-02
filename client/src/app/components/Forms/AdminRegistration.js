import React, { Component } from "react";
import PropTypes from "prop-types";

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
//icons
import CreateIcon from "@material-ui/icons/Create";

//styles
const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing.unit * 3
  },
  container: {
    width: "100%"
  },
  textField: {
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  divider: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3
  },
  group: {
    marginBottom: theme.spacing.unit * 2
  },
  switch: {
    width: "180px"
  },
  button: {
    padding: `1ex 2.5ex 1ex 3ex`
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

export class AdminRegistration extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      surname: "",
      email: "",
      password: "",
      confirm: "",
      userRole: "5",
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
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeToggle = this.onChangeToggle.bind(this);
    this.isError = this.isError.bind(this);
    this.Capitalize = this.Capitalize.bind(this);
  }

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
      console.log(true);
      return true;
    }
    return false;
  };

  handleSubmit = event => {
    event.preventDefault();
    return alert("submited");
  };

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    const { classes } = this.props;
    const { errors, customRoles } = this.state;

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
            value="5"
            className={classes.switch}
            control={
              <Radio color="primary" checked={this.state.userRole === "5"} />
            }
            label="Administrator"
          />
          <FormControlLabel
            value="6"
            className={classes.switch}
            control={
              <Radio color="primary" checked={this.state.userRole === "6"} />
            }
            label="Customer Services"
          />
          <FormControlLabel
            value="7"
            className={classes.switch}
            control={
              <Radio color="primary" checked={this.state.userRole === "7"} />
            }
            label="SuperAdmin"
          />
        </RadioGroup>
      </FormControl>
    );

    const customRolesList = Object.keys(this.state.customRoles)
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
            label={this.Capitalize(role)}
          />
        );
      });

    return (
      <Paper className={classes.root} square elevation={4}>
        <form
          className={classes.container}
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <Grid container justify="flex-start">
            <Grid item xs={3} sm={2} md={2} xl={1}>
              <Typography variant="body2">Name</Typography>
            </Grid>
            <Grid item xs={4} sm={5} md={5} xl={6}>
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
            <Grid item xs={4} sm={5} md={5} xl={6}>
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
            <Grid item xs={3} sm={2} md={2} xl={1} />
            <Grid item xs={9} sm={10} md={10} xl={11}>
              <TextField
                error={this.isError("email")}
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
            <Grid item xs={3} sm={2} md={2} xl={1}>
              <Typography variant="body2">Password</Typography>
            </Grid>
            <Grid item xs={4} sm={5} md={5} xl={6}>
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
            <Grid item xs={3} sm={2} md={2} xl={1} />
            <Grid item xs={4} sm={5} md={5} xl={6}>
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
                type="confirm"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container justify="flex-start" className={classes.gridPadding}>
            <Grid item xs={3} sm={2} md={2} xl={1}>
              <Typography variant="body2">Roles</Typography>
            </Grid>
            <Grid item xs={9} sm={10} md={10} xl={11}>
              <Typography variant="body2">Administration Role</Typography>
            </Grid>
          </Grid>
          <Grid container justify="flex-start" className={classes.gridPadding}>
            <Grid item xs={3} sm={2} md={2} xl={1} />
            <Grid item xs={9} sm={10} md={10} xl={11}>
              <FormControl component="fieldset">
                <FormGroup row>{userRoles}</FormGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container justify="flex-start" className={classes.gridPadding}>
            <Grid item xs={3} sm={2} md={2} xl={1} />
            <Grid item xs={9} sm={10} md={10} xl={11}>
              <FormControl component="fieldset">
                <Typography variant="body2">Management Settings</Typography>
                <FormGroup row>{customRolesList}</FormGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container justify="flex-start" className={classes.gridPadding}>
            <Grid item xs={3} sm={2} md={2} xl={1} />
            <Grid item xs={3} sm={2} md={2} xl={1}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                className={classes.button}
                color="secondary"
              >
                Create
                <CreateIcon className={classes.rightIcon} />
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}

AdminRegistration.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(AdminRegistration);
