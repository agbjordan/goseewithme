const Posts = require("../../../models/Posts");
const Users = require("../../../models/Users");

module.exports = function get(req, res) {
  let errors = {};
  let selectData = "follows";
  const msg = {
    userNotFound: "The current user could not be identified",
    postNotFound: "no posts where found"
  };

  // User role could not be found
  if (!req.user._id) {
    errors.userNotFound = msg.userNotFound;
    return res.status(404).json(errors);
  }

  //run the switch to find the current profile
  Users.find({ user: req.user._id })
    .select(selectData)
    .sort({ date: -1 })
    .then(usersList => {
      //find all posts from the list of follows
      Posts.find({ user: { $in: [usersList] } })
        .sort({ date: -1 })
        .then(posts => {
          if (posts && posts[0]) {
            //return the posts
            return res.status(200).json(posts);
          } else {
            //no posts
            errors.postNotFound = msg.postNotFound;
            return res.status(200).json(errors);
          }
        })
        .catch(err => {
          console.log(err);
          errors.userNotFound = msg.userNotFound;
          return res.status(400).json(errors);
        });
    })
    .catch(err => {
      console.log(err);
      errors.userNotFound = msg.userNotFound;
      return res.status(400).json(errors);
    });
};
