const express = require("express");

// router
const router = express.Router();

//PROFILES ROUTES

//Route     GET /api/profiles/test
//Desc      Test Profiles Route
//Access    Public
router.get("/test", (req, res) => res.json({ msg: "Profiles Works" }));

//export
module.exports = router;
