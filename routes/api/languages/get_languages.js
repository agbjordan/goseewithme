//functions
const selectModel = require("../../../functions/modelFunctions");
const userFunctions = require("../../../functions/userFunctions");

module.exports = function get_GuidesLanguages_current(req, res) {
  let errors = {};
  const user = new userFunctions();
  const dataGroup = "languages";
  const userRole = "guide";
  const msg = {
    userNotFound: "The current user could not be identified",
    userNotGuide: "The current user is not a guide.",
    noLanguages: "The current user has not set up any languages",
    notFound: "languages not found"
  };

  // User role could not be found
  if (!req.user._id) {
    errors.userNotFound = msg.userNotFound;
    return res.status(404).json(errors);
  } else if (!req.user.role || req.user.role !== userRole) {
    errors.userNotGuide = msg.userNotGuide;
    return res.status(404).json(errors);
  }

  //load models depending on current User Role
  let Profile = selectModel(req.user.role);

  user
    .getByUserID({
      userid: req.user._id,
      model: Profile,
      data: dataGroup
    })
    .then(result => {
      let r = result.toJSON();
      if (!r[dataGroup]) {
        return res.status(200).json(msg.noLanguages);
      }
      return res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      return res.status(200).json(msg.noLanguages);
    });
};
