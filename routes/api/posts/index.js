//dependencies
const express = require("express");
const router = express.Router();

//functions
const routeFunctions = require("../../../functions/routeFunctions");
const routerSet = new routeFunctions();

//defaults
const routePath = "../routes/api/posts";

//routes
/// GET      /                     - all posts from current user
/// GET      /limit/:limit         - limited number of posts from current user
/// GET      /f                    - posts from current users follows list
/// GET      /f/limit/:limit       - posts from current users follows list with limit
/// GET      /p/                   - all posts
/// GET      /p/:id                - post with :id
/// GET      /p/:id/likes          - likes list from post :id
/// GET      /p/:id/shares         - shared number from post :id
/// GET      /p/limit/:limit       - all posts with limit
/// GET      /u                    - all posts from users
/// GET      /u/:id                - all posts from user :id
/// GET      /u/:id/limit/:limit   - all posts from user :id with limit
/// POST     /                     - add/edit a posts
/// POST     /comment/:id          - add/edit a comment
/// POST     /like/:id             - add/remove a like from :id post
/// POST     /share/:id            - increment share by 1 on :id post
/// DELETE   /p/:id/comment/:cid   - delete a comment
/// DELETE   /p/:id                - delete a post

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
  incFile: routePath + "/get_CurrentUserPosts"
});

//Route     GET /api/posts/limit/:limit
//Desc      Return the current users posts
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "get",
  route: "/limit/:limit",
  incFile: routePath + "/get_CurrentUserPosts_limit"
});

//Route     GET /api/posts/f
//Desc      Return all posts from follows list
//Access    private
routerSet.privateRoute({
  router,
  routeType: "get",
  route: "/f",
  incFile: routePath + "/get_FollowPosts"
});

//Route     GET /api/posts/f
//Desc      Return all posts from follows list - limit
//Access    private
routerSet.privateRoute({
  router,
  routeType: "get",
  route: "/f/limit/:limit",
  incFile: routePath + "/get_FollowPosts_limit"
});

//Route     GET /api/posts/p
//Desc      Return all posts
//Access    public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/p",
  incFile: routePath + "/get_PostsAll"
});

//Route     GET /api/posts/p/:id
//Desc      Return a specific post
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/p/:id",
  incFile: routePath + "/get_PostsById"
});

//Route     GET /api/posts/p/:id/likes
//Desc      Return the likes list from a post
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/p/:id/likes",
  incFile: routePath + "/getLikes_PostsById"
});

//Route     GET /api/posts/p/:id/shares
//Desc      Return the likes list from a post
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/p/:id/shares",
  incFile: routePath + "/getShares_PostsById"
});

//Route     GET /api/posts/p/limit/:limit
//Desc      Return all posts - limited
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/p/limit/:limit",
  incFile: routePath + "/get_PostsAll_limit"
});

//Route     GET /api/posts/u
//Desc      Return all posts
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/u",
  incFile: routePath + "/get_PostsAll"
});

//Route     GET /api/posts/u/:id
//Desc      Return post from a specific user
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/u/:id",
  incFile: routePath + "/get_PostsByUserId"
});

//Route     GET /api/posts/u/:id/limit:limit
//Desc      Return post from a specific user - limited
//Access    Public
routerSet.publicRoute({
  router,
  routeType: "get",
  route: "/u/:id/limit/:limit",
  incFile: routePath + "/get_PostsByUserId_limit"
});

//////////////////////////////
//////////////////////////////
////////////POSTS/////////////
//////////////////////////////
//////////////////////////////

//Route     POST /api/posts
//Desc      Create a new post
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "post",
  route: "/",
  incFile: routePath + "/post_Post"
});

//Route     POST /api/posts/c
//Desc      Create a new comment
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "post",
  route: "/comment/:id",
  incFile: routePath + "/post_Comment"
});

//Route     POST /api/p/like:/id
//Desc      Add or Remove a like
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "post",
  route: "/like/:id",
  incFile: routePath + "/post_Like"
});

//Route     POST /api/p/share
//Desc      Add a share
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "post",
  route: "/share/:id",
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
  route: "/p/:id/comment/:cid",
  incFile: routePath + "/delete_Comment"
});

//Route     DELETE /api/posts/p/:id
//Desc      delete a new post
//Access    Private
routerSet.privateRoute({
  router,
  routeType: "delete",
  route: "/p",
  incFile: routePath + "/delete_Post"
});

//export
module.exports = router;
