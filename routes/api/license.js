const express = require("express");
const passport = require("passport");

// router
const router = express.Router();

//PROFILES ROUTES
//GET Routes
//Route     GET /api/license/current
//Route     GET /api/license/test

//POST Routes
//Route     GET /api/license/create

//DELETE Routes
//Route     DELETE /api/license/delete

//////////////////////////
////////// GET ///////////
//////////////////////////

//Route     GET /api/license/current
//Desc      Return the current users license
//Access    Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const get_GuidesLicense_current = require("./guides/get_license_current");
    res = get_GuidesLicense_current(req, res);
  }
);

//Route     GET /api/license/test
//Desc      Test Profiles Route
//Access    Public
router.get("/test", (req, res) => res.json({ msg: "Licenses Works" }));

//////////////////////////
////////// POST //////////
//////////////////////////

//Route     POST /api/license/create
//Desc      Create a Guide profile
//Access    Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const post_GuidesLicense_create = require("./guides/post_license_create");
    res = post_GuidesLicense_create(req, res);
  }
);

//////////////////////////
///////// DELETE /////////
//////////////////////////

//Route     DELETE /api/licnese/delete
//Desc      Remove the current users guide license
//Access    Private
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const delete_GuidesLicense = require("./guides/delete_license");
    res = delete_GuidesLicense(req, res);
  }
);

//export
module.exports = router;
