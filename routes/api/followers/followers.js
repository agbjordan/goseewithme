//dependencies
const express = require("express");
const router = express.Router();

//functions
const routeFunctions = require("../../../functions/routeFunctions");
const routerSet = new routeFunctions();

//Route     GET /api/followers
//Desc      Get the followers of current user
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "get",
  route: "/",
  incFile: "../routes/api/followers/get_followers.js"
});

//Route     POST /api/followers
//Desc      Add a follower to the current user
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "post",
  route: "/",
  incFile: "../routes/api/followers/post_follower.js"
});

//Route     DELETE /api/followers
//Desc      Remove a follower from the current user
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "delete",
  route: "/",
  incFile: "../routes/api/followers/delete_follower.js"
});

//Route     DELETE /api/followers/all
//Desc      Remove all followers from the current user
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "delete",
  route: "/all",
  incFile: "../routes/api/followers/delete_followers.js"
});

//export
module.exports = router;
