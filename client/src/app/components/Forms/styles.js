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
  },
  mobilePadding: {
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing.unit * 2
    }
  }
});

export default styles;
