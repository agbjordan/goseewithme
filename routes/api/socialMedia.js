const express = require("express");
const passport = require("passport");

// router
const router = express.Router();

//PROFILES ROUTES
//GET Routes
//Route     GET /api/socialMedia/current
//Route     GET /api/socialMedia/test

//POST Routes
//Route     GET /api/socialMedia/create

//DELETE Routes
//Route     DELETE /api/socialMedia/delete

//////////////////////////
////////// GET ///////////
//////////////////////////

//Route     GET /api/socialMedia/current
//Desc      Return the current users Social Media
//Access    Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const get_SocialMedia_current = require("./profiles/get_socialMedia_current");
    res = get_SocialMedia_current(req, res);
  }
);

//Route     GET /api/socialMedia/test
//Desc      Test socialMedia Route
//Access    Public
router.get("/test", (req, res) => res.json({ msg: "Social Media Works" }));

//////////////////////////
////////// POST //////////
//////////////////////////

//Route     POST /api/socialMedia/create
//Desc      Create current users Social Media
//Access    Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const post_SocialMedia_create = require("./profiles/post_socialMedia_create");
    res = post_SocialMedia_create(req, res);
  }
);

//////////////////////////
///////// DELETE /////////
//////////////////////////

//Route     DELETE /api/socialMedia/delete
//Desc      Remove the current users socialMedia
//Access    Private
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const delete_SocialMedia = require("./profiles/delete_socialMedia");
    res = delete_SocialMedia(req, res);
  }
);

//Route     DELETE /api/socialMedia/delete/:id
//Desc      Remove the current users socialMedia
//Access    Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const delete_SocialMedia = require("./profiles/delete_socialMediaById");
    res = delete_SocialMedia(req, res);
  }
);

//export
module.exports = router;
