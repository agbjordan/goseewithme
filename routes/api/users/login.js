//Auth
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const { jwtKey } = require("../../../config/keys-dev");

//functions
const userF = require("../../../functions/userFunctions");

//load validation files
const validateLogin = require("../../../validation/user_login");

//require models
const User = require("../../../models/Users");

module.exports = function del(req, res) {
  const userFunctions = new userF();
  const { errors, isValid } = validateLogin(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const expiresIn = 18000;
  const bearer = "Bearer ";
  const msg = {
    notFound: "Username not found",
    invalid: "Username or password is invalid"
  };

  //validate input data
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Find the email in the db
  User.findOne({ email: email }).then(user => {
    //not found
    if (!user) {
      errors.email = msg.notFound;
      return res.status(404).json({ errors });
    }

    //create payload
    const payload = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      role: user.role
    };

    //check password is correct
    bcrypt
      .compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          //Update the login details
          userFunctions.updateLoginStats({ email: user.email });
          //sign token
          jsonwebtoken.sign(payload, jwtKey, { expiresIn }, (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: bearer + token
            });
          });
        } else {
          //passwords don't match
          errors.email = msg.invalid;
          return res.status(400).json({ errors });
        }
      })
      .catch(err => console.log(err));
  });
};
