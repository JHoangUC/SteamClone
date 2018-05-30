
var mongoose = require("mongoose");

//Schema is a decription (the definition) of the mongoDB document.
var gameSchema = mongoose.Schema({
	game: String,
	price: Number,
	picture: String,
	description: String,
	itemNumber: Number
});

var Game = mongoose.model("Game", gameSchema);



module.exports = Game;