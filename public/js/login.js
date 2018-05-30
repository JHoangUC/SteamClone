$('body').keydown( function( event ) {
    if ( event.which === 13 ) {
      $('form').submit()
    }
});