var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var path = require("path");
var session = require("cookie-session");

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
const uri = "mongodb+srv://john:pass@cluster0.rhajkiv.mongodb.net/test?ssl=true&retryWrites=true&w=majority";

mongoose.connect(uri);
//const client = new MongoClient(uri, {
//	serverApi: {
//		version: ServerApiVersion,
//		strict: true,
//		deprecationErrors: true,
//	}
//});
//async function run() {
//	try {
//		// Connect the client to the server	(optional starting in v4.7)
//		await client.connect();
//		// Send a ping to confirm a successful connection
//		await client.db("test").command({ ping: 1 });
//		console.log("Pinged your deployment. You successfully connected to MongoDB!");
//	} finally {
//		// Ensures that the client will close when you finish/error
//		await client.close();
//	}
//}
//run().catch(console.dir);

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