
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
        $(reader).load(function(e) { $('#img').attr('src', e.target.result); });
        reader.readAsDataURL(this.files[0]);
    }
}
$("#fileStuff").change(readURL);