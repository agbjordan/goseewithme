const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//require Keys
const db = require("./config/keys-dev").mongoURI;

//require api routes
//Auth routes
const pw = require("./routes/api/pw");
const users = require("./routes/api/users");

//profile routes
const profiles = require("./routes/api/profiles");
const contactInfo = require("./routes/api/contactInfo");
const follows = require("./routes/api/follows");
const followers = require("./routes/api/followers");
const languages = require("./routes/api/languages");
const license = require("./routes/api/license");
const newsletters = require("./routes/api/newsletters");
const socialMedia = require("./routes/api/socialMedia");

//booking routes
const bookings = require("./routes/api/bookings");

//newsfeed routes
const posts = require("./routes/api/posts");

//product routes
const products = require("./routes/api/products");

//review routes
const reviews = require("./routes/api/reviews");

//express environment
const app = express();
const port = process.env.port || 5000;

//connect to MongoDB
//deprecation workaround
mongoose.set("useFindAndModify", false);
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB is Connected"))
  .catch(err => console.log(err));

//body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
//Passport Config File
require("./config/passport.js")(passport);

//routes
app.use("/api/bookings", bookings);
app.use("/api/contactInfo", contactInfo);
app.use("/api/follows", follows);
app.use("/api/followers", followers);
app.use("/api/languages", languages);
app.use("/api/license", license);
app.use("/api/newsletters", newsletters);
app.use("/api/posts", posts);
app.use("/api/products", products);
app.use("/api/profiles", profiles);
app.use("/api/pw", pw);
app.use("/api/reviews", reviews);
app.use("/api/users", users);
app.use("/api/socialMedia", socialMedia);

//run server
app.listen(port, () => console.log(`Server running on port ${port}`));
