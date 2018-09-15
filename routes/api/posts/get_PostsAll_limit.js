const Posts = require("../../../models/Posts");

module.exports = function get(req, res) {
  let errors = {};
  let limit = 100;
  let limit_min = 1;
  let limit_max = 300;
  let limit_base = 10;
  const msg = {
    userNotFound: "The current user could not be identified",
    postNotFound: "no posts where found",
    limitNotNumber: "The limit must be a number between 1 and 300"
  };

  //error limit
  if (req.params.limit) {
    //convert limit to a integer
    let newLimit = parseInt(req.params.limit, limit_base);
    // check if it is now a number
    if (
      typeof newLimit !== "number" ||
      isNaN(newLimit) === true ||
      newLimit < limit_min ||
      newLimit > limit_max
    ) {
      errors.limitNotNumber = msg.limitNotNumber;
      return res.status(404).json(errors);
    }
    //update limit with valid value
    limit = parseInt(newLimit, limit_base);
  } else {
    errors.limitNotNumber = msg.limitNotNumber;
    return res.status(404).json(errors);
  }

  //run the switch to find the current profile
  Posts.find()
    .limit(limit)
    .sort({ date: -1 })
    .then(posts => {
      if (posts) {
        if (!posts[0]) {
          errors.postNotFound = msg.postNotFound;
          return res.status(200).json(errors);
        }
        return res.status(200).json(posts);
      } else {
        errors.postNotFound = msg.postNotFound;
        return res.status(200).json(errors);
      }
    })
    .catch(err => {
      console.log(err);
      errors.userNotFound = msg.userNotFound;
      return res.status(400).json(errors);
    });
};
