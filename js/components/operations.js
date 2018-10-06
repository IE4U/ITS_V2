
var operations = {};

operations = {

  add_button: function(){
    var selector = "#add_button_steps";
    $$(selector).on('click', function (e) {
      app.dialog.prompt('What is your Step\'s name?', function (name) {
        operationsFunctions.addStep(name);
      });
    });
  },

  initialized: function() {
    //Operation's Data **************
    var page = $$('.page[data-name="operation"]')[0].f7Page;

    //initialize the operation's Data

    $$('#opertionInputName').val(page.route.context.name);
    $$('#opertionInputDescription').val(page.route.context.description);

    //Sets the add step add_button

    operations.add_button();

    //Check for changes in the data

    $$('.operationsInputs').change(function(e){
      dbUser.get(page.route.params.id).then(function(doc) {
        if($$("#opertionInputName").val() != ""){
          doc.name = $$("#opertionInputName").val();
        }
        doc.description = $$("#opertionInputDescription").val();
        return dbUser.put(doc);
      }).then(function(response) {
        //Updates the base list of operations for the name change
        console.log(response);
        templating.operationsList();
        // handle response

      }).catch(function (err) {
        console.log(err);
      });

    });

    //Toolbar *************

    //Allows an operation to be deleted

    $$("#deleteOperation").on("click", function(){
      app.dialog.confirm('Are you sure you want to delete this operation?', function () {

        dbUser.get(page.route.params.id).then(function(doc) {
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


var operationsFunctions = {
  addStep: function(namePass) {
    var page = $$('.page[data-name="operation"]')[0].f7Page;

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
        dbUser.get(page.route.params.id).then(function(doc) {

          if(doc.steps){
            doc.steps.push({doc: {name: namePass, average_time: "N/A"}});
          }
          else{
            doc.steps = [{doc: {name: namePass, average_time: "N/A"}}];
          }

          return dbUser.put(doc);

        }).then(function(response) {

          //Updates the base list of steps

          templating.stepsList();


        }).catch(function (err) {
          console.log(err);
        });
      }
    });
  },
}
