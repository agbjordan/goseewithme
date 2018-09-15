//dependencies
const express = require("express");
const passport = require("passport");
const router = express.Router();

//functions
const routeFunctions = require("../../../functions/routeFunctions");
const routerSet = new routeFunctions();

//Route     GET /api/users/
//Desc      Return the current user
//Access    Private
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) =>
  res.json({
    id: req.user._id,
    name: req.user.name,
    role: req.user.role,
    email: req.user.email,
    avatar: req.user.avatar
  })
);

//////////////////////////
////////// POST //////////
//////////////////////////

//Route     POST /api/users/login
//Desc      Login the user / returning the token
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "post",
  route: "/login",
  incFile: "../routes/api/users/login"
});

//Route     POST /api/users/register
//Desc      Register a User
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "post",
  route: "/register",
  incFile: "../routes/api/users/register"
});

//export
module.exports = router;
