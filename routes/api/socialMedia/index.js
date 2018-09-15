//dependencies
const express = require("express");
const router = express.Router();

//functions
const routeFunctions = require("../../../functions/routeFunctions");
const routerSet = new routeFunctions();

//Route     GET /api/socialMedia/current
//Desc      Return the current users Social Media
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "get",
  route: "/",
  incFile: "../routes/api/socialMedia/get_socialMedia"
});

//Route     GET /api/socialMedia/id
//Desc      Return the Social Media of a user
//Access    Private
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/:id",
  incFile: "../routes/api/socialMedia/get_socialMedia_byID"
});

//Route     POST /api/socialMedia/create
//Desc      Create current users Social Media
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "post",
  route: "/",
  incFile: "../routes/api/socialMedia/post_socialMedia"
});

//Route     DELETE /api/socialMedia/delete
//Desc      Remove the current users socialMedia
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "delete",
  route: "/",
  incFile: "../routes/api/socialMedia/delete_socialMedia"
});

//export
module.exports = router;
