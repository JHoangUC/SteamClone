var pass1 = $('#password');
var pass2 = $('#password2');
var text  = $('#text');
var username = $("#username");

pass1.keyup(function(){
	if(pass1.val() == pass2.val()){
		text.css('display', 'none');
	} else {
		text.css('display', 'block');
		text.html('Passwords must match');
	}
})

pass2.keyup(function(){
	if(pass1.val() == pass2.val()){
		text.css('display', 'none');
	} else {
		text.css('display', 'block');
		text.html('Passwords must match');
	}
})

$('form').submit(function(event){
	event.preventDefault()
	if(pass1.val() == pass2.val()){
		this.submit()
	} else {
		text.css('display', 'block');
		text.html('Passwords must match');
	}
})
$('body').keydown( function( event ) {
    if ( event.which === 13 ) {
      $('form').submit()
    }
});

function signupClicked() {
	
	$('form').submit()
}