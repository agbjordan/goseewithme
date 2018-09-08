const express = require("express");
const passport = require("passport");

// router
const router = express.Router();

//PROFILES ROUTES
//GET Routes
//Route     GET /api/contactInfo/current
//Route     GET /api/contactInfo/test

//POST Routes
//Route     GET /api/contactInfo/create

//DELETE Routes
//Route     DELETE /api/contactInfo/delete

//////////////////////////
////////// GET ///////////
//////////////////////////

//Route     GET /api/contactInco/current
//Desc      Return the current users contact information
//Access    Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const get_GuidesContactInfo_current = require("./profiles/get_contactInfo_current");
    res = get_GuidesContactInfo_current(req, res);
  }
);

//Route     GET /api/ContactInfo/test
//Desc      Test Profiles Route
//Access    Public
router.get("/test", (req, res) => res.json({ msg: "ContactInfo Works" }));

//////////////////////////
////////// POST //////////
//////////////////////////

//Route     POST /api/contactInfo/create
//Desc      Create a Guide profile
//Access    Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const post_GuidesContactInfo_create = require("./profiles/post_contactInfo_create");
    res = post_GuidesContactInfo_create(req, res);
  }
);

//////////////////////////
///////// DELETE /////////
//////////////////////////

//Route     DELETE /api/contactInfo/delete
//Desc      Remove the current users guide license
//Access    Private
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const delete_GuidesContactInfo = require("./profiles/delete_contactInfo");
    res = delete_GuidesContactInfo(req, res);
  }
);

//export
module.exports = router;
