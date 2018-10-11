var step = {
  initialized: function(){

    var page = $$('.page[data-name="operation"]')[0].f7Page;
    var pageStep = $$('.page[data-name="step"]')[0].f7Page;
    var docTemp = {}; //There can't be an error with the posting

    dbUser.get(page.route.params.id).then(function(doc) {
      console.log(page.route.context.steps[pageStep.route.params.index].doc.currentTime);
      if(page.route.context.steps[pageStep.route.params.index].doc.currentTime != undefined){
        timer.initialized(page.route.context.steps[pageStep.route.params.index].doc.currentTime.currentTime, page.route.context.steps[pageStep.route.params.index].doc.currentTime.lapTime);
      }
      else{
        timer.initialized(0, 0);
      }

    }).then(function(reponse){

      templating.timeList();

    }).catch(function (err) {
      console.log(err);
    });


    $$('#stepInputName').val(page.route.context.steps[pageStep.route.params.index].doc.name);
    $$('#stepInputDescription').val(page.route.context.steps[pageStep.route.params.index].doc.description);

    $$('#timerStart').on('click', function(e){
      dbUser.get(page.route.params.id).then(function(doc) {
        if(doc.steps[pageStep.route.params.index].doc.times == undefined){

          doc.steps[pageStep.route.params.index].doc.times = [];

          return dbUser.put(doc);
        }

      }).then(function(reponse){
        templating.timeList();
      }).catch(function (err) {
        console.log(err);
      });
    });

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

  addTime: function(timeAdd){
    var page = $$('.page[data-name="operation"]')[0].f7Page;
    var pageStep = $$('.page[data-name="step"]')[0].f7Page;

    dbUser.get(page.route.params.id).then(function(doc){

      if(doc.steps[pageStep.route.params.index].doc.times){
        doc.steps[pageStep.route.params.index].doc.times.push({time: timeConvertions.convertTime(timeAdd), timeStamp: Date.now()});
      }
      else{
        doc.steps[pageStep.route.params.index].doc.times = [{time: timeConvertions.convertTime(timeAdd), timeStamp: Date.now()}];
      }

      return dbUser.put(doc);
    }).then(function(){

      templating.timeList();

    }).catch(function (err) {
      console.log(err);
    });



  },

  addCurrentTime: function(timeCurrent, timeLap){
    var page = $$('.page[data-name="operation"]')[0].f7Page;
    var pageStep = $$('.page[data-name="step"]')[0].f7Page;

    var docTemp = {};

    dbUser.get(page.route.params.id).then(function(doc){

      doc.steps[pageStep.route.params.index].doc.currentTime = {currentTime: timeCurrent, lapTime: timeLap, currentTimeStamp: timeConvertions.convertTime(timeCurrent),lapTimeStamp: timeConvertions.convertTime(timeLap), timeStamp: Date.now()};

      docTemp = doc;

      return dbUser.put(doc);
    }).then(function(){

      page.route.context = docTemp;

    }).catch(function (err) {
      console.log(err);
    });



  },


}
