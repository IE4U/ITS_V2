var step = {
  initialized: function(){

    timer.initialized();

    var page = $$('.page[data-name="operation"]')[0].f7Page;
    var pageStep = $$('.page[data-name="step"]')[0].f7Page;
    var docTemp = {}; //There can't be an error with the posting

    $$('#stepInputName').val(page.route.context.steps[pageStep.route.params.index].doc.name);
    $$('#stepInputDescription').val(page.route.context.steps[pageStep.route.params.index].doc.description);

    $$('.stepsInputs').change(function(e){
      dbUser.get(page.route.params.id).then(function(doc) {

        console.log(doc.steps[pageStep.route.params.index].doc.name);
        if($$("#stepInputName").val() != ""){
          doc.steps[pageStep.route.params.index].doc.name = $$("#stepInputName").val();
        }
        doc.steps[pageStep.route.params.index].doc.description = $$("#stepInputDescription").val();

        docTemp = doc; //For an error check

        return dbUser.put(doc);
      }).then(function(response) {
        //Updates the base list of operations for the name change
        console.log(response);

        page.route.context = docTemp;

        templating.stepsList();
        // handle response

      }).catch(function (err) {
        console.log(err);
      });

    });

  },

  addTime: function(){





  },


}
