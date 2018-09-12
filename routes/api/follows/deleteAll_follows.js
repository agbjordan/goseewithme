//functions
const selectModel = require("../../../functions/modelFunctions");
const dbFunctions = require("../../../functions/dbFunctions");

module.exports = get = (req, res) => {
  let errors = {};
  const followers = [];
  const dbSet = new dbFunctions();
  const dataGroup = "follows";
  const msg = {
    userNotFound: "The current user could not be identified",
    removed: "All followers have been removed"
  };

  //validation
  if (!req) {
    errors.userNotFound = msg.userNotFound;
    return res.status(404).json(errors);
  }

  //load models depending on User Role
  let Profile = selectModel(req.user.role);

  // //save new array to db
  dbSet.set({
    model: Profile,
    userid: req.user._id,
    objectName: dataGroup,
    data: followers,
    res: res,
    msg: msg.removed
  });
};
