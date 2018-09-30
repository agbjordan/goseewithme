import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";

//material ui
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
//icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import MailIcon from "@material-ui/icons/Mail";
import DraftsIcon from "@material-ui/icons/Drafts";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import ViewListIcon from "@material-ui/icons/ViewList";
import ReviewIcon from "@material-ui/icons/Stars";
import TransactionIcon from "@material-ui/icons/MonetizationOn";
import UsersIcon from "@material-ui/icons/SupervisedUserCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import AgentIcon from "@material-ui/icons/AssignmentInd";
import GuideIcon from "@material-ui/icons/Face";
import TravellerIcon from "@material-ui/icons/SentimentVerySatisfied";
import AffiliateIcon from "@material-ui/icons/BusinessCenter";
import InfluencerIcon from "@material-ui/icons/Person";

//default draw width
const drawerWidth = 240;

//default styles
const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px + 17px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawerHideScroll: {
    height: "100%",
    overflowX: "hidden",
    width: `calc(${drawerWidth}px - 17px)`,
    minWidth: `calc(${drawerWidth}px - 17px)`
  },
  drawerHideScrollClose: {
    height: "100%",
    overflowX: "hidden",
    width: `calc(((${theme.spacing.unit}px) * 10) - 17px)`,
    minWidth: `calc(((${theme.spacing.unit}px) * 10) - 17px)`,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.up("sm")]: {
      width: `calc(((${theme.spacing.unit}px) * 11.5) - 17px)`,
      MinWidth: `calc(((${theme.spacing.unit}px) * 11.5) - 17px)`
    }
  },
  drawer: {
    height: "100%",
    overflowX: "hidden"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    overflowX: "hidden",
    height: "100%",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    height: "100%",
    width: theme.spacing.unit * 10,
    minWidth: theme.spacing.unit * 10,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 11.5,
      height: "100%",
      overflowX: "hidden"
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

class AdminHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      notifications: 2,
      inbox: 15,
      bookings: 3,
      reviews: 2,
      transactions: 1
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme, children } = this.props;

    const HeaderBar = (
      <AppBar
        position="absolute"
        className={classNames(
          classes.appBar,
          this.state.open && classes.appBarShift
        )}
      >
        <Toolbar disableGutters={!this.state.open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.handleDrawerOpen}
            className={classNames(
              classes.menuButton,
              this.state.open && classes.hide
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" noWrap>
            Administration
          </Typography>
        </Toolbar>
      </AppBar>
    );

    const CollaspingHeader = (
      <div className={classes.toolbar}>
        <IconButton onClick={this.handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
    );

    const SectionDashboard = (
      <List>
        <ListItem button component={Link} to="./">
          <Tooltip title="Dashboard" placement="right">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
    );

    const SectionNotifications = (
      <List>
        <ListItem button component={Link} to="./notifications">
          <Tooltip title="Notifications" placement="right">
            <ListItemIcon>
              {this.state.notifications <= 0 ? (
                <NotificationsIcon />
              ) : (
                <Badge badgeContent={this.state.notifications} color="primary">
                  <NotificationsActiveIcon />
                </Badge>
              )}
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem button component={Link} to="./inbox">
          <Tooltip title="Inbox" placement="right">
            <ListItemIcon>
              {this.state.inbox <= 0 ? (
                <MailIcon />
              ) : (
                <Badge badgeContent={this.state.inbox} color="primary">
                  <DraftsIcon />
                </Badge>
              )}
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Inbox" />
        </ListItem>
      </List>
    );

    const SectionBookings = (
      <List>
        <ListItem button component={Link} to="./bookings">
          <Tooltip title="Bookings" placement="right">
            <ListItemIcon>
              {this.state.bookings <= 0 ? (
                <CardTravelIcon />
              ) : (
                <Badge badgeContent={this.state.bookings} color="primary">
                  <CardTravelIcon />
                </Badge>
              )}
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Bookings" />
        </ListItem>
        <ListItem button component={Link} to="./products">
          <Tooltip title="Products" placement="right">
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button component={Link} to="./reviews">
          <Tooltip title="Reivews" placement="right">
            <ListItemIcon>
              {this.state.reviews <= 0 ? (
                <ReviewIcon />
              ) : (
                <Badge badgeContent={this.state.reviews} color="primary">
                  <ReviewIcon />
                </Badge>
              )}
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Reviews" />
        </ListItem>
        <ListItem button component={Link} to="./transactions">
          <Tooltip title="Transactions" placement="right">
            <ListItemIcon>
              {this.state.transactions <= 0 ? (
                <TransactionIcon />
              ) : (
                <Badge badgeContent={this.state.transactions} color="primary">
                  <TransactionIcon />
                </Badge>
              )}
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Transactions" />
        </ListItem>
      </List>
    );

    const SectionAccounts = (
      <React.Fragment>
        <List>
          <ListItem button component={Link} to="./travellers">
            <Tooltip title="Travellers" placement="right">
              <ListItemIcon>
                <TravellerIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Travellers" />
          </ListItem>
          <ListItem button component={Link} to="./guides">
            <Tooltip title="Guides" placement="right">
              <ListItemIcon>
                <GuideIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Guides" />
          </ListItem>
          <ListItem button component={Link} to="./agents">
            <Tooltip title="Agents" placement="right">
              <ListItemIcon>
                <AgentIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Agents" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to="./affiliates">
            <Tooltip title="Affiliates" placement="right">
              <ListItemIcon>
                <AffiliateIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Affiliates" />
          </ListItem>
          <ListItem button component={Link} to="./influencers">
            <Tooltip title="Influencers" placement="right">
              <ListItemIcon>
                <InfluencerIcon />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Influencers" />
          </ListItem>
        </List>
      </React.Fragment>
    );

    const SectionPersonal = (
      <List>
        <ListItem button component={Link} to="./users">
          <Tooltip title="Users" placement="right">
            <ListItemIcon>
              <UsersIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="./settings">
          <Tooltip title="Settings" placement="right">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    );

    return (
      <CssBaseline>
        <div className={classes.root}>
          {HeaderBar}
          <div
            className={classNames(
              classes.drawerHideScroll,
              !this.state.open && classes.drawerHideScrollClose
            )}
          >
            <Drawer
              variant="permanent"
              classes={{
                docked: classNames(classes.drawer),
                paper: classNames(
                  classes.drawerPaper,
                  !this.state.open && classes.drawerPaperClose
                )
              }}
              open={this.state.open}
            >
              {CollaspingHeader}
              <Divider />
              {SectionDashboard}
              <Divider />
              {SectionNotifications}
              <Divider />
              {SectionBookings}
              <Divider />
              {SectionAccounts}
              <Divider />
              {SectionPersonal}
            </Drawer>
          </div>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        </div>
      </CssBaseline>
    );
  }
}

AdminHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(AdminHeader);
