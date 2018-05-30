var express = require("express");
var mongoose = require("mongoose");
var Info = require("./models/games");

let myDatabase = function() {
}

//add or modify.  Complete getAllObjects function.
myDatabase.prototype.getAllObjects = function(res) {

Info.find({},function(error,info) {
	if (error) {
    console.log('error in getall')
		return res.json(null);
	} else {
    
		let objs = [];
		for (let i=0;i<info.length;i++) {
		    objs.push({game:info[i].game,price:info[i].price,picture:info[i].picture,
          description:info[i].description,itemNumber:info[i].itemNumber});
		}
    console.log('get all')
		return res.json(objs);
	}
});

}

myDatabase.prototype.getObjectByName = function(_name,res) {
  Info.find({name:_name},function(error,info) {
      if (error) {
          return res.json(null);
      }
      else if (info == null) {
          return res.json(null);
      }

      if (info.length == 1)
      {     	
        return res.json({ game: info[0].game });
      }
      else
      {
          return res.json(null);
      }
   });

}

myDatabase.prototype.addObject = function(obj) {
    console.log('adding object')
    Info.create(obj,function(error,info) {
        if (error) {
            return res.json(null);
        }
        console.log('no error');
	      let obj2 = {game:info.game,price:info.price,picture:info.picture,
          description:info.description, itemNumber: info.itemNumber};
        console.log(obj2);
        return ('monkey');
    });
}


//add or modify.  Complete changeObject function.
myDatabase.prototype.changeObject = function(obj,res) {
Info.findOneAndUpdate({ident:obj.ident},{name:obj.name},function(error,info) {
          if (error) {
              return res.json(null);
          }
          else if (info == null) {
              return res.json(null);
          }
          return res.json(obj);
      });
}


//add or modify.  Complete deleteObjectWithID function.
myDatabase.prototype.deleteObjectByName = function(_name,res) {
    Info.remove({name:_name},function(error,removed) {
        if (error) {
            return res.json(null);
        }
        return res.json(removed.result);
    });
}


module.exports = myDatabase;