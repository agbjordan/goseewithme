const express = require("express");
const bcrypt = require("bcryptjs");

//load validation files
const validatePwReset = require("../../../validation/pw_reset");

//load models
const User = require("../../../models/Users");

// router
const router = express.Router();

//Route     POST /api/pw/reset
//Desc      reset user password
//Access    Public
router.post("/reset", (req, res) => {
  //validate the form
  //initiate errors and validation
  const { errors, isValid } = validatePwReset(req.body);
  let newPassword = null;

  //validate input data
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //does the email exist?
  //does user already exist
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      errors.email = "Username does not exist.";
      return res.status(400).json(errors);
    }

    //hash password using bcryptjs
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;
        //update password with hash value
        newPassword = hash;
        //update user password
        User.findOneAndUpdate(
          { email: req.body.email },
          { $set: { password: newPassword } },
          { new: false }
        )
          .then(user => {
            if (user) {
              return res.status(200).json("Password has been updated");
            }
          })
          .catch(err => console.log(err));
      });
    });
  });
});

//export
module.exports = router;
