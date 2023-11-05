var script_url = "https://script.google.com/a/vistausd.org/macros/s/AKfycbxWGtI2OKYn8kya6N9v30p_z2np8mft79b7HTaZyg/exec";
////////////////////////////////////////////////////////////
var seconds = 1;
var minutes = 0;
var t;
var timer_is_on = 0;
var l = 0;

var time;
function timedCount() {
  $("#timermatch").text(minutes + ":" + l);
  time = minutes + ":" + l


  if(seconds < 10){
     l = "0" + seconds

      seconds = seconds + 1;

  }
  else {

l = seconds
      seconds = seconds + 1;

  }

  if(seconds > 59){
    minutes++;
    seconds = 0
  }
  t = setTimeout(timedCount, 1000);

}
function resetCount(){
  seconds = 1;
  l=0
}
function startCount() {
  if (!timer_is_on) {
    timer_is_on = 1;
    timedCount();
  }
}

function stopCount() {
  clearTimeout(t);
  timer_is_on = 0;
}
////////////////////////////////////////////////////////////////////////////////////////
function insert_value(){

  var id1=	$("#id").val();
  var teacher =	$("#id").val().substring(0,3);
  var rollcall=	$("#id").val().substring(10,12);
	var period= $("#id").val().substring(8,9);
  console.log(id1);
  console.log(rollcall);
  console.log(period);
  console.log(teacher);
  $.ajax({
    url: "/sortData",
    type: "POST",
    data:{id: id1, roll: rollcall, period: period, teacher: teacher, timer:time},
    success: function(data){
        $("#id").val("");
        console.log("sucessful");
        if(data.teacher == "fin"){
        $("#showData tbody ").append("<tr>" + "<td>" + "Findell" + "</td>" + "<td>" + data.period + "</td>" + "<td>" + data.roll + "</td>"+ "<td>" + data.laps + "</td>"+ "<td>" + data.totalTime + "</td>"+"</tr>");
      }
      else if(data.teacher == "mur"){
          $("#showData tbody ").append("<tr>" + "<td>" + "Murdoch" + "</td>" + "<td>" + data.period + "</td>" + "<td>" + data.roll + "</td>"+ "<td>" + data.laps + "</td>"+ "<td>" + data.totalTime + "</td>"+"</tr>");

        }
        else if(data.teacher == "rap"){
            $("#showData tbody ").append("<tr>" + "<td>" + "Raphael" + "</td>" + "<td>" + data.period + "</td>" + "<td>" + data.roll + "</td>"+ "<td>" + data.laps + "</td>"+ "<td>" + data.totalTime + "</td>"+"</tr>");

          }
          else if (data.teacher == "gut"){
              $("#showData tbody ").append("<tr>" + "<td>" + "Gutierrez" + "</td>" + "<td>" + data.period + "</td>" + "<td>" + data.roll + "</td>"+ "<td>" + data.laps + "</td>"+ "<td>" + data.totalTime + "</td>"+"</tr>");

            }
            setTimeout(myFunction, 7000)
            function myFunction() {
              console.log("clearing");
              $("#showData tbody tr:last").remove();
              }
    },
    dataType: "json"
  });
}
////////////////////////////////////////////////////////////////////////////////////////
function recentData(){

  var id1=	$("#id").val();
  var teacher =	$("#id").val().substring(0,3);
  var rollcall=	$("#id").val().substring(10,12);
	var period= $("#id").val().substring(8,9);
  console.log(id1);
  console.log(rollcall);
  console.log(period);
  console.log(teacher);
  $.ajax({
    url: "/recentData",
    type: "GET",
    data:{id: id1, roll: rollcall, period: period, teacher: teacher, timer:time},
    success: function(data){
        $("#id").val("");
        console.log("sucessful");
        if(data.teacher == "fin"){
        $("#showData tr:first").after("<tr>" + "<td>" + "Findell" + "</td>" + "<td>" + data.period + "</td>" + "<td>" + data.roll + "</td>"+ "<td>" + data.laps + "</td>"+ "<td>" + data.totalTime + "</td>"+"</tr>");
      }
      else if(data.teacher == "mur"){
          $("#showData tr:first").after("<tr>" + "<td>" + "Murdoch" + "</td>" + "<td>" + data.period + "</td>" + "<td>" + data.roll + "</td>"+ "<td>" + data.laps + "</td>"+ "<td>" + data.totalTime + "</td>"+"</tr>");

        }
        else if(data.teacher == "rap"){
            $("#showData tr:first").after("<tr>" + "<td>" + "Raphael" + "</td>" + "<td>" + data.period + "</td>" + "<td>" + data.roll + "</td>"+ "<td>" + data.laps + "</td>"+ "<td>" + data.totalTime + "</td>"+"</tr>");

          }
          else if (data.teacher == "gut"){
              $("#showData tr:first").after("<tr>" + "<td>" + "Gutierrez" + "</td>" + "<td>" + data.period + "</td>" + "<td>" + data.roll + "</td>"+ "<td>" + data.laps + "</td>"+ "<td>" + data.totalTime + "</td>"+"</tr>");

            }


    },
    dataType: "json"
  });
}

///////////////////////////////////////////////////////////////////////////////////// Admin Javascript
var key = "a"
var x = document.getElementById("secret");
var cooldownVal =0;



function submitCool() {
    $("#changeLink").prop("href", $("#sheet").val())
  cooldownVal = parseInt($("#cooldown").val())
}

function cool() {
  console.log(cooldownVal);
}

function checkPass() {
  if($("#password").val() === key){
    $("#secret").show();
  }
}
/////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function()
{
  $('#adminID').hide()
  $("#id").keypress(function() {
    if($(this).val().length == 12) {
         insert_value();
         // recentData();
    }
});

})
