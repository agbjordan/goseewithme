const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// require models
const User = require("../../models/Users");

// router
const router = express.Router();

//USER ROUTES
//Get Routes
//Route     GET /api/users/test

//Post Routes
//Route     POST /api/users/register

////////// GET

//Route     GET /api/users/test
//Desc      Test User Route
//Access    Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

////////// POST

//Route     POST /api/users/login
//Desc      Login the user / returning the token
//Access    Public
router.post("/login", (req, res) => {
  const errors = {};
  const email = req.body.email;
  const password = req.body.password;

  //Find the email in the db
  User.findOne({ email: email }).then(user => {
    if (!user) {
      errors.email = "Username not found";
      return res.status(404).json({ email: errors.email });
    }

    //if email is found
    //check password is correct
    bcrypt
      .compare(password, user.password)
      .then(isMatch => {
        if (isMatch) {
          //passwords match
          res.json({ msg: "Great you match" });
        } else {
          //passwords don't match
          errors.email = "Username or password is invalid";
          return res.status(400).json({ email: errors.email });
        }
      })
      .catch(err => console.log(err));
  });
});

//Route     POST /api/users/register
//Desc      Register a User
//Access    Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Username already exists." });
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
      avatar: avatar
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
});

//export
module.exports = router;
