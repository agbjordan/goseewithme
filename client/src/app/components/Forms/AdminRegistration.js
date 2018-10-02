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
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      surname: "",
      email: "",
      password: "",
      confirm: "",
      defaultRoles: {
        administrator: {
          checked: true,
          value: "5",
          role: "Administrator",
          roles: {
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
          }
        },
        customerServices: {
          checked: false,
          value: "6",
          role: "Customer Services",
          roles: {
            bookings: true,
            products: true,
            reviews: true,
            transactions: true,
            travellers: true,
            guides: true,
            agents: true,
            affiliates: true,
            influencers: true,
            administrators: false,
            settings: false
          }
        },
        superAdmin: {
          checked: false,
          value: "7",
          role: "SuperAdmin",
          roles: {
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
            settings: true
          }
        }
      },
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
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDefaultRole = this.handleChangeDefaultRole.bind(this);
    this.handleSwitchValue = this.handleSwitchValue.bind(this);
    this.Capitalize = this.Capitalize.bind(this);
  }

  handleChangeDefaultRole = name => event => {
    let defaultRoles = this.state.defaultRoles;

    //set all defaults to false
    for (let role in defaultRoles) {
      defaultRoles[role].checked = false;
    }

    //change selected toogle to true
    defaultRoles[name].checked = event.target.checked;
    //update customer roles
    const custom = this.state.defaultRoles[name].roles;

    this.setState(state => {
      return {
        defaultRoles: defaultRoles,
        customRoles: custom
      };
    });
  };

  handleSwitchValue = name => event => {
    let custom = this.state.customRoles;
    custom[name] = event.target.checked;
    this.setState({ customRoles: custom });
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
    const { defaultRoles, customRoles } = this.state;

    const defaultRuleToggles = Object.keys(this.state.defaultRoles)
      .sort()
      .map((role, index) => {
        return (
          <FormControlLabel
            className={classes.switch}
            key={index}
            control={
              <Switch
                checked={defaultRoles[role].checked}
                onChange={this.handleChangeDefaultRole(role)}
                name={defaultRoles[role].role}
                value={defaultRoles[role].value}
                color="primary"
              />
            }
            label={defaultRoles[role].role}
          />
        );
      });

    const customRuleToggles = Object.keys(this.state.customRoles)
      .sort()
      .map((role, index) => {
        return (
          <FormControlLabel
            className={classes.switch}
            key={index}
            control={
              <Switch
                checked={customRoles[role]}
                onChange={this.handleSwitchValue(role)}
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
                required
                id="firstname"
                label="First Name"
                defaultValue=""
                placeholder="First Name"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={4} sm={5} md={5} xl={6}>
              <TextField
                required
                id="surname"
                label="Surname"
                defaultValue=""
                placeholder="Surname"
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
                required
                id="email"
                label="Email Address"
                defaultValue=""
                placeholder="Email Address"
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
                required
                id="password"
                label="Password"
                defaultValue=""
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
                required
                id="confirm"
                label="Confirm Password"
                defaultValue=""
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
            <Grid item xs={3} sm={2} md={2} xl={1}>
              <Typography variant="body2">Admin Roles</Typography>
            </Grid>
            <Grid item xs={3} sm={2} md={2} xl={1}>
              <Typography variant="body2">Default Roles</Typography>
            </Grid>
          </Grid>
          <Grid container justify="flex-start" className={classes.gridPadding}>
            <Grid item xs={3} sm={2} md={2} xl={1} />
            <Grid item xs={9} sm={10} md={10} xl={11}>
              <FormControl component="fieldset">
                <FormGroup row>{defaultRuleToggles}</FormGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container justify="flex-start" className={classes.gridPadding}>
            <Grid item xs={3} sm={2} md={2} xl={1} />
            <Grid item xs={9} sm={10} md={10} xl={11}>
              <FormControl component="fieldset">
                <Typography variant="body2">
                  Customise Management Settings
                </Typography>
                <FormGroup row>{customRuleToggles}</FormGroup>
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
