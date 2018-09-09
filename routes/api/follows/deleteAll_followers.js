const selectModel = require("../../../functions/selectModel");
const dbFunctions = require("../../../functions/dbFunctions");

module.exports = get = (req, res) => {
  let errors = {};
  const dbSet = new dbFunctions();
  const dataGroup = "follows";
  const userNotFound = "The current user could not be identified";
  const msg = "All followers have been removed";
  const followers = [];

  // User role could not be found
  console.log(req.user);

  if (!req) {
    errors.userNotFound = userNotFound;
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
    res,
    msg
  });
};
