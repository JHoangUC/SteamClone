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
              else if (data == "already") {
                  alert("This item is already in the cart")
              }
              
                  alert("Item added!")

            },
            dataType: "json"
          });


        return false;
}

function deleteClicked(name) {
 

    $.ajax({
        url: "/deleteCart/" + name,
        type: "DELETE",
        success: function (data) {
            if (!data) {
                console.log("Error Delete Clicked");
            }

        },
        dataType: "json"
    });
}
var id = 0;
function htmlClicked(){

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
        $('#myTable').append('<tr class="tablerows" itemNumber="' + data[i].index+ '"><tbody><td>' + data[i].title + '</td>><td>' + data[i].price + '</td><td>' + '<input type="number" class="quant" itemNumber = "' + data[i].index + '" value="1" min="1" />' + '</td><td>' + '<button class="delete"  style="height: 21px; width: 54px; background-color: red;" itemTitle = "' + data[i].title + '"></button>' + '</td></tbody></tr>' );
      }
    }


  },
  dataType: "json"
});


return false;
}


var itemN;
var price;

        $(document).on("click",".cartButton", function(){
        console.log("cart button was clicked");
        itemN = $(this).attr('itemtitle');
             price = $(this).attr('price');
            console.log(itemN);
            cartClicked(itemN, price);

         

        });


//////////If the html = /cart then do the below
if (window.location.href.match('/cart') != null) {
    
    htmlClicked();
   
    $(document).on('click', '.delete', function (){
        console.log("Delete button was clicked");
        itemN = $(this).attr('itemtitle');     
        deleteClicked(itemN, price);
    });

    $("#myTable").on('click', '.delete', function (e){
      e.preventDefault();

      $(this).parents( "tr" ).remove();
    });
 }
