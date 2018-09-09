const express = require("express");
const passport = require("passport");

// router
const router = express.Router();

//PROFILES ROUTES
//GET Routes
//Route     GET /api/language/current

//POST Routes
//Route     GET /api/language/add

//DELETE Routes
//Route     DELETE /api/language/delete

//////////////////////////
////////// GET ///////////
//////////////////////////

//Route     GET /api/language/current
//Desc      Return the current users language
//Access    Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const get = require("./guides/get_languages_current");
    res = get(req, res);
  }
);

//////////////////////////
////////// POST //////////
//////////////////////////

//Route     POST /api/langauges/add
//Desc      Adds to an existing list of languages if language is not alreaady present
//Access    Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const post = require("./guides/post_language_add");
    res = post(req, res);
  }
);

//////////////////////////
///////// DELETE /////////
//////////////////////////

//Route     DELETE /api/licnese/delete
//Desc      Remove the current users guide langauges
//Access    Private
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const remove = require("./guides/delete_languages");
    res = remove(req, res);
  }
);

//export
module.exports = router;
