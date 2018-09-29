//dependencies
const express = require("express");
const router = express.Router();

//functions
const routeFunctions = require("../../../functions/routeFunctions");
const routerSet = new routeFunctions();

//defaults
const routePath = "../routes/api/products";

//PRODUCT ROUTES
/// GET ALL PRODUCTS
/// GET     /                                   - all products
/// GET     /:id                                - a specific review
/// GET     /limit/:limit                       - all products with limit
/// GET     /sort/:sort                         - all products sorted
/// GET     /sort/:sort/limit/:limit            - all products sorted with limit
/// GET     /status/:status                     - all products with a status
/// GET     /status/:status/limit/:limit        - all products with a status and limit

/// GET PRODUCTS BY USER
/// GET     /u/:id                              - all products from a user
/// GET     /u/:id/limit/:limit                 - all products from a user with a limit
/// GET     /u/:id/sort/:sort                   - all products from a user sorted
/// GET     /u/:id/sort/:sort/limit/:limit      - all products from a user sorted with limit
/// GET     /u/:id/status/:status               - all products from a user with a status
/// GET     /u/:id/status/:status/limit/:limit  - all products from a user with a status and limit

/// GET AGENTS ASSOCIATED WITH PRODUCT
/// GET     /a/:id                              - all agents asssociate with a product

/// GET GUIDES ASSOCIATED WITH PRODUCT
/// GET     /g/:id                              - all agents asssociate with a product

/// CRUD CONTROLS
/// POST    /                                   - create product
/// POST    /:id                                - update product
/// POST    /:id/status                         - change the status of product
/// DELETE  /:id                                - delete a product (must be owner)

/// IMAGES
/// POST    /:id/images                         - upload images
/// POST    /:id/images/thumbnail               - upload thumbnail
/// POST    /:id/images/hero                    - upload hero
/// DELETE  /:id/images                         - delete all images
/// DELETE  /:id/images/:image                  - delete specific image
/// DELETE  /:id/images/thumbnail               - delete thumbnail
/// DELETE  /:id/images/hero                    - delete hero

/// ADDONS
/// POST    /:id/addon                          - create an addon
/// POST    /:id/addon/:addOnId                 - upload an addon
/// DELETE  /:id/addon/                         - delete all addons
/// DELETE  /:id/addon/:addOnId                 - delete an addon

/// LOCATION
/// POST    /:id/location                       - create/update location

/// DETAILS
/// POST    /:id/details                        - create/update details

/// MAP
/// POST    /:id/map                            - add a pin to map
/// POST    /:id/map/:pinId                     - add a specific pin on the map
/// DELETE  /:id/map/:pinId                     - delete a pin on the map

/// CATEGORIES
/// POST    /:id/categories                     - add/edit categories

/// FEATURES
/// POST    /:id/features                       - add/edit features

/// CURRENCY
/// POST    /:id/currency                       - add/edit currency

/// GUIDES
/// POST    /:id/guide                          - add a guide
/// DELETE  /:id/guide/:guideId                 - delete a guide

/// OPTIONS
/// POST    /:id/options                        - add a new option
/// POST    /:id/options/:optionId              - udpate an option
/// DELETE  /:id/options/:optionId              - delete an option

/// OPTIONS - itinerary
/// POST    /:id/itinerary                      - add / update itinerary
/// DELETE  /:id/itinerary/:itineraryId         - delete an itinerary

/// OPTIONS - item
/// POST    /:id/item                           - add an item
/// POST    /:id/item/:itemId                   - update an item
/// DELETE  /:id/item/:itemId                   - delete an item

/// OPTIONS - item - price
/// POST    /:id/price                          - add price
/// POST    /:id/price/:priceID                 - edit price
/// DELETE  /:id/price/:priceID                 - delete price

//////////////////////////////
//////////////////////////////
//////////// GET /////////////
//////////////////////////////
//////////////////////////////

//////////////////////////////
//////////////////////////////
///ALL

//Route     GET /api/products
//Desc      Return all products
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/",
  incFile: routePath + "/get_ProductsAll"
});

//Route     GET /api/products/:id
//Desc      Return a product
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/:id",
  incFile: routePath + "/get_ProductsById"
});

//Route     GET /api/products/limit/:limit
//Desc      Return all products with limit
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/limit/:limit",
  incFile: routePath + "/get_ProductsById"
});

//Route     GET /api/products/sort/:sort
//Desc      Return all products with sort
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/sort/:sort",
  incFile: routePath + "/get_ProductsSort"
});

//Route     GET /api/products/sort/:sort/limit/:limit
//Desc      Return all products with sort and limit
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/sort/:sort/limit/:limit",
  incFile: routePath + "/get_ProductsSort_limit"
});

//Route     GET /api/products/status/:status
//Desc      Return all products with status
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/status/:status",
  incFile: routePath + "/get_ProductsStatus"
});

//Route     GET /api/products/status/:status/limit/:limit
//Desc      Return all products with status and limit
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/status/:status/limit/:limit",
  incFile: routePath + "/get_ProductsStatus_limit"
});

//////////////////////////////////
//////////////////////////////////
///CURRENT

//Route     GET /api/products/u/:id
//Desc      Return all products
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/u/:id",
  incFile: routePath + "/get_UserProductsAll"
});

//Route     GET /api/products/u/:id/limit/:limit
//Desc      Return all products
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/u/:id/limit/:limit",
  incFile: routePath + "/get_UserProductsAll_limit"
});

//Route     GET /api/products/u/:id/sort/:sort
//Desc      Return all products with sort
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/u/:id/sort/:sort",
  incFile: routePath + "/get_UserProductsAllSort"
});

//Route     GET /api/products/u/:id/sort/:sort/limit/:limit
//Desc      Return all products sorted and limited
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/u/:id/sort/:sort/limit:/limit",
  incFile: routePath + "/get_UserProductsAllSort_limit"
});

//Route     GET /api/products/u/:id/status/:status
//Desc      Return all products with sort
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/u/:id/status/:status",
  incFile: routePath + "/get_UserProductsAllStatus"
});

//export
module.exports = router;
