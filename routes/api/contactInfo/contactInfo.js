//dependencies
const express = require("express");
const router = express.Router();

//functions
const routeFunctions = require("../../../functions/routeFunctions");
const routerSet = new routeFunctions();

//Route     GET /api/contactInfo
//Desc      Return the current users contact information
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "get",
  route: "/",
  incFile: "../routes/api/contactInfo/get_contactInfo"
});

//Route     POST /api/contactInfo/create
//Desc      Create Profile Contact Info
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "post",
  route: "/",
  incFile: "../routes/api/contactInfo/post_contactInfo"
});

//Route     DELETE /api/contactInfo/delete
//Desc      Remove the current users guide license
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "delete",
  route: "/",
  incFile: "../routes/api/contactInfo/delete_contactInfo"
});
//export
module.exports = router;
