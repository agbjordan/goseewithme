const express = require("express");

// router
const router = express.Router();

//NEWSLETTERS ROUTES

//Route     GET /api/newsletters/test
//Desc      Test Newsletters Route
//Access    Public
router.get("/test", (req, res) => res.json({ msg: "Newsletters Works" }));

//export
module.exports = router;
