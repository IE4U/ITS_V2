var messageBox = {

  Show: function(message, type){
    $$( "#Message" ).removeClass($( "#Message" ).attr( "class" )).addClass("alert").addClass(type);
    $$( "#Message" ).show();
    $$( "#messageDESC" ).text(message);
    $$("#closeMessage").click(
      function() {
        $$( "#Message" ).hide();
      }
    )
  },

}
