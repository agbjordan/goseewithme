const express = require("express");

// router
const router = express.Router();

//USER ROUTES

//Route     GET /api/users/test
//Desc      Test User Route
//Access    Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

//export
module.exports = router;
