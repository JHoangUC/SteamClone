  function deleteClicked(){
        if ($("#username").val() == "") {
          $("#responseMessage").html("A username must be entered")
        }
        else {
          if($("#username").val() != "admin"){
          $.ajax({
            url: "/deleteLogin/" + $("#username").val(),
            type: "DELETE",
            success: function(data){
              if (!data){
                  $("#responseMessage").append("error");
                  console.log("666");
                }
              else {
                  $("#responseMessage").append(data.username + "has been deleted from the database");
                  location.reload();
                  console.log("hello2222");
                }


            },
            dataType: "json"
          });
        }else{
          $("#responseMessage").append("you cannot delete admin from the database");
        }
}
        return false;
      }

    function banClicked(){
        if ($("#banuser").val() == "") {
          $("#responseMessage").html("A username must be entered")
        }
        else {
          if($("#banuser").val() != "admin"){
          $.ajax({
            url: "/ban/" + $("#banuser").val(),
            type: "PUT",
            success: function(data){
              if (!data){
                  $("#responseMessage").append("error");
                  console.log("666");
                }
              else {
                  $("#responseMessage").append(data.username + "has been banned from the database");
                  location.reload();
                  console.log("hello2222");
                }


            },
            dataType: "json"
          });
        }else{
          $("#responseMessage").append("you cannot ban admin from the database");
        }
}
        return false;
      }
      function banipClicked(){
        if ($("#banuserip").val() == "") {
          $("#responseMessage").html("A username must be entered")
        }
        else {
          if($("#banuserip").val() != "admin"){
          $.ajax({
            url: "/ipBan/" + $("#banuserip").val(),
            type: "PUT",
            success: function(data){
              if (!data){
                  $("#responseMessage").append("error");
                  console.log("666");
                }
              else {
                  $("#responseMessage").append(data.username + "has been ip banned from the database");
                  location.reload();
                  console.log("hello2222");
                }


            },
            dataType: "json"
          });
        } else{
          $("#responseMessage").append("you cannot ban admin's ip from the database");
        }
}
        return false;
      }    

      if(window.location.href.match('/admin') != null){
        console.log("hello");
        $.ajax({
            url: "/getUsernames",
            type: "GET",
            success: function(data){
              if (!data){
                  $("#errorMessage").html("error");
                }
              else {
                for(i=0;i<data.length;i++){
                  if(data[i].username != "admin")
                  $("#usernameList").append(data[i].username + "</br>");
                }
                  
                }


            },
            dataType: "json"
          });
      }

        $("#username").keydown( function( event ) {
            if ( event.which === 13 ) {
              console.log("hello");
              deleteClicked();
              event.preventDefault();
              return false;
            }
        });

        $("#banuser").keydown( function( event ) {
            if ( event.which === 13 ) {
              console.log("hello");
              banClicked();
              event.preventDefault();
              return false;
            }
        });

        $("#banuserip").keydown( function( event ) {
            if ( event.which === 13 ) {
              console.log("hello");
              banipClicked();
              event.preventDefault();
              return false;
            }
        });

        $("#deleteButton").click(deleteClicked);
        $("#banButton").click(banClicked);
        $("#banipButton").click(banipClicked);