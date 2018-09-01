const express = require("express");
const passport = require("passport");

// router
const router = express.Router();

//PROFILES ROUTES
//GET Routes
//Route     GET /api/profiles/current
//Route     GET /api/profiles/test

//POST Routes
//Route     GET /api/profiles/guide/create

//DELETE Routes
//Route     DELETE /api/profiles/guide/delete

//////////////////////////
////////// GET ///////////
//////////////////////////

//Route     GET /api/profiles/current
//Desc      Return the current user profile (Traveller, Guide or Agent)
//Access    Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const get_GuidesProfile_current = require("../api/guides/get_profile_current");
    res = get_GuidesProfile_current(req, res);
  }
);

//Route     GET /api/profiles/test
//Desc      Test Profiles Route
//Access    Public
router.get("/test", (req, res) => res.json({ msg: "Profiles Works" }));

//////////////////////////
////////// POST //////////
//////////////////////////

//Route     POST /api/profiles/guide/create
//Desc      Create a Guide profile
//Access    Private
router.post(
  "/guide/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const post_GuidesProfile_create = require("../api/guides/post_profile_create");
    res = post_GuidesProfile_create(req, res);
  }
);

//////////////////////////
///////// DELETE /////////
//////////////////////////

//Route     DELETE /api/profiles/guide/delete
//Desc      Remove the current users profile
//Access    Private
router.delete(
  "/guide/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const delete_GuidesProfile = require("../api/guides/delete_profile");
    res = delete_GuidesProfile(req, res);
  }
);

//export
module.exports = router;
