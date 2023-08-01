var express = require("express"),
  router = express.Router(),
  cart = require("../models/cart.js"),
  log = require("../models/logs.js"),
  log = require("../models/logs.js"),
  product = require("../models/product.js");
router.use(require("flash")());

router.get("/user", function (req, res) {
  return res.json(req.user);
});

router.post("/loginst1", function (req, res) {
  res.redirect("/loginst2");
  stlat = req.body.demo;
  stlong = req.body.demo1;
});

router.get("/products", function (req, res) {
  if (!req.user) return res.json({Error: "Access Denied"});
  product.find({}, function (err, product) {
    res.json(product);
  });
});

router.get("/register", function (req, res) {
  res.render("register");
});

router.get("/login", function (req, res) {
  if (!req.user) {
    res.render("login");
  } else {
    res.redirect("/myaccount");
  }
});

//signout
router.post("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

// REGISTER
router.post("/register", function (req, res) {
  var newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    number: req.body.number,
    dob: req.body.dob,
    gender: req.body.gender,
    username: req.body.username,
  });
  //console.log(req.body.firstname);
  //req.body.password);
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log("ERROR CODE 19" + err);
    } else {
      passport.authenticate("local")(req, res, function () {
        console.log("registered new user", req.user);
        res.locals.currentUser = req.user;

        var newcart = new cart({
          user: req.user.id,
        });
        newcart.save();
        const newlog = new log({
          username: req.body.username,
          userid: "ObjectId(" + req.user.id + ")",
          data1: "new user registered",
        });
        newlog.save();
        res.redirect("/emailveriy");
      });
    }
  });
});

//LOGIN
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.post("/cart/:id", function (req, res) {
  var updatesuccess;
  var proid = "1";
  var productid = req.params.id;
  // console.log(proid);
  product
    .findById(productid)
    .catch((err) => {
      console.log("ERROR CODE 1" + err);
    })
    .then((doc) => {
      //console.log(doc);
      cart.findOneAndUpdate(
        { user: req.user.id },
        { store: doc.restid, deliveryAddress: req.user.address },
        function (err, data) {
          if (err) {
            console.log("ERROR CODE 2" + err);
          } else {
            for (t = 0; t < data.products.length; t++) {
              if (data.products[t].product == productid) {
                var parseint =
                  parseInt(data.products[t].quantity) + parseInt(proid[0]);
                cart.findOneAndUpdate(
                  { user: req.user.id },
                  {
                    products: [
                      {
                        product: data.products[t].product,
                        quantity: parseint,
                        price: data.products[t].price,
                      },
                    ],
                  },
                  function (err, data) {
                    if (err) {
                      console.log("ERROR CODE 3" + err);
                    } else {
                      updatesuccess = "updatesuccess";
                    }
                  }
                );
              } else {
                if (
                  t == data.products.length - 1 &&
                  updatesuccess !== "updatesucess"
                ) {
                  //console.log(t,data.products.length-1);
                  // {$push: { products:[{"product": doc.id,"quantity": proid[0] ,"price": doc.price  }]
                  cart.findOneAndUpdate(
                    { user: req.user.id },
                    {
                      $push: {
                        products: [
                          {
                            product: doc.id,
                            quantity: proid[0],
                            price: doc.price,
                          },
                        ],
                      },
                    },
                    function (err, data) {
                      if (err) {
                        console.log("ERROR CODE 4" + err);
                      } else {
                      }
                    }
                  );
                  break;
                }
              }
            }
          }
        }
      );
    });
});

//cart
router.get("/cart", function (req, res) {
  random = req.user.id;
  cart.find({ user: random }, function (err, cart) {
    res.json(cart[0]);
  });
});

//deletecartproduct
router.post("/deletecartproduct/:id", function (req, res) {
  var id = [];
  req.body.delproduct = req.params.id;
  cart.find({ user: req.user.id }, function (err, model) {
    var doc = model[0];
    for (i = 0; i < doc.products.length; i++) {
      id[i] = doc.products[i];
      if (id[i].product == req.body.delproduct) {
        id[i] = null;
      }
    }
    cart.findOneAndUpdate(
      { user: req.user.id },
      { products: [{ product: "", quantity: "", price: "" }] },
      function (err, data) {
        if (err) {
          console.log("ERROR CODE 7" + err);
        } else {
        }
      }
    );
    id = id.filter((el) => {
      return el !== "" && el !== null && typeof el !== "undefined";
    });
    cart.findOneAndUpdate(
      { user: req.user.id },
      { $push: { products: id } },
      function (err, data) {
        if (err) {
          console.log("ERROR CODE 8" + err);
        } else {
        }
      }
    );
  });
  res.redirect("/");
});

//orderpost
router.post("/orderpost/:newcartid", function (req, res) {
/*   a.findOneAndUpdate(
    { username: req.user.username },
    { paid: false },
    function (err, data) {
      if (err) {
        console.log("ERROR CODE 6" + err);
      }
    }
  ); */
  cart
    .findById(req.params.newcartid)
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    })
    .then((doc) => {
      const neworder = new order({
        userid: doc.user,
        storeid: doc.store,
        products: doc.products,
      });
      neworder.save();
      res.json(neworder);
    });
});

module.exports = router;
