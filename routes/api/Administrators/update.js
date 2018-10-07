const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

//load validation files
const validateRegister = require("../../../validation/admin/update");

// require models
const User = require("../../../models/Administrators");

module.exports = function del(req, res) {
  const { errors, isValid } = validateRegister(req.body);
  const secret = "nochange";

  //validate input data
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //does user already exist
  User.findOne({ _id: req.body._id }).then(user => {
    //gravatar profile image from email
    const avatar = gravatar.url(req.body.email, {
      s: 200, //size
      r: "pg", //rating
      d: "mm" //default
    });

    //create new user
    user.set({
      firstname: req.body.firstname,
      surname: req.body.surname,
      userRole: req.body.userRole,
      customRoles: req.body.customRoles
    });

    //hash password using bcryptjs
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err;
        //update password with hash value
        if (req.body.password !== secret) {
          user.password = hash;
        }
        //save new user
        user
          .save()
          .then(user => res.json(user))
          .catch(err => res.state(400).json(err.response.data));
      });
    });
  });
};
