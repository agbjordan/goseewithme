//dependencies
const express = require("express");
const router = express.Router();

//functions
const routeFunctions = require("../../../functions/routeFunctions");
const routerSet = new routeFunctions();

//Route     GET /api/newsletters
//Desc      Return the current users license
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "get",
  route: "/",
  incFile: "../routes/api/newsletters/get_newsletters"
});

//Route     POST /api/newsletters
//Desc      Create a Guide profile
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "post",
  route: "/",
  incFile: "../routes/api/newsletters/post_newsletters"
});

//Route     DELETE /api/newsletters
//Desc      Remove the current users guide license
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "delete",
  route: "/",
  incFile: "../routes/api/newsletters/delete_newsletters"
});

//export
module.exports = router;
