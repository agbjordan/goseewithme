const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

//load validation files
const validateRegister = require("../../../validation/user_registeration");

// require models
const User = require("../../../models/Users");

module.exports = function del(req, res) {
  const { errors, isValid } = validateRegister(req.body);
  const msg = {
    userExists: "Username already exists."
  };

  //validate input data
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //does user already exist
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = msg.userExists;
      return res.status(400).json(errors);
    }

    //gravatar profile image from email
    const avatar = gravatar.url(req.body.email, {
      s: 200, //size
      r: "pg", //rating
      d: "mm" //default
    });

    //create new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar: avatar,
      role: req.body.role
    });

    //hash password using bcryptjs
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        //update password with hash value
        newUser.password = hash;
        //save new user
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
};
