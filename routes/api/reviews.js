const express = require("express");

// router
const router = express.Router();

//REVIEW ROUTES

//Route     GET /api/reviews/
//Desc      Reviews from current user
//Access    Public
router.get("/", (req, res) => res.json({ msg: "Users Reviews" }));

//export
module.exports = router;
