const express = require("express");

// router
const router = express.Router();

//BOOKINGS ROUTES

//Route     GET /api/bookings/test
//Desc      Test booking Route
//Access    Public
router.get("/test", (req, res) => res.json({ msg: "Bookings Works" }));

//export
module.exports = router;
