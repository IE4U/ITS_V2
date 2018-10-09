var timer = {
  initialized: function(){
    timer.currentTime = 0;
    timer.lapTime = 0;
    timerFunctions.initialized();
  },

  clear: function(){
    //Need to add away to save the times
    $$(timer.start).off('click');
    $$(timer.reset).off('click');
    window.clearInterval(timer.timeWindow) ;
  },

  //Inidicates the element id names being worked with, these are the 4 main controls
  reset: "#timerReset",
  start: "#timerStart",
  stop: "#timerStart",
  lap: "#timerReset",
  time: "#timerTime",
  currentTime: 0,
  lapTime: 0,
  timeWindow: "",

}

var timerFunctions = {

  initialized: function(){
    $$(timer.start).once('click', function(){
      timerFunctions.startTimer();
    });

    $$(timer.reset).once('click', function(e){
      timerFunctions.resetTimer();
    });

  },

  startTimer: function(){
    timer.timeWindow = window.setInterval(function(e){ timerFunctions.updateTime() }, 100);

    //lap timer controls once the timer has started

    $$(timer.reset).off('click');

    $$(timer.lap).removeClass("color-green");
    $$(timer.lap).addClass("color-red");
    $$(timer.lap).text("Lap");

    timerFunctions.lapTimer();

    //turns the timers on and off***

    //Changes the buttons colors once the timer starts
    $$(timer.stop).removeClass("color-green");
    $$(timer.stop).addClass("color-red");
    $$(timer.stop).text("Stop");

    timerFunctions.stopTimer();
  },

  stopTimer: function(){
    //The stop click event
    $$(timer.stop).once('click', function(e){

      window.clearInterval(timer.timeWindow) ;

      //Changes the buttons colors once the timer stops
      $$(timer.start).removeClass("color-red");
      $$(timer.start).addClass("color-green");
      $$(timer.start).text("Start");

      //Changes the button colors of the reset button controls
      $$(timer.lap).off('click');
      $$(timer.reset).removeClass("color-green");
      $$(timer.reset).addClass("color-red");
      $$(timer.reset).text("Reset");

      //Turns the timer back on click event
      $$(timer.start).once('click', function(){
        timerFunctions.startTimer();
      });

      $$(timer.reset).once('click', function(e){
        timerFunctions.resetTimer();
      });

    });
  },

  resetTimer: function(){
    timer.currentTime = 0;
    timer.lapTime = 0;
    $$(timer.time).text(timeConvertions.convertTime(timer.currentTime));
  },

  lapTimer: function(){
    $$(timer.lap).on('click', function(e){
      timer.lapTime = 0;
    });
  },

  updateTime: function(){
    timer.currentTime ++;
    timer.lapTime ++;
    $$(timer.time).text(timeConvertions.convertTime(timer.currentTime));
  },
}

var timeConvertions = {};

timeConvertions.convertTime = function(time) {
  if(time != "N/A") {
    var x = 0;
    var seconds = 0;
    var hrseconds = 0;
    var minutes = 0;
    var hours = 0;
    var days = 0;

    hrseconds = (time % 10);
    time = time/10;
    seconds=Math.trunc((time)%60);
    minutes=Math.trunc((time/(60))%60);
    hours=Math.trunc((time/(60*60))%2);

    var timeString = timeConvertions.checkValue10(hours) + ":" + timeConvertions.checkValue10(minutes) + ":" + timeConvertions.checkValue10(seconds) + "." + hrseconds;
  }
  else {
    timeString = time;
  }

  return timeString;
}

timeConvertions.checkValue10 = function(val) {

  var timeVal = val;

  if(val < 10)
  {
    timeVal = "0" + val;
  }

  return timeVal;
}
