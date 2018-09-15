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
/// GET     /                                   - all reviews
/// GET     /:reviewID                          - a specific review
/// GET     /limit/:limit                       - all reviews with a status
/// GET     /status/:status                     - all reviews with a status
/// GET     /status/:status/limit/:limit        - all reviews with a status

/// GET REVIEWS BY CURRENT USER
/// GET     /current                                - all reviews from current user
/// GET     /current/:reviewID                      - a specific review current user
/// GET     /current/limit/:limit                   - all reviews from current user with limit
/// GET     /current/status/:status                 - all reviews from current user with status
/// GET     /current/status/:status/limit/:limit    - all reviews from current user with status

/// GET REVIEWS BY USER
/// GET     /u/:id                              - all reviews from a user
/// GET     /u/:id/:reviewID                    - a specific review from a user
/// GET     /u/:id/limit/:limit                 - all reviews from a user with a limit
/// GET     /u/:id/status/:status               - all reviews from a user with a status
/// GET     /u/:id/status/:status/limit/:limit  - all reviews from a user with a status and limit

/// GET REVIEWS OF PRODUCTS/AGENT/GUIDE
/// GET     /i/:id                              - all reviews from a product
/// GET     /i/:id/:reviewID                    - a specific review from a product
/// GET     /i/:id/limit/:limit                 - all reviews from a product with a limit
/// GET     /i/:id/status/:status               - all reviews from a product with a status
/// GET     /i/:id/status/:status/limit/:limit  - all reviews from a product with a status and limit

/// POST    /                                   - create review
/// POST    /:id/status                         - change the status of review
/// POST    /:id/comment                        - add comment to review
/// POST    /:id/like                           - like or unlike review
/// POST    /:id/share                          - share review

/// DELETE  /:id                                - delete a review (must be owner)
/// DELETE  /:id/:cid                           - delete a comment (must be owner)

//////////////////////////////
//////////////////////////////
//////////// GET /////////////
//////////////////////////////
//////////////////////////////

//Route     GET /api/reviews
//Desc      Return all reviews
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/",
  incFile: routePath + "/get_ReviewsAll"
});

//Route     GET /api/reviews/:reviewID
//Desc      Return specific review
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/:reviewID",
  incFile: routePath + "/get_ReviewById"
});

//Route     GET /api/reviews/limit/:limit
//Desc      Return all review - limit
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/limit/:limit",
  incFile: routePath + "/get_ReviewAll_limit"
});

//Route     GET /api/reviews/status/:status
//          (Status options: inactive, active, highlight, banned)
//Desc      Return all review - by status
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/status/:status",
  incFile: routePath + "/get_ReviewAll_status"
});

//Route     GET /api/reviews/status/:status/limit/:limit
//          (Status options: inactive, active, highlight, banned)
//Desc      Return all review - by status and limit
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/status/:status/limit/:limit",
  incFile: routePath + "/get_ReviewAll_both"
});

//Route     GET /api/reviews/current
//Desc      Return all reviews from current user
//Access    public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/current",
  incFile: routePath + "/get_CurrentReviewsAll"
});

//Route     GET /api/reviews/current/:id
//Desc      Return specific review from current user
//Access    public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/current/:id",
  incFile: routePath + "/get_CurrentReviewById"
});

//Route     GET /api/reviews/current/limit/:limit
//Desc      Return all review from current user - limit
//Access    public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/current/limit/:limit",
  incFile: routePath + "/get_CurrentReviewAll_limit"
});

//Route     GET /api/reviews/current/status/:status
//          (Status options: inactive, active, highlight, banned)
//Desc      Return all review from current user - by status
//Access    public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/current/status/:status",
  incFile: routePath + "/get_CurrentReviewAll_status"
});

//Route     GET /api/reviews/current/status/:status/limit/:limit
//          (Status options: inactive, active, highlight, banned)
//Desc      Return all review from current user - by status and limit
//Access    public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/current/status/:status/limit/:limit",
  incFile: routePath + "/get_CurrentReviewAll_both"
});

//Route     GET /api/reviews/u/:id
//Desc      Return all reviews from user
//Access    public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/u/:id",
  incFile: routePath + "/get_UserReviewsAll"
});

//Route     GET /api/reviews/u/:id/:reviewID
//Desc      Return specific review from user
//Access    public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/u/:id/:reviewID",
  incFile: routePath + "/get_UserReviewById"
});

//Route     GET /api/reviews/u/:id/limit/:limit
//Desc      Return all review from user - limit
//Access    public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/u/:id/limit/:limit",
  incFile: routePath + "/get_UserReviewAll_limit"
});

//Route     GET /api/reviews/u/:id/status/:status
//          (Status options: inactive, active, highlight, banned)
//Desc      Return all review from current user - by status
//Access    public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/u/:id/status/:status",
  incFile: routePath + "/get_UserReviewAll_status"
});

//Route     GET /api/reviews/u/:id/status/:status/limit/:limit
//          (Status options: inactive, active, highlight, banned)
//Desc      Return all review from user - by status and limit
//Access    public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/u/:id/status/:status/limit/:limit",
  incFile: routePath + "/get_UserReviewAll_both"
});

//Route     GET /api/reviews/u/:id
//Desc      Return all reviews about Item
//Access    public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/i/:id",
  incFile: routePath + "/get_ItemReviewsAll"
});

//Route     GET /api/reviews/u/:id/:reviewID
//Desc      Return specific review about Item
//Access    public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/i/:id/:reviewID",
  incFile: routePath + "/get_ItemReviewById"
});

//Route     GET /api/reviews/i/:id/limit/:limit
//Desc      Return all review about Item - limit
//Access    public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/i/:id/limit/:limit",
  incFile: routePath + "/get_ItemReviewAll_limit"
});

//Route     GET /api/reviews/i/:id/status/:status
//          (Status options: inactive, active, highlight, banned)
//Desc      Return all review about Item - by status
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/i/:id/status/:status",
  incFile: routePath + "/get_ItemReviewAll_status"
});

//Route     GET /api/reviews/i/:id/status/:status/limit/:limit
//          (Status options: inactive, active, highlight, banned)
//Desc      Return all review about Item - by status and limit
//Access    public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/i/:id/status/:status/limit/:limit",
  incFile: routePath + "/get_ItemReviewAll_both"
});

//////////////////////////////
//////////////////////////////
////////////POSTS/////////////
//////////////////////////////
//////////////////////////////

//Route     POST /api/reviews
//Desc      Create review
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "post",
  route: "/",
  incFile: routePath + "/post_Review"
});

//Route     POST /api/review/:id/status
//Desc      Update Status
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "post",
  route: "/:id/status",
  incFile: routePath + "/post_Status"
});

//Route     POST /api/review/:id/comment
//Desc      Create a new comment
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "post",
  route: "/:id/comment",
  incFile: routePath + "/post_Comment"
});

//Route     POST /api/review/:id/like
//Desc      Add or Remove a like
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "post",
  route: "/:id/like",
  incFile: routePath + "/post_Like"
});

//Route     POST /api/review/:id/share
//Desc      Add a share
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "post",
  route: "/:id/share",
  incFile: routePath + "/post_Share"
});

//////////////////////////////
//////////////////////////////
////////////DELETE////////////
//////////////////////////////
//////////////////////////////

//Route     DELETE /api/posts/p/:id/comment/:cid
//Desc      Create a new comment
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "delete",
  route: "/:id/:cid",
  incFile: routePath + "/delete_Comment"
});

//Route     DELETE /api/posts/p/:id
//Desc      delete a new post
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "delete",
  route: "/:id",
  incFile: routePath + "/delete_Post"
});

//export
module.exports = router;
