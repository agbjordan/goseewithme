//dependencies
const express = require("express");
const router = express.Router();

//functions
const routeFunctions = require("../../../functions/routeFunctions");
const routerSet = new routeFunctions();

//Route     GET /api/license/current
//Desc      Return the current users license
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "get",
  route: "/",
  incFile: "../routes/api/licenses/get_license.js"
});

//Route     POST /api/license/create
//Desc      Create a Guide profile
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "post",
  route: "/",
  incFile: "../routes/api/licenses/post_license.js"
});

//Route     DELETE /api/licnese/delete
//Desc      Remove the current users guide license
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "delete",
  route: "/",
  incFile: "../routes/api/licenses/delete_license.js"
});

//export
module.exports = router;
