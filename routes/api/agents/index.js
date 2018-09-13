//dependencies
const express = require("express");
const router = express.Router();

//functions
const routeFunctions = require("../../../functions/routeFunctions");
const routerSet = new routeFunctions();

//Route     GET /api/agents
//Desc      Return the current agent
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "get",
  route: "/",
  incFile: "../routes/api/agents/get.js"
});

//Route     GET /api/agents/:id
//Desc      Return the agent by ID
//Access    public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/:id",
  incFile: "../routes/api/agents/get_byID.js"
});

//Route     POST /api/agents
//Desc      Create a agent profile
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "post",
  route: "/",
  incFile: "../routes/api/agents/post.js"
});

//Route     DELETE /api/agents
//Desc      Delete a agent profile
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "delete",
  route: "/",
  incFile: "../routes/api/agents/delete.js"
});

//export
module.exports = router;
