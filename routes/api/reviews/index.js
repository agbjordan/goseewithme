//dependencies
const express = require("express");
const router = express.Router();

//functions
const routeFunctions = require("../../../functions/routeFunctions");
const routerSet = new routeFunctions();

//defaults
const routePath = "../routes/api/reviews";

/// routes
/// GET ALL REVIEWS
/// GET     /                      - all reviews
/// GET     /:id                   - a specific review
/// GET     /limit/:limit          - all reviews with a status
/// GET     /status/:status        - all reviews with a status

/// GET REVIEWS BY CURRENT USER
/// GET     /current               - all reviews from current user
/// GET     /current/limit/:limit  - all reviews from current user with limit
/// GET     /current/status/:status
///                                 - all reviews from current user with status
/// GET     /current/status/:status/limit/:limit
///                                 - all reviews from current user with status

/// GET REVIEWS BY USER
/// GET     /u/:id                              - all reviews from a user
/// GET     /u/:id/limit/:limit                 - all reviews from a user with a limit
/// GET     /u/:id/status/:status               - all reviews from a user with a status
/// GET     /u/:id/status/:status/limit/:limit  - all reviews from a user with a status and limit

/// GET REVIEWS OF PRODUCTS
/// GET     /p/:id                              - all reviews from a product
/// GET     /p/:id/limit/:limit                 - all reviews from a product with a limit
/// GET     /p/:id/status/:status               - all reviews from a product with a status
/// GET     /p/:id/status/:status/limit/:limit  - all reviews from a product with a status and limit

/// GET REVIEWS OF GUIDE
/// GET     /g/:id                              - all reviews for a guide
/// GET     /g/:id/limit/:limit                 - all reviews for a guide with a limit
/// GET     /g/:id/status/:status               - all reviews for a guide with a status
/// GET     /g/:id/status/:status/limit/:limit  - all reviews for a guide with a status and limit

/// GET REVIEWS OF AGENT
/// GET     /a/:id                              - all reviews for a agent
/// GET     /a/:id/limit/:limit                 - all reviews for a agent with a limit
/// GET     /a/:id/status/:status               - all reviews for a agent with a status
/// GET     /a/:id/status/:status/limit/:limit  - all reviews for a agent with a status and limit

/// POST    /p/:id                              - create product review
/// POST    /g/:id                              - create guide review
/// POST    /a/:id                              - create agent review
/// POST    /changeStatus/:id                   - change the status of a review
/// POST    /:id/comment                        - add comment on review
/// POST    /:id/like                           - like or unlike a review
/// POST    /:id/share                          - share a review

/// DELETE  /:id                                - delete a review (must be owner)
/// DELETE  /:id/comment/:cid                   - delete a comment (must be owner)

//////////////////////////////
//////////////////////////////
//////////// GET /////////////
//////////////////////////////
//////////////////////////////

//Route     GET /api/posts
//Desc      Return the current users posts
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "get",
  route: "/",
  incFile: routePath + "/get_ReviewsAll"
});

//export
module.exports = router;
