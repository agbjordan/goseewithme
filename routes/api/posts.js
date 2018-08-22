const express = require("express");

// router
const router = express.Router();

//POST ROUTES

//Route     GET /api/posts/test
//Desc      Test Posts Route
//Access    Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

//export
module.exports = router;
