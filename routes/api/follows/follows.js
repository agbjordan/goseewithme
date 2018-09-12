//dependencies
const express = require("express");
const router = express.Router();

//functions
const routeFunctions = require("../../../functions/routeFunctions");
const routerSet = new routeFunctions();

//Route     GET /api/follows
//Desc      Get the follows of a user
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/:id",
  incFile: "../routes/api/follows/get_follows.js"
});

//Route     GET /api/follows/all
//Desc      Get the follows of current user
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "get",
  route: "/",
  incFile: "../routes/api/follows/getAll_follows.js"
});

//Route     POST /api/follows
//Desc      Add a follower to the current user
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "post",
  route: "/",
  incFile: "../routes/api/follows/post_follows.js"
});

//Route     DELETE /api/follows
//Desc      Remove a follower to the current user
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "delete",
  route: "/",
  incFile: "../routes/api/follows/delete_follows.js"
});

//Route     Delete /api/follows/all
//Desc      Delete a user to the current users follow list
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "delete",
  route: "/all",
  incFile: "../routes/api/follows/deleteAll_follows.js"
});

//export
module.exports = router;
