var pages = {

  indexFunction: function(){
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
        // response.userCtx.name is the current user
        pages.dbSetup(response.userCtx.name);
        //if logged In

        //initial the home page ***********
        templating.operationsList();

        $$('#create_user').attr('href', '');
        $$('#login_logout').attr('href', '');
        $$('#create_user').text(response.userCtx.name);
        $$('#login_logout').text('Logout');
        $$('#scheduleList').show();

        $$('#login_logout').click(function(){
          db.logOut(function (err, response) {
            if (err) {
              // network error
            }
            $$('#create_user').attr('href', '/create-account/');
            $$('#login_logout').attr('href', '/login/');
            $$('#create_user').text('Create Account');
            $$('#login_logout').text('Login');
            $$('#scheduleList').hide();
          });
        });
      }
    });
  },

  login: function(){
    console.log('Page initialized');
    app.popover.close();
    $.getScript( "js/components/login.js" )
    .done(function( script, textStatus ) {
      console.log( textStatus );
    })
    .fail(function( jqxhr, settings, exception ) {
      $( "div.log" ).text( "Triggered ajaxError handler." );
    });

  },

  create_account: function(){
    console.log('Page initialized');
    app.popover.close();
    $.getScript( "js/components/login.js" )
    .done(function( script, textStatus ) {
      console.log( textStatus );
    })
    .fail(function( jqxhr, settings, exception ) {
      $( "div.log" ).text( "Triggered ajaxError handler." );
    });
  },

  dbSetup: function(username){

    dbUser = new PouchDB('http://' + httpDatabase + '/userdb-' +  toHex(username),
    {
      fetch(url, opts){
        opts.credentials='include'
        return PouchDB.fetch(url, opts)
      },
    }
    // skip_setup: true}
  );
},

operations: function(){

  $$("#deleteOperation").on("click", function(){
    app.dialog.confirm('Are you sure you want to delete this operation?', function () {
      var page = $$('.page[data-name="operation"]')[0].f7Page;

      dbUser.get(page.router.currentRoute.params.id).then(function(doc) {
        dbUser.remove(doc).then(function(result){
          app.dialog.alert('This operation has been deleted.', function(){

            app.popover.close();
            app.router.navigate('/');

          });

        }).catch(function(err){

          console.log(err);

        });
      }).then(function (result) {
        // handle result
      }).catch(function (err) {
        console.log(err);
      });

    });
  });

},


}
