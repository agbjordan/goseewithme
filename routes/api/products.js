const express = require("express");

// router
const router = express.Router();

//PRODUCT ROUTES

//Route     GET /api/Products/test
//Desc      Test Products Route
//Access    Public
router.get("/test", (req, res) => res.json({ msg: "Users Products" }));

//export
module.exports = router;
