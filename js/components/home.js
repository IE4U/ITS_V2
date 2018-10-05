var home = {
  initialized: function(){
    home.add_button();
  },

  add_button: function(){
    var selector = "#add_button";
    $$(selector).on('click', function (e) {
      app.dialog.prompt('What is your Operation\'s name?', function (name) {
        homeFunctions.addOperation(name);
      });
    });


  },
}

var homeFunctions = {
  addOperation: function(name) {

    if(name.trim() == ""){
      name = "Operation";
    }

    db.getSession(function (err, response) {
      if (err) {
        // network error

        var sessionError = app.notification.create({
          icon: '<i class="f7-icons">flag_fill</i>',
          title: 'An Error Occured',
          text: err.message,
          closeButton: true,
        });

        sessionError.open();

      } else if (!response.userCtx.name) {
        // nobody's logged in

        var sessionEndError = app.notification.create({
          icon: '<i class="f7-icons">bolt</i>',
          title: 'Session Ended',
          text: 'Please login in again to create a new session',
          closeButton: true,
        });

        notificationSuccess.open();

      } else {
        dbUser.post({
          "name": name,
        }).then(function (response) {
          templating.operationsList();
        }).catch(function (err) {
          console.log(err);
        });
      }
    });
  },
}
