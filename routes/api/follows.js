const express = require("express");
const passport = require("passport");

// router
const router = express.Router();

//routes
//GET       /api/follows/current
//GET       /api/follows/user/:id
//GET       /api/follows/add/:id
//GET       /api/follows/delete/:id
//DELETE    /api/follows/deleteAll

///////////////////////////
///////////////////////////
///////////////////////////
//GET
///////////////////////////
///////////////////////////
///////////////////////////

//Route     GET /api/follows/current
//Desc      Get the follows of current user
//Access    Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const get = require("./follows/getAll_followers.js");
    res = get(req, res);
  }
);

//Route     GET /api/follows/user/:id
//Desc      Get the follows of a user by id
//Access    Public
router.get("/user/:id", (req, res) => {
  const get = require("./follows/get_follower_byId.js");
  res = get(req, res);
});

//Route     GET /api/follows/add/:id
//Desc      Add a follower to the current user
//Access    Private
router.get(
  "/add/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const get = require("./follows/add_follower_byId.js");
    res = get(req, res);
  }
);

//Route     GET /api/follows/delete/:id
//Desc      Remove a follower to the current user
//Access    Private
router.get(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const get = require("./follows/delete_follower_byId.js");
    res = get(req, res);
  }
);

///////////////////////////
///////////////////////////
///////////////////////////
//DELETE
///////////////////////////
///////////////////////////
///////////////////////////

//Route     Delete /api/follows/deleteAll
//Desc      Delete a user to the current users follow list
//Access    Private
router.delete(
  "/deleteAll",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const get = require("./follows/deleteAll_followers.js");
    res = get(req, res);
  }
);

//export
module.exports = router;
