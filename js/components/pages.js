var pages = {

  indexFunction: function(){

    if(sessionStorage.getItem('username')){
      pages.initialized(sessionStorage.getItem('username'));

      if(sessionStorage.getItem('setup') == "False"){
        pages.dbSetup(sessionStorage.getItem('username'));
      }
      else{
        templating.operationsList();
      }
    }

  },

  login: function(){

    login.initialized();
    app.popover.close();

  },

  create_account: function(){

    app.popover.close();
    login.initialized();

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

  dbUser = new PouchDB('localDB');

  dbUser.replicate.from(dbOnline).on('complete', function(info) {
    // then two-way, continuous, retriable sync
    success.general();
    templating.operationsList();
    dbUser.sync(dbOnline, {live: true, retry: true}).on('change', function (info) {
      // handle change

    }).on('paused', function (err) {
      // replication paused (e.g. replication up to date, user went offline)
      templating.operationsList();

    }).on('active', function () {
      // replicate resumed (e.g. new changes replicating, user went back online)

    }).on('denied', function (err) {
      // a document failed to replicate (e.g. due to permissions)

      var sessionEndError = app.notification.create({
        icon: '<i class="f7-icons">bolt</i>',
        title: 'Session Ended',
        text: 'Please login in again to create a new session',
        closeButton: true,
      });

      sessionEndError.open();

      error.general();

    }).on('complete', function (info) {
      // handle complete
      templating.operationsList();
      success.general();

    }).on('error', function (err) {
      // handle error
      templating.operationsList();

      var sessionError = app.notification.create({
        icon: '<i class="f7-icons">flag_fill</i>',
        title: 'An Error Occured',
        text: 'Network is offline.',
        closeButton: true,
      });

      sessionError.open();

      error.general();

    });

  });

},

operations: function(){
  //Loads in operstions Javascript file
  templating.stepsList();

},

initialized: function(name){

  $$('#create_user').attr('href', '');
  $$('#login_logout').attr('href', '');
  $$('#create_user').text(name);
  $$('#login_logout').text('Logout');
  $$('#scheduleList').show();

  $$('#login_logout').click(function(){
    db.logOut(function (err, response) {
      if (err) {
        // network error
      }
      success.logout();
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


}
