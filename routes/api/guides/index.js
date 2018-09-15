//dependencies
const express = require("express");
const router = express.Router();

//functions
const routeFunctions = require("../../../functions/routeFunctions");
const routerSet = new routeFunctions();

//Route     GET /api/guide
//Desc      Return the current guide
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "get",
  route: "/",
  incFile: "../routes/api/guides/get_guide.js"
});

//Route     GET /api/guide/:id
//Desc      Return the guide by ID
//Access    public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/:id",
  incFile: "../routes/api/guides/get_guide_byID.js"
});

//Route     POST /api/guide
//Desc      Create a Guide profile
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "post",
  route: "/",
  incFile: "../routes/api/guides/post_guide.js"
});

//Route     DELETE /api/guide
//Desc      Delete a Guide profile
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "delete",
  route: "/",
  incFile: "../routes/api/guides/delete_guide.js"
});

//export
module.exports = router;
