const express = require("express");

// router
const router = express.Router();

//REVIEW ROUTES

//Route     GET /api/reviews/test
//Desc      Test Reviews Route
//Access    Public
router.get("/test", (req, res) => res.json({ msg: "Users Reviews" }));

//export
module.exports = router;
