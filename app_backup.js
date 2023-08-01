var express = require("express"),
  mongoose = require("mongoose"),
  app = express(),
  cart = require("./models/cart.js"),
  methodOverride = require("method-override");
(passport = require("passport")),
  (LocalStrategy = require("passport-local")),
  (User = require("./models/user")),
  (forgotpass = require("./models/forgotpass.js")),
  (order = require("./models/order.js")),
  (product = require("./models/product.js")),
  (restaurant = require("./models/restaurant.js")),
  (middleware = require("./middleware/middleware.js")),
  (session = require("express-session")),
  (MongoStore = require("connect-mongodb-session")(session)),
  (bodyParser = require("body-parser"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
require("dotenv").config({ path: "./.env" });
const DB = process.env.db;
const secretCode = process.env.secret;
const port = process.env.PORT || 5000;
//app.use(express.static(__dirname + "/public"));
//app.set("view engine", "ejs");

//ONLINE MONGODB ATLAS
mongoose
  .connect(DB)
  .then(() => {
    console.log("DATABASE CONNECTED to localhost:" + port);
  })
  .catch((err) => console.log("Database Connecting Error"));

//Offline MONGO
//mongoose.connect("mongodb://localhost:27017/ttchannel").then( () => console.log("success")).catch((err)=>console.log(err));

//session
var store = new MongoStore({
  uri: DB,
  collection: "sessions",
  secret: "secretCode",
});
store.on("error", function (error) {
  console.log(error);
});

app.use(
  session({
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
    secret: "secretCode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  if (req.rawHeaders[1] !== "localhost:8000") {
    return res.json({
      Error: "Access denined",
      ErrorCode:  1
    })
  }
  res.locals.currentUser = req.user;
  next();
});

var routerJS = require("./routes/router");
app.use(routerJS);
/*
app.use(itemsRoute);
app.use(indexRoute);
 */

app.listen(port, function () {
  console.log("EKart Server Is Now Started!");
});