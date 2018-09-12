const express = require("express");
const passport = require("passport");

// router
const router = express.Router();

//PROFILES ROUTES
//GET Routes
//Route     GET /api/profiles/all
//Route     GET /api/profiles/guides/city/:city
//Route     GET /api/profiles/guides/city/:city/:limit
//Route     GET /api/profiles/guides/country/:country
//Route     GET /api/profiles/guides/country/:country/:limit
//Route     GET /api/profiles/guides/current
//Route     GET /api/profiles/guides/id/:id
//Route     GET /api/profiles/guides/nationality/:nationality
//Route     GET /api/profiles/guides/nationality/:nationality/:limit
//Route     GET /api/profiles/guides/rating/:min/:max
//Route     GET /api/profiles/guides/rating/:min/:max/:limit
//Route     GET /api/profiles/current
//Route     GET /api/profiles/:id
//Route     GET /api/profiles/test

//POST Routes
//Route     POST /api/profiles/guide/create
//Route     POST /api/profiles/guide/licenseValid
//Route     POST /api/profiles/agent/all
//Route     POST /api/profiles/agent/current
//Route     POST /api/profiles/agent/:id
//Route     POST /api/profiles/traveller/all
//Route     POST /api/profiles/traveller/current
//Route     POST /api/profiles/traveller/:id

//DELETE Routes
//Route     DELETE /api/profiles/delete/current
//Route     DELETE /api/profiles/delete/:id

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
    const get_Profile_current = require("./guides/get_guide");
    res = get_Profile_current(req, res);
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
    const post_Profile_create = require("../api/guides/post/post_guideProfile_create");
    res = post_Profile_create(req, res);
  }
);

//////////////////////////
///////// DELETE /////////
//////////////////////////

//Route     DELETE /api/profiles/delete/current
//Desc      Remove the current users profile
//Access    Private
router.delete(
  "/delete/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const delete_Profile = require("./guides/delete_guide");
    res = delete_Profile(req, res);
  }
);

//Route     DELETE /api/profiles/delete/:id
//Desc      Remove profile by id
//Access    Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const delete_Profile = require("../api/profiles/delete_profileById");
    res = delete_Profile(req, res);
  }
);

//export
module.exports = router;
