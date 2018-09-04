
var login = {};

login.signIn = function(){
  db.logIn($$( "#LoginEmail" ).val(), $$( "#LoginPassword" ).val(), function (err, response) {
    if (err) {
      if (err.name === 'unauthorized' || err.name === 'forbidden') {

        var notificationUnauthorized = app.notification.create({
          icon: '<i class="f7-icons">flag_fill</i>',
          title: 'An Error Occured',
          text: err.message,
          closeButton: true,
        });

        notificationUnauthorized.open();

      } else {

        var notificationLoginError = app.notification.create({
          icon: '<i class="f7-icons">flag_fill</i>',
          title: 'An Error Occured',
          text: err.message,
          closeButton: true,
        });

        notificationLoginError.open();

      }
    }
    if(response){
      //messageBox.Show("Success", "alert-success");

      //sessionStorage.setItem('password', $$( "#LoginPassword" ).val());

      $$('create_user').text($$( "#LoginEmail" ).val());

      app.router.navigate('/');
    }
  });
}

login.signInAfter = function(email, password){
  db.logIn(email, password, function (err, response) {
    if (err) {
      if (err.name === 'unauthorized' || err.name === 'forbidden') {

        var notificationUnauthorized = app.notification.create({
          icon: '<i class="f7-icons">flag_fill</i>',
          title: 'An Error Occured',
          text: err.message,
          closeButton: true,
        });

        notificationUnauthorized.open();

      } else {

        var notificationLoginError = app.notification.create({
          icon: '<i class="f7-icons">flag_fill</i>',
          title: 'An Error Occured',
          text: err.message,
          closeButton: true,
        });

        notificationLoginError.open();

      }
    }
    if(response){
      //messageBox.Show("Success", "alert-success");

      //sessionStorage.setItem('password', $$( "#LoginPassword" ).val());

      $$('create_user').text($$( "#LoginEmail" ).val());

      app.router.navigate('/');
    }
  });
}


login.signUp = function() {

  db.signUp($$( "#CreateEmail" ).val(), $$( "#CreatePassword" ).val(),{
    metadata : {
      groups : 'test',
    }
  } ,function (err, response) {
    if (err) {
      if (err.name === 'conflict') {
        // "batman" already exists, choose another username
        var notificationConflict = app.notification.create({
          icon: '<i class="f7-icons">flag_fill</i>',
          title: 'An Error Occured',
          text: err.message,
          closeButton: true,
        });

        notificationConflict.open();

      } else if (err.name === 'forbidden') {

        // invalid username
        var notificationUsernameInvalid = app.notification.create({
          icon: '<i class="f7-icons">flag_fill</i>',
          title: 'An Error Occured',
          text: err.message,
          closeButton: true,
        });

        notificationUsernameInvalid.open();

      } else {

        // HTTP error, cosmic rays, etc.
        var notificationError = app.notification.create({
          icon: '<i class="f7-icons">flag_fill</i>',
          title: 'An Error Occured',
          text: err.message,
          closeButton: true,
        });

        notificationError.open();

      }
    }
    if (response){

      var notificationSuccess = app.notification.create({
        icon: '<i class="f7-icons">bolt</i>',
        title: 'Success, you signed up!',
        text: 'Thanks for Joining! Now Login!',
        closeButton: true,
      });

      notificationSuccess.open();

    }
  });

}


//Login in form
$$( "#SignIn" ).click(function( event ) {
  login.signIn();
});



$$( "#CreateSubmit" ).on('click', function(e) {
  login.signUp();
});

// $$(document).keypress(function(e) {
//     if(e.which == 13) {
//         $$()
//     }
// });
