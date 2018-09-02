const express = require("express");
const passport = require("passport");

// router
const router = express.Router();

//Newsletter ROUTES
//GET Routes
//Route     GET /api/newsletters/current
//Route     GET /api/newsletters/test

//POST Routes
//Route     GET /api/newsletters/create

//DELETE Routes
//Route     DELETE /api/newsletters/delete

//////////////////////////
////////// GET ///////////
//////////////////////////

//Route     GET /api/newsletters/current
//Desc      Return the current users license
//Access    Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const get_GuidesNewsletters_current = require("./profiles/get_newsletters_current");
    res = get_GuidesNewsletters_current(req, res);
  }
);

//Route     GET /api/newsletters/test
//Desc      Test Newsletters Route
//Access    Public
router.get("/test", (req, res) => res.json({ msg: "Newsletters Works" }));

//////////////////////////
////////// POST //////////
//////////////////////////

//Route     POST /api/newsletters/create
//Desc      Create a Guide profile
//Access    Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const post_GuidesNewsletter_create = require("./profiles/post_newsletters_create");
    res = post_GuidesNewsletter_create(req, res);
  }
);

//////////////////////////
///////// DELETE /////////
//////////////////////////

//Route     DELETE /api/newsletters/delete
//Desc      Remove the current users guide license
//Access    Private
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const delete_GuidesNewsletters = require("./profiles/delete_newsletters");
    res = delete_GuidesNewsletters(req, res);
  }
);

//export
module.exports = router;
