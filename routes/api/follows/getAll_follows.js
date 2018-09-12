//functions
const selectModel = require("../../../functions/modelFunctions");
const dbFunctions = require("../../../functions/dbFunctions");

//class
module.exports = get = (req, res) => {
  let errors = {};
  const getSet = new dbFunctions();
  const dataGroup = "follows";
  const msg = {
    userNotFound: "The current user could not be identified"
  };

  //validation
  if (!req.user._id) {
    errors.userNotFound = msg.userNotFound;
    return res.status(404).json(errors);
  }

  //load model
  let Profile = selectModel(req.user.role);

  //find
  getSet.get({
    model: Profile,
    userid: req.user._id,
    objectName: dataGroup,
    res: res
  });
};
