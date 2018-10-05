var templating = {};

templating.operationsList = function(){
  dbUser.allDocs({
    include_docs: true,
    attachments: true,
  }).then(function(response, err){
    if(err){
      console.log(err);
    }
    else{

      var operationsList = {operations: response.rows};
      console.log(operationsList);
      var operationsListCompiledTemplate = Template7.compile(template.operations_list);
      var html = operationsListCompiledTemplate(operationsList);
      //console.log(html);
      $$('#operationslink_output').html(html);

      //Sets up actions on home page
      home.initialized();

    }
  });
}

templating.stepsList = function(){
  var page = $$('.page[data-name="operation"]')[0].f7Page;

  dbUser.get(page.route.params.id).then(function(doc) {

    var stepsList = {steps: doc.steps};
    console.log(stepsList);
    var stepsListCompiledTemplate = Template7.compile(template.steps_list);
    var html = stepsListCompiledTemplate(stepsList);

    $$('#stepslink_output').html(html);

    //Sets up actions on the Operations Page
    operations.initialized();
  }).catch(function (err) {
    console.log(err);
  });

}
