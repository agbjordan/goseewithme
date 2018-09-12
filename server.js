const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//require Keys
const db = require("./config/keys-dev").mongoURI;

//API routes
const bookings = require("./routes/api/bookings");
const contactInfo = require("./routes/api/contactInfo/contactInfo");
const follows = require("./routes/api/follows/follows");
const followers = require("./routes/api/followers/followers");
const guides = require("./routes/api/guides/guides");
const languages = require("./routes/api/languages/languages");
const license = require("./routes/api/licenses/licenses");
const newsletters = require("./routes/api/newsletters/newsletters");
const posts = require("./routes/api/posts");
const products = require("./routes/api/products");
const password = require("./routes/api/password/password");
const reviews = require("./routes/api/reviews");
const socialMedia = require("./routes/api/socialMedia/socialMedia");
const users = require("./routes/api/users/users");

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
require("./config/passport.js")(passport);

//API routes
app.use("/api/bookings", bookings);
app.use("/api/contactInfo", contactInfo);
app.use("/api/follows", follows);
app.use("/api/followers", followers);
app.use("/api/guides", guides);
app.use("/api/languages", languages);
app.use("/api/licenses", license);
app.use("/api/newsletters", newsletters);
app.use("/api/posts", posts);
app.use("/api/products", products);
app.use("/api/password", password);
app.use("/api/reviews", reviews);
app.use("/api/socialMedia", socialMedia);
app.use("/api/users", users);

//run server
app.listen(port, () => console.log(`Server running on port ${port}`));
