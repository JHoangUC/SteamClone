var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var path = require("path");
var session = require("cookie-session");
var fs = require("fs");
var setUpPassport = require("./setuppassport");

var routes = require("./routes/routes")
var itemRoutes = require("./routes/itemRoutes")
var app = express();
var User = require("./models/user");
setUpPassport();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);
app.use('/', express.static('./'));
app.use('/routes', express.static('./'));
app.use('/js', express.static('./public/js'));
app.use('/views', express.static('./views'));
app.use('/stylesheets', express.static('./public/stylesheets'));
app.use('/images', express.static('./public/images'));
app.use('/models', express.static('./models'));
//const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://john:pass@cluster0.rhajkiv.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri);


app.use(routes);

app.set("view engine", "ejs");



var port = process.env.PORT || 3000;
var server = app.listen(port,function(){
  console.log('Starting server on port ' + port)
});

var io = require('socket.io').listen(server)

io.on('connection', function(socket){
	socket.on('chat message', function(msg,username){
		if(msg.includes('<script>') || msg.includes('fuck')){
		    User.findOneAndUpdate({username:username},{banned:true},function(error,user) {
		        if (error) {
		            console.log("error");
		        }
		        else if (user == null) {
		            console.log("user == null");
		        }
		       	console.log("success");
		    });
		} else {
			io.emit('chat message', msg,username)
		}
	})
})