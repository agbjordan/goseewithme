const express = require("express");
const passport = require("passport");

// router
const router = express.Router();

//routes
//GET       /api/followers/current
//GET       /api/followers/add/:id
//GET       /api/followers/delete/:id

///////////////////////////
///////////////////////////
///////////////////////////
//GET
///////////////////////////
///////////////////////////
///////////////////////////

//Route     GET /api/followers/current
//Desc      Get the followers of current user
//Access    Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const get = require("./followers/getAll_followers.js");
    res = get(req, res);
  }
);

//Route     GET /api/followers/add/:id
//Desc      Add a follower to the current user
//Access    Private
router.get(
  "/add/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const get = require("./followers/add_follower_byId.js");
    res = get(req, res);
  }
);

//Route     GET /api/follows/delete/:id
//Desc      Remove a follower from the current user
//Access    Private
router.get(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const get = require("./followers/delete_follower_byId.js");
    res = get(req, res);
  }
);

//export
module.exports = router;
