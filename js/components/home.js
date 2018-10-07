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

    dbUser.post({
      "name": name,
    }).then(function (response) {
      templating.operationsList();
    }).catch(function (err) {
      console.log(err);
    });
  },
}
