import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

//material ui
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

//components
import BtnAdd from "../Buttons/Btn_Add_Float";
import AdminUserTable from "../Tables/AdminUserTable";

//styles
const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  },
  appBar: {
    paddingTop: theme.spacing.unit * 2
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

//functions
const TabContainer = ({ children, dir }) => {
  return (
    <Typography
      component="div"
      dir={dir}
      style={{ padding: 8 * 2, marginTop: 8 }}
    >
      {children}
    </Typography>
  );
};

//default class
class AdminUsersPanelDefault extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.handleChangePanel = this.handleChangePanel.bind(this);
  }

  handleChangePanel = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleClickAddUser = () => {
    this.setState({ value: 1 });
  };

  render() {
    const { classes, theme } = this.props;

    const NavBar = (
      <div className={classes.appBar}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChangePanel}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="List All Administrators" />
            <Tab label="Create New Administrator" />
          </Tabs>
        </AppBar>
      </div>
    );

    return (
      <React.Fragment>
        <Typography variant="headline" gutterBottom>
          Administrative Users
        </Typography>
        <Divider />
        {NavBar}

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction} className={classes.tabContainer}>
            <AdminUserTable />
          </TabContainer>
          <TabContainer dir={theme.direction}>Item Two</TabContainer>
        </SwipeableViews>

        <BtnAdd
          color="primary"
          tooltip="Create User"
          onClick={this.handleClickAddUser}
        />
      </React.Fragment>
    );
  }
}

//prop-types
AdminUsersPanelDefault.propTypes = {
  classes: PropTypes.object.isRequired
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(AdminUsersPanelDefault);
