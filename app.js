import express from "express";
import mongoose from "mongoose";
var app = express();
import methodOverride from "method-override";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "./models/user.js";
import session from "express-session";
import MongoStore from "connect-mongodb-session";
import bodyParser from "body-parser";
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
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
var store = new MongoStore(session)({
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
  /*   if (req.rawHeaders[1] !== "localhost:8000") {
+     return res.json({
      Error: "Access denined",
      ErrorCode:  1
    }) 
  } */
  res.locals.currentUser = req.user;
  next();
});

import routerJS from "./routes/router.js";
app.use(routerJS);
/*
app.use(itemsRoute);
app.use(indexRoute);
 */

app.listen(port, function () {
  console.log("Server Is Now Started!");
});
