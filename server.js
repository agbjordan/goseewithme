const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//require Keys
const db = require("./config/keys-dev").mongoURI;

//require api routes
const bookings = require("./routes/api/bookings");
const newsletters = require("./routes/api/newsletters");
const posts = require("./routes/api/posts");
const products = require("./routes/api/products");
const profiles = require("./routes/api/profiles");
const reviews = require("./routes/api/reviews");
const users = require("./routes/api/users");

//express environment
const app = express();
const port = process.env.port || 5000;

//connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB is Connected"))
  .catch(err => console.log(err));

//run server
app.get("/", (req, res) => res.send("hi mum"));

//body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use("/api/bookings", bookings);
app.use("/api/newsletters", newsletters);
app.use("/api/posts", posts);
app.use("/api/products", products);
app.use("/api/profiles", profiles);
app.use("/api/reviews", reviews);
app.use("/api/users", users);

//run server
app.listen(port, () => console.log(`Server running on port ${port}`));
