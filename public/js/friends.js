function AddClicked(){
	if ($("#username").val() == "") {
		alert("A username must be entered")
	}
	else {
		$.ajax({
			url: "/requestFriend/" + $("#friend").val(),
			type: "PUT",
			success: function (data) {
					if (data == "sent already"){
						alert($("#friend").val() + " has already been sent  friend request");
						
					}
					else if(data == "yourself")
					{
						alert("You should already be friends with yourself")
					}
					else if(data == "friends")
					{
						alert("You are already friends")
					}
					else if(!data){
						alert($("#friend").val() + " does not exist")
					}
					else {
						alert(data + " has been sent a friend request");
						location.reload();
						
					}


			},
			dataType: "json"
		});
	}

	return false;

}
function remove(friend){
	console.log(friend);
	$.ajax({
		 url: "/remove/" + friend,
		 type: "DELETE",
		 success: function(data){
			 console.log("removed");


		 },
		 dataType: "json"
	 });
}
function accept(data){
console.log($(data).attr("friend"));
var friend = $(data).attr("friend");
$.ajax({
	 url: "/accept/" + $(data).attr("friend"),
	 type: "PUT",
	 success: function(data){
		 if (!data){
				 $("#errorMessage").html("error");
			 }
			 else{

			 remove(friend);
			 location.reload();

}
	 },
	 dataType: "json"
 });
}



$(document).ready(function(){
	$.get("/userInfo",function(user){
	 if (user){
  $.ajax({
      url: "/getUsernames",
      type: "GET",
      success: function(data){
        if (!data){
            $("#errorMessage").html("error");
          }
        else {
          for(i=0;i<data.length;i++){
						if(data[i].username != "admin" && data[i].username != user.username){
            $("#usernameList").append(data[i].username + "</br>");
					}
          }

          }


      },
      dataType: "json"
    });
	}
		});

		$.get("/userInfo",function(data){
		 if (data){
			 $.ajax({
	 	      url: "/getRequest/" + data.username,
	 	      type: "GET",
	 	      success: function(data){
	 	        if (!data){
	 	            $("#errorMessage").html("error");
	 	          }
	 	        else {
	 	          for(i=0;i<data.length;i++){
	 	            $("#RequestList").append(data[i].username + " " +
								'<input id = "accept" type="button" value="Accept" friend ="'+data[i].username+'">'
							+	'<input id = "decline" type="button" value="decline" friend ="'+data[i].username+'">'
								+"</br>");
	 	          }
					  
	 	          }


	 	      },
	 	      dataType: "json"
	 	    });
			}
		})
		///////////////////////////
		$.get("/userInfo",function(data){
		 if (data){
			 $.ajax({
					url: "/getFriend/" + data.username,
					type: "GET",
					success: function(data){
						if (!data){
								$("#errorMessage").html("error");
							}
						else {
							for(i=0;i<data.length;i++){
								$("#friendList").append(data[i].username
								+"</br>");
							}

							}


					},
					dataType: "json"
				});
			}
		})

 	$("#Add").click(AddClicked);
// 	$("#accept").on("click",function() {
// 		console.log("test");
// 		console.log(this)
// 		accept(this);
//
// });
$(document).on("click","#accept",function() {
	console.log("test");
	console.log(this)
	accept(this);
	 });
	 $(document).on("click","#decline",function() {
	 	console.log("test");
	 	console.log(this)
	 	remove($(this).attr("friend"));
	 	 });
// $(".decline").on("click",function() {
// 	console.log("test");
// 	console.log(this)
// 	decline(this);
//
// });
});
