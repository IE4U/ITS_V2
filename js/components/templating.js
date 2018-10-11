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

templating.timeList = function(){
  var page = $$('.page[data-name="operation"]')[0].f7Page;
  var pageStep = $$('.page[data-name="step"]')[0].f7Page;

  dbUser.get(page.route.params.id).then(function(doc) {

    var arrayLength = 1;
    var testArray = false;
    var timeArray = [];
    var baseTime = timeConvertions.convertTime(timer.lapTime);

    if(doc.steps[pageStep.route.params.index].doc.times != undefined){
      testArray = true;
      if(doc.steps[pageStep.route.params.index].doc.times.length > 0){
        arrayLength = doc.steps[pageStep.route.params.index].doc.times.length;
        timeArray = doc.steps[pageStep.route.params.index].doc.times;
      }
    }

    var timeList = {times: timeArray, index: arrayLength, base: baseTime , test: testArray};

    var timesListCompiledTemplate = Template7.compile(template.time_list);
    var html = timesListCompiledTemplate(timeList);

    $$('#times_output').html(html);


  }).then(function(){


  }).catch(function (err) {
    console.log(err);
  });


}
