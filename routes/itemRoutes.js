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
const fs = require('fs');
var itemNumber = 10;
var data = require('../mongo')
var app = express();
var router = express.Router();
router.use(flash());
var User = require("../models/games");
const { log } = require('console');

let db = new data();



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
    console.log("POSTING")
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
    var oldpath = files.filetoupload.path;
   // var newpath = __dirname + '/public/images/' + files.filetoupload.name;
   // var picturei =  '/public/images/' + files.filetoupload.name;
    var newpath = path.join(__dirname + '/public/images/') + files.filetoupload.name;
    let rawData = fs.readFileSync(oldpath)
    // console.log('in post ' + fields.name + ' ' + fields.price + ' ' + fields.description + ' ' + picturei);
      console.log(newpath + " this is new path")
      console.log(oldpath + " this is old path")
      console.log(rawData + " this is rawData")
     db.addObject({name:fields.name,price:fields.price,picture:picturei,description:fields.description,number:itemNumber});
     itemNumber++;
     fs.writeFile(newpath, rawData, function(err){
      if(err) console.log(err)
      return res.send("successfully uploaded")
     })
    // fs.rename(oldpath, newpath, function (err) {
    // if (err) throw err;
    //     res.redirect("/");
    //   });
     });
});


module.exports = router;