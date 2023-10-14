function successChange(data) {
  if (!data)
    alert("ERROR");
  else {
      alert ('item added');
    }
}
function readURL(e) {
    if (this.files && this.files[0]) {
        console.log('im here');
        var reader = new FileReader();

        $(reader).on('load', function(e) { 
          localStorage.setItem("recent-image", e.target.result);  
          const recentImage = localStorage.getItem("recent-image")

          $('#preview').attr('src', recentImage); 
          $('#img').attr('src', e.target.result); 

          
        });
        reader.readAsDataURL(this.files[0]);
    }
}

$("#fileStuff").change(readURL);