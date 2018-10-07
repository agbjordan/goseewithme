//dependencies
const express = require("express");
const passport = require("passport");
const router = express.Router();

//functions
const routeFunctions = require("../../../functions/routeFunctions");
const routerSet = new routeFunctions();

//Route     GET /api/administrators/
//Desc      Return the current user
//Access    Private
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) =>
  res.json({
    id: req.user._id,
    name: req.user.firstname + " " + req.user.surname,
    userRole: req.user.userRole,
    email: req.user.email,
    roles: req.user.customRoles
  })
);

//Route     POST /api/administrators/get
//Desc      Get All Administrators
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/get",
  incFile: "../routes/api/administrators/get"
});

//Route     POST /api/administrators/get/id
//Desc      Get specific Administrators by id
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/get/:id",
  incFile: "../routes/api/administrators/getById"
});

//////////////////////////
////////// POST //////////
//////////////////////////

//Route     POST /api/administrators/login
//Desc      Login the user / returning the token
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "post",
  route: "/login",
  incFile: "../routes/api/administrators/login"
});

//Route     POST /api/administrators/register
//Desc      Register a User
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "post",
  route: "/register",
  incFile: "../routes/api/administrators/register"
});

//Route     POST /api/administrators/update
//Desc      Update a User
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "post",
  route: "/update",
  incFile: "../routes/api/administrators/update"
});

//Route     DELETE /api/administrators/register
//Desc      Delete a User
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "delete",
  route: "/delete/:id",
  incFile: "../routes/api/administrators/delete"
});

//export
module.exports = router;
