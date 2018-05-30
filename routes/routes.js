var express = require('express');
var passport = require("passport");
var path = require("path");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var path = require("path");
var session = require("express-session");
var bodyParser = require('body-parser')
var formidable = require('formidable');
var cookieParser = require("cookie-parser");

var itemNumber = 7;
var fs = require('fs');
var app = express();
var router = express.Router();
router.use(flash());
var User = require("../models/user");
var Game = require("../models/games");

var data = require('../mongo')
let db = new data();


router.use(session({
  secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
  resave: true,
  saveUninitialized: true
}));

router.use(function(req, res, next) {
  res.locals.currentUserjy = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.use(express.static(path.join(__dirname, "public")));


router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(cookieParser());


router.use(passport.initialize());
router.use(passport.session());

router.get("/successroot", function(req, res) {
  console.log("get successroot");
  res.redirect('/');
});

router.get("/failroot", function(req, res) {
  console.log("get failroot");
  res.redirect('/login');
});

router.get("/successsignup", function(req, res) {
  console.log("get successsignup");
  res.redirect('/');
});

router.get("/failsignup", function(req, res) {
  console.log("get failsignup");
  res.redirect('/login');
});

router.get("/successlogin", function(req, res) {
  if (req.user.banned == true) {
    res.redirect('/faillogin');
  } else {
    console.log("get successsignup");
    res.redirect('/');
  }
});
router.get("/faillogin", function(req, res) {
  console.log("get failsignup");
  res.render('login');

});

router.get("/admin", function(req, res) {
  if (req.user.admin == true)
    res.render('admin');
  else
    res.redirect('/');
});

router.get("/", function(req, res, next) {
  console.log("get root");
  res.render('homepage');
})
//  // User.find()
//  // .sort({ createdAt: "descending" })
//  // .exec(function(err, users) {
//  //   if (err) { return next(err); }
//  //   res.render("index", { users: users });
//  // });
// });
User.findOne({
  username: "admin"
}, function(err, user) {

  if (err) {
    return next(err);
  }
  if (user) {
    return;
  }
  console.log("post signup1");

  var newUser = new User({
    username: "admin",
    password: "shroud",
    admin: true,
    ip: "nope",
    banned: false,
    ipbanned: false
  });

  newUser.save();
});


router.get("/friends", function(req, res) {
  console.log("get friends");
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  } else {
    res.render('friends')
  }


});
router.get("/cart", function(req, res) {
  console.log("get cart");
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  } else {
    res.render('cart')
  }


});

router.get("/signup", function(req, res) {
  console.log("get signup");
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('signup')
  }


});

router.get("/login", function(req, res) {
  console.log("get login");

  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('login')
  }

});
router.get("/discussions", function(req, res) {
  if (req.isAuthenticated()) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip.slice(6));

    res.render('discussions')
  } else {
    res.redirect('/login')
  }

});


//
router.get("/session", function(req, res) {
  console.log("get session");
  if (req.isAuthenticated()) {
    res.render('homepage');
  } else {
    res.render('login');
  }
});


router.get("/userInfo", function(req, res) {
  if (req.user.banned == true || req.user.ipbanned == true) {
    res.redirect("/logout");
  } else {
    console.log("routes userinfo");
    if (req.isAuthenticated()) {
      console.log("I am authenticated");
      res.json({
        username: req.user.username,
        admin: req.user.admin
      });
    } else {
      res.json(null);
    }

  }
});


router.get("/logout", function(req, res) {
  if (req.isAuthenticated()) {
    req.logout();
    res.redirect("/successroot");
  } else {
    res.redirect("/failroot");
  }
});

router.post("/signup", function(req, res, next) {
  var ip2 = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
  var newip2 = ip2.slice(7, ip2.length);
  var ipbanned = false;
  // User.findOne({ ip: newip2}, function(err, userip) {
  User.find({}, function(error, userip) {
    if (error) {
      console.log("error1");
      return res.json(null);
    }
    for (let i = 0; i < userip.length; i++) {
      console.log(userip[i])

      if (userip[i].ipbanned == true) {
        if (userip[i].ip == newip2) {
          ipbanned = true;
        }
      }


    }

  });
  if (ipbanned == false) {
    console.log("post signupppp");

    var username = req.body.username;
    var password = req.body.password;

    console.log('User Signing up')
    User.findOne({
      username: username
    }, function(err, user) {

      if (err) {
        return next(err);
      }
      if (user) {
        req.flash("error", "User already exists");
        return res.redirect("/failsignup");
      }
      console.log("post signup1");
      var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
      if (ip2.length > 7) {
        var newip = ip.slice(7, ip2.length);
      } else {
        var newip = ip;
      }

      console.log("ip " + ip);
      console.log("newip " + newip);


      var newUser = new User({
        username: username,
        password: password,
        ip: newip,
        banned: false,
        ipbanned: false
      });
      console.log("post signup2");

      newUser.save(next); //this line has to be called.
      console.log("post signup done");

    });
  } else {
    console.log("no!")
    return res.json("you have been banned");
  }

}, passport.authenticate("login", {
  successRedirect: "/successsignup",
  failureRedirect: "/failsignup",
  failureFlash: true
}));


router.post("/login", function(req, res, next) {
  var ip2 = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
  if (ip2.length > 7) {
    var newip2 = ip2.slice(7, ip2.length);
  } else {
    var newip2 = ip2;
  }

  var banned = false;
  // User.findOne({ ip: newip2}, function(err, userip) {
  User.find({}, function(error, userip) {
    if (error) {
      console.log("error1");
      return res.json(null);
    }
    for (let i = 0; i < userip.length; i++) {
      console.log(userip[i])

      if (userip[i].ipbanned == true || userip[i].banned == true) {
        if (userip[i].username == req.body.username) {
          console.log("this user is banned");
          banned = true;
        }
      }


    }

    if (banned == false) {
      next();
    } else {
      console.log("no!")
      return res.json("you have been banned")
    }
  });


}, passport.authenticate("login", {
  successRedirect: "/successlogin",
  failureRedirect: "/faillogin",
  failureFlash: true
}));

router.get("/getUsernames", function(req, res) {
  User.find({}, function(error, user) {
    if (error) {
      return res.json(null);
    } else {
      let objs = [];
      for (let i = 0; i < user.length; i++) {
        objs.push({
          username: user[i].username
        });
      }
      return res.json(objs);
    }
  });

});
///////////////////////////////////
router.get("/cart", function(req, res) {
  console.log("get cart");
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  } else {
    res.render('cart')
  }
});
router.post('/cart', function(req, res) {

  User.findOne({
    username: req.user.username
  }, function(err, user) {
    for (var i = 0; i < user.cart.length; i++) {
      if (user.cart[i] == req.body.title) {
        return res.json("already")
      }
    }

    //var obj = {name:req.body.itemName, index: req.body.index, price: req.body.price,username:req.session_state.username};
    User.findOneAndUpdate({
      username: req.user.username
    }, {
      $push: {
        cart: req.body.title
      }
    }, function(error, user) {
      if (error) {
        return res.json(null)
      }

      User.findOneAndUpdate({
        username: req.user.username
      }, {
        $push: {
          price: req.body.price
        }
      }, function(error, user) {
        if (error) {
          return res.json(null)
        }
        var temp = [{
          title: req.body.title,
          price: req.body.price
        }];

        return res.json(temp);

      });
    });
    //return res.json(db3.addObject(obj));


  });
});


router.get('/cart2', function(req, res) {
  User.findOne({
    username: req.user.username
  }, function(err, user) {
    if (err) {
      console.log(err)
    }
    var temp = [];
    for (var i = 0; i < user.cart.length; i++) {
      temp.push({
        title: user.cart[i],
        price: user.price[i]
      })
    }
    return res.json(temp)
  });


});
router.delete('/cart', function(req, res) {


  res.json(db3.deleteObjectWithID(req.body.index));
});
/////////////////////////////////////////////
router.delete('/deleteLogin/:username', function(req, res) {

  User.remove({
    username: req.params.username
  }, function(error, removed) {
    if (error) {
      return res.json(null);
    }
    return res.json(req.params.username);
  });

  //  res.json(db.deleteObjectWithID(req.params.ident));
});

router.put("/ban/:username", function(req, res) {
  console.log("getting BANNED");
  if (req.user.admin == true) {
    User.findOneAndUpdate({
      username: req.params.username
    }, {
      banned: true
    }, function(error, user) {
      if (error) {
        return res.json(null);
      } else if (user == null) {
        return res.json(null);
      }
      return res.json({
        username: req.params.username
      });
    });


  } else {

  }


});

router.put("/ipBan/:username", function(req, res) {
  if (req.user.admin == true) {
    User.findOneAndUpdate({
      username: req.params.username
    }, {
      ipbanned: true
    }, function(error, user) {
      if (error) {
        return res.json(null);
      } else if (user == null) {
        return res.json(null);
      }
      return res.json({
        username: req.params.username
      });
    });
  }
});


////////////////////////////////////////////
router.get("/getRequest/:username", function(req, res) {
  User.findOne({
    username: req.params.username
  }, function(error, user) {
    if (error) {
      return res.json(null);
    } else {
      //  else if(){
      //     for (let i=0;i<user.request.length;i++) {
      //
      //         if(req.params.username == user.request[i] || req.params.username == "admin" ||
      //         req.params.username == req.user.username )
      //           {
      //             return res.json(null);
      //           }
      //
      //     }
      // //  }
      // for (let j=0;j<user.friends.length;j++) {
      //   if(req.params.username == user.friends[j])
      //     {
      //       return res.json(null);
      //     }
      // }

      let objs = [];
      for (let i = 0; i < user.request.length; i++) {
        // console.log(user.request[i]);
        // console.log(user[i].request);

        objs.push({
          username: user.request[i]
        });
      }
      return res.json(objs);
    }
  });
});
router.get("/getFriend/:username", function(req, res) {
  User.findOne({username: req.user.username

  }, function(error, user) {
    if (error) {
      return res.json(null);
    } else {


      let objs = [];
      for (let i = 0; i < user.friends.length; i++) {
        // console.log(user.request[i]);
        // console.log(user[i].request);

        objs.push({
          username: user.friends[i]
        });
      }
      console.log(objs);
      return res.json(objs);
    }
  });
});
router.delete('/remove/:username', function(req, res) {
  User.findOneAndUpdate({
    username: req.user.username
  }, {
    $pull: {
      request: {
        $in: [req.params.username]
      }
    }
  }, function(error, removed) {
    if (error) {
      console.log("error");
    }
    return res.json(req.params.username);
  });

});
router.put('/accept/:username', function(req, res) {

  User.findOneAndUpdate({
    username: req.user.username
  }, {
    $push: {
      friends: req.params.username
    }
  }, function(error, user) {
    if (error) {
      console.log("normal error");
      return res.json(null);

    } else if (user == null) {
      console.log("info null error");
      return res.json(null);

    }
    User.findOneAndUpdate({
      username: req.params.username
    }, {
      $push: {
        friends: req.user.username
      }
    }, function(error, user) {

      if (error) {
        console.log("normal error");
        return res.json(null);

      } else if (user == null) {
        console.log("info null error");
        return res.json(null);

      }

      return res.json(req.params.username);
    });
  });


});

router.put('/requestFriend/:username', function(req, res) {
  console.log(req.params.username);
  User.findOne({
    username: req.params.username
  }, function(err, before) {
    if (err) {
      console.log("normal error");
      return res.json(null);
    } else if (!before) {
      return res.json(null);
    } else if (req.params.username == "admin") {
      return res.json(null);
    } else if (req.params.username == req.user.username) {
      return res.json("yourself");
    } else {
      console.log(before);
      for (let i = 0; i < before.request.length; i++) {
        console.log(before.request[i] + "looped");
        if (req.user.username == before.request[i]) {
          console.log(before.request[i]);
          console.log("nulling at request");
          return res.json("sent already");
        }

      }
    }

    User.findOne({
      username: req.user.username
    }, function(err, before) {
      if (err) {
        return res.json(null);
      }
      for (let j = 0; j < before.friends.length; j++) {
        console.log(before.friends[j]);
        if (req.params.username == before.friends[j]) {
          console.log("nulling at friend");
          return res.json("friends");
        }
      }


      User.findOneAndUpdate({
        username: req.params.username
      }, {
        $push: {
          request: req.user.username
        }
      }, function(error, user) {
        if (error) {
          console.log("normal error");
          return res.json(null);

        } else if (user == null) {
          console.log("info null error");
          return res.json(null);

        }
        return res.json(req.params.username);
      });
    });
  });
  //  res.json(db.deleteObjectWithID(req.params.ident));
});
////////////////////////////////////////////

app.set("view engine", "ejs");


router.get("/games", function(req, res) {
  res.render('addObject');
});

router.get("/newGame", function(req, res) {
  db.getAllObjects(res);
});

obj = [{
  game: "CSGO",
  price: 15,
  picture: "/public/images/CSGO.jpg",
  description: "Cool FPS Game",
  itemNumber: 1
}, {
  game: "ORCS MUST DIE 2",
  price: 15,
  picture: "/public/images/ORCS.jpg",
  description: "Cool ORCS Game",
  itemNumber: 2
}, {
  game: "PUBG",
  price: 30,
  picture: "/public/images/PUBG.jpg",
  description: "Cool BattleRoyale Game",
  itemNumber: 3
}, {
  game: "Rocket League",
  price: 20,
  picture: "/public/images/rocketleague.jpg",
  description: "Cool Car Game",
  itemNumber: 4
}, {
  game: "StarDew Valley",
  price: 15,
  picture: "/public/images/stardewvalley.jpg",
  description: "Cool Farm Game",
  itemNumber: 5
}, {
  game: "The Forest",
  price: 25,
  picture: "/public/images/theforest.jpg",
  description: "Cool Forest Game",
  itemNumber: 6
}]
for (let i = 0; i < obj.length; i++) {
  Game.findOne({
    game: obj[i].name
  }, function(err, game) {
    if (err) {
      return next(err);
    }
    if (game) {
      return;
    }
    console.log("post signup1");

    var newGame = new Game({
      game: obj[i].game,
      price: obj[i].price,
      picture: obj[i].picture,
      description: obj[i].description,
      itemNumber: obj[i].itemNumber
    });

    newGame.save();

  });
}

router.post('/fileupload', function(req, res) {

  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var oldpath = files.filetoupload.path;
    var newDir = __dirname;
    var newDir1 = newDir.search("routes");
    var newDir2 = __dirname.slice(0, newDir1 - 1);
    var newpath = newDir2 + '/public/images/' + files.filetoupload.name;
    var picturei = '/public/images/' + files.filetoupload.name;

    console.log('in post ' + fields.name + ' ' + fields.price + ' ' + fields.description + ' ' + picturei + itemNumber);

    if(fields.description.includes('<script') || fields.name.includes('<script')){
      return
    }

    db.addObject({
      game: fields.name,
      price: fields.price,
      picture: picturei,
      description: fields.description,
      itemNumber: itemNumber
    }, res);
    itemNumber++;
    fs.rename(oldpath, newpath, function() {
      if (err) throw err;
      res.redirect("/");
    });
  });
});

module.exports = router;
