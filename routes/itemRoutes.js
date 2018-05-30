var express = require('express');
var passport = require("passport");
var path = require("path");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var path = require("path");
var session = require("express-session");
var bodyParser = require('body-parser')
var cookieParser = require("cookie-parser");
var formidable = require('formidable');
var fs = require('fs');
var itemNumber = 10;
var data = require('../mongo')

var app = express();
var router = express.Router();
router.use(flash());
var User = require("../models/games");

let db = new data();

console.log("hek shroud");

router.get("/games", function(req, res) {
    res.render('addObject');
  });
    
router.post('/upload', function(req, res){
console.log("upload");
    res.json({});
});
router.get('/getItems',function(req,res){
    res.json(db.getAllObjects());
});

router.post('/fileupload', function(req, res){

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload.path;
    var newpath = __dirname + '/public/images/' + files.filetoupload.name;
    var picturei =  '/public/images/' + files.filetoupload.name;

    // console.log('in post ' + fields.name + ' ' + fields.price + ' ' + fields.description + ' ' + picturei);

     db.addObject({name:fields.name,price:fields.price,picture:picturei,description:fields.description,number:itemNumber});
     itemNumber++;
    fs.rename(oldpath, newpath, function (err) {
    if (err) throw err;
        res.redirect("/");
      });
    });
});

// obj = [{description: "asdfpijapfoijpsadofji", itemname}]
// for()
// User.findOne({ username: obj[i].itemname }, function(err, user) {

//     if (err) { return next(err); }
//     if (user) {
//       return;
//     }
// console.log("post signup1");
    
//     var newUser = new User({
//       username: obj[i].itemname,
//       password: "shroud",
//       admin: true
//     });

//     newUser.save();  


//   });
module.exports = router;

