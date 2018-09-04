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
      //console.log(response);
      var operationsListCompiledTemplate = Template7.compile(template.operations_list);
      var html = operationsListCompiledTemplate(operationsList);
      //console.log(html);
      $$('#operationslink_output').html(html);

      //Sets up actions on home page
      home.initialized();

    }
  });
}
