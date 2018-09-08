const selectModel = require("../../../functions/selectModel");
const userFunctions = require("../../../functions/userFunctions");

module.exports = function get_GuidesLicense_current(req, res) {
  let errors = {};
  const user = new userFunctions();
  const props = {
    userNotFound: "The current user could not be identified",
    userNotGuide: "The current user is not a guide.",
    userRole: "guide",
    msg: "The Current User has not set up a guide license",
    dataGroup: "license"
  };

  // User role could not be found
  if (!req.user._id) {
    errors.userNotFound = props.userNotFound;
    return res.status(404).json(errors);
  } else if (!req.user.role || req.user.role !== props.userRole) {
    errors.userNotGuide = props.userNotGuide;
    return res.status(404).json(errors);
  }

  //load models depending on current User Role
  let Profile = selectModel(req.user.role);

  user
    .getByUserID({
      userid: req.user._id,
      model: Profile,
      data: props.dataGroup
    })
    .then(result => {
      let r = result.toJSON();
      if (!r[props.dataGroup]) {
        return res.status(200).json(props.msg);
      }
      return res.status(200).json(result);
    })
    .catch(err => console.log(err));
};
