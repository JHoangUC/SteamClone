function cartClicked(itemNum,price){
  console.log("inside cartClicked");
          $.ajax({
            url: "/cart",
            type: "POST",
            data: {title: itemNum, price: price},
            success: function(data){
              console.log(data + " post success");
              if(!data){
                alert ("Please log in");
              }
              else if(data == "already"){
              }

            },
            dataType: "json"
          });


        return false;
}
var id = 0;
function deleteClicked(itemNum){
          $.ajax({
            url: "/cart",
            type: "DELETE",
            data: {index: itemNum},
            success: function(data){
              console.log(JSON.stringify(data));

},
            dataType: "json"
          });


        return false;
}

function htmlClicked(itemNum){

$.ajax({
  url: "/cart2",
  type: "GET",

  success: function(data){

    id = data.length;
    for(var i=0; i<data.length;i++)
    {
      if(data == null){
        window.location = data.redirect;
      }

      else {
        $('#myTable').append('<tr class="tablerows" itemNumber="' + data[i].index+ '"><tbody><td>' + data[i].title + '</td>><td>' + data[i].price + '</td><td>' + '<input type="number" class="quant" itemNumber = "' + data[i].index + '" value="1" min="1" />' + '</td><td>' + '<div class="delete" style="height: 21px; width: 54px; background-color: red;" itemNumber = "' + data[i].index + '"></div>' + '</td></tbody></tr>' );
      }
    }


  },
  dataType: "json"
});


return false;
}



var itemN;
var price;
      //$(".cartButton").click(function(){
        $(document).on("click",".cartButton", function(){
        console.log("cart button was clicked");
   itemN = $(this).attr('itemTitle');
   price = $(this).attr('price');
  cartClicked(itemN,price);

});
//////////If the html = /cart then do the below
if (window.location.href.match('/cart') != null) {

   htmlClicked(itemN);
$(document).on('click', '.delete', function (){

  var itemNum = $(this).attr('itemNumber');
  deleteClicked(itemNum);
});

$("#myTable").on('click', '.delete', function (e){
  e.preventDefault();

  $(this).parents( "tr" ).remove();
});
 }
