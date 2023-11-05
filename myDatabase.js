let myDatabase = function() {
	this.infoList = [];
	this.coolDown = 0;
}

myDatabase.prototype.getArraySize = function() {
	return this.infoList.length;
}

//add or modify.  Complete getAllObjects function.
myDatabase.prototype.getAllObjects = function() {
	return(this.infoList);
	}
	myDatabase.prototype.getAllObjectsName = function(index) {
			for (let i=0;i<this.infoList.length;i++) {
				if(this.infoList[i].index == index){
						console.log(JSON.stringify(this.infoList[i]) + " getAllObjectsName");
						return(this.infoList[i]);
				}
			}
		return;
		}

myDatabase.prototype.getAllNames = function() {
	let names = [];
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i]) {
			names.push(this.infoList[i].name);
		}
	}
	return(names);
}

myDatabase.prototype.getObjectAtIndex = function(index) {
	if (index < 0)
		return (null);
	else {
		if (!this.infoList[index]) {
			return(null);
		} else {
			return(this.infoList[index]);
		}
	}
}

myDatabase.prototype.getObjectWithID = function(ident) {
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && ident == this.infoList[i].teacher)
		{
			console.log("inside database");
			return (this.infoList[i]);
		}
	}
	return (null);
}
myDatabase.prototype.getAllObjectWithID = function(ident,period) {
	console.log(this.infoList);
	console.log(this.infoList.length);
	console.log("database " + ident);
	console.log("period " +  period);
	let data = [];
	for (let i=0;i<this.infoList.length;i++) {

		if (this.infoList[i] && ident == this.infoList[i].teacher&& period == this.infoList[i].period) {
			console.log("pushed " + this.infoList[i].teacher);
			data.push(this.infoList[i]);
		}
	}
	return(data);
}

myDatabase.prototype.addObjectAtIndex = function(obj,index) {
	if (index < 0)
		return (null);
	if (index < this.infoList.length)
	{
		if (!this.infoList[index]) {
			this.infoList[index] = obj;
			return (obj);
		}
		else {
			return (null);
		}
	}
	else
		this.infoList[index] = obj;
	return (obj);
}


myDatabase.prototype.addObject = function(obj) {
	for (let i=0;i<this.infoList.length;i++) {
		if (this.infoList[i] && obj.roll == this.infoList[i].roll && obj.teacher == this.infoList[i].teacher && obj.period == this.infoList[i].period){

			var time1 =  obj.totalTime.substring(0,1);
			var time2 = this.infoList[i].totalTime.substring(0,2);
			time2 = parseInt(time2);
			console.log(time1 + " " + time2);
			console.log(this.coolDown);
			var time3 = (time1 - time2)
			if(time3 < JSON.parse(this.coolDown) )
			{
				return ("stop");
			}
			else {
				this.infoList[i].laps += 1;
				this.infoList[i].totalTime =  obj.totalTime
				return (this.infoList[i]);
			}
		}

	}


	this.infoList.push(obj);
	console.log(this.infoList);
	console.log(this.infoList.length);
	console.log("added");
	return (obj);
}




myDatabase.prototype.changeObjectAtIndex = function(obj,index) {
	if (index < 0 || index >= this.infoList.length)
	if (!this.infoList[index])
		return (null);
	this.infoList[index] = obj;
	return (obj);
}

//add or modify.  Complete changeObject function.
myDatabase.prototype.changeObject = function(obj) {
	for(var i=0;i<this.infoList.length;i++){
		if(obj.username == this.infoList[i].username){
			console.log(JSON.stringify(this.infoList[i]) + " before");
			temp = {name: obj.name, index: obj.index, price: obj.price, uname: obj.username}
			this.infoList.splice(i,0,temp);
			console.log(JSON.stringify(this.infoList[i]) + " change object");
			return(obj);
		}
	}
	return (null);
}

myDatabase.prototype.deleteObjectAtIndex = function(index) {
	if (index < 0 || index >= this.infoList.length) {
		return(null);
	} else {
		if (!this.infoList[index]) {
			return(null);
		} else {
			let obj = this.infoList[index];
			this.infoList[index] = undefined;
			return(obj);
		}
	}
}
myDatabase.prototype.setCoolDown = function(index) {
	this.coolDown = index.index;
}


//add or modify.  Complete deleteObjectWithID function.
myDatabase.prototype.deleteObjectWithID = function(ident) {
	for(var i=0;i<this.infoList.length;i++){
	if(this.infoList[i].ident == ident){
		this.infoList[i].ident = undefined;
		this.infoList[i].name = undefined;
		return(ident);
	}
}
	return (null);
}


module.exports = myDatabase;
