var appended
var value
var period;
function readData(){
  $.ajax({
    url: "/readData",
    type: "GET",
    data:{teacher: value, period:period},
    success: function(data){

      id = data.length;
      for(var i=0; i<data.length;i++)
      {
        console.log("Looping");
        appended=false;
        if(data == null){
          console.log("eror");
        }
        else {
          if(data[i].teacher == "fin"){
              var table = $("#Findell");
            table.find('tr').each(function (a) {
                var $tds = $(this).find('td'),
                period = $tds.eq(1).text(),
                    rollcall = $tds.eq(2).text();

                    if(data[i].roll == rollcall && data[i].period == period){
                      console.log("ture");
                      appended = true;
                    }
                // do something with productId, product, Quantity

            });
                if(!appended){
                console.log("appending");
                $("#Findell tbody").append("<tr>" + "<td>" + "Findell" + "</td>" + "<td>" + data[i].period + "</td>" + "<td>" + data[i].roll + "</td>"+ "<td>" + data[i].laps + "</td>"+ "<td>" + data[i].totalTime + "</td>"+"</tr>");
              }
          }

          else if(data[i].teacher == "mur"){
            var table = $("#Murdoch");
          table.find('tr').each(function (a) {
              var $tds = $(this).find('td'),
              period = $tds.eq(1).text(),
                rollcall = $tds.eq(2).text();

                  if(data[i].roll == rollcall
                     && data[i].period == period
                  ){
                    console.log("ture");
                    appended = true;
                  }
              // do something with productId, product, Quantity

          });
            if(!appended)
            $("#Murdoch tbody").append("<tr>" + "<td>" + "Murdoch" + "</td>" + "<td>" + data[i].period + "</td>" + "<td>" + data[i].roll + "</td>"+ "<td>" + data[i].laps + "</td>"+ "<td>" + data[i].totalTime + "</td>"+"</tr>");

          }
          else if(data[i].teacher == "rap"){
            var table = $("#Raphael");
          table.find('tr').each(function (a) {
              var $tds = $(this).find('td'),
              period = $tds.eq(1).text(),
                  rollcall = $tds.eq(2).text();

                  if(data[i].roll == rollcall && data[i].period == period){
                    console.log("ture");
                    appended = true;
                  }
              // do something with productId, product, Quantity

          });
            if(!appended)
            $("#Raphael tbody").append("<tr>" + "<td>" + "Raphael" + "</td>" + "<td>" + data[i].period + "</td>" + "<td>" + data[i].roll + "</td>"+ "<td>" + data[i].laps + "</td>"+ "<td>" + data[i].totalTime + "</td>"+"</tr>");

          }
          else if(data[i].teacher == "gut"){
            var table = $("#Gutierrez");
          table.find('tr').each(function (a) {
              var $tds = $(this).find('td'),
                period = $tds.eq(1).text(),
                  rollcall = $tds.eq(2).text();

                  if(data[i].roll == rollcall && data[i].period == period){
                    console.log("ture");
                    appended = true;
                  }
              // do something with productId, product, Quantity

          });
            if(!appended)
            $("#Gutierrez tbody").append("<tr>" + "<td>" + "Gutierrez" + "</td>" + "<td>" + data[i].period + "</td>" + "<td>" + data[i].roll + "</td>"+ "<td>" + data[i].laps + "</td>"+ "<td>" + data[i].totalTime + "</td>"+"</tr>");

          }

        }
      }


    },
    dataType: "json"
  });
}
function WhichTable() {



  if(value == "fin"){
    console.log("findell");
    $("#Findell tbody").empty();
readData()
    $('#Findell').show();
    $('#Murdoch').hide();
    $('#Raphael').hide();
    $('#Gutierrez').hide();
  }
  else if(value == "mur"){
      $("#Murdoch tbody").empty();
    readData()
    $('#Murdoch').show();
    $('#Raphael').hide();
    $('#Gutierrez').hide();
    $('#Findell').hide();
  }
  else if(value == "rap"){
      $("#Raphael tbody").empty();
    readData()
    $('#Raphael').show();
    $('#Murdoch').hide();
      $('#Gutierrez').hide();
      $('#Findell').hide();
  }
  else if(value == "gut"){
      $("#Gutierrez tbody").empty();
    readData()
    $('#Gutierrez').show();
    $('#Findell').hide();
    $('#Murdoch').hide();
    $('#Raphael').hide();
  }

}

$(document).ready(function()
{
  period = ($('input[name=period]:checked').val());
  $('#selectPeriod input').on('change', function() {
   period = ($('input[name=period]:checked').val());
});
  $(".button").click(function() {
       value = $(this).attr('id'); // $(this) refers to button that was clicked

      WhichTable();
  });
});
