//dependencies
const express = require("express");
const router = express.Router();

//functions
const routeFunctions = require("../../../functions/routeFunctions");
const routerSet = new routeFunctions();

//Route     GET /api/language/
//Desc      Return the current users language
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "get",
  route: "/",
  incFile: "../routes/api/languages/get_languages.js"
});

//Route     POST /api/langauges/
//Desc      Adds to an existing list of languages if language is not alreaady present
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "post",
  route: "/",
  incFile: "../routes/api/languages/post_languages.js"
});

//Route     DELETE /api/licnese/delete
//Desc      Remove the current users guide langauges
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "delete",
  route: "/all",
  incFile: "../routes/api/languages/delete_languages.js"
});

//Route     DELETE /api/licnese/delete/
//Desc      Remove a single language by it's ID
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "delete",
  route: "/",
  incFile: "../routes/api/languages/delete_languages_byID.js"
});

//export
module.exports = router;
