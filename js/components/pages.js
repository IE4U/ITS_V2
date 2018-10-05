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

        sessionEndError.open();

      } else {
        // response.userCtx.name is the current user
        pages.dbSetup(response.userCtx.name);
        //if logged In

        //initial the home page ***********

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

            dbUser.destroy(function (err, response) {
              if (err) {
                return console.log(err);
              } else {
                dbUser = new PouchDB('localDB');
              }
            });
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

    dbOnline = new PouchDB('https://' + httpDatabase + '/userdb-' +  toHex(username),
    {
      fetch(url, opts){
        opts.credentials='include';
        return PouchDB.fetch(url, opts);
      },
    }
  );

  console.log(dbOnline);
  dbUser.replicate.from(dbOnline).on('complete', function(info) {
    // then two-way, continuous, retriable sync

    console.log("done");
    templating.operationsList();
    dbUser.sync(dbOnline, {live: true});

  }).on('error', function(){
    templating.operationsList();
  });


  // skip_setup: true}


},

operations: function(){
  //Loads in operstions Javascript file
  templating.stepsList();


},


}
