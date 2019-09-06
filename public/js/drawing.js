// Initialize Variables
var path, ink, chart, scores, imgData;
var timer = 0, lastTimestamp = 0, lastTimestamp_check = 0, idx_guess = 0;
var d_scores = {}

// Install Paper.js
paper.install(window);

// Initialize...
window.onload = function() {

  initInk();              // Initialize Ink array ()
  paper.setup('canvas');  // Setup Paper #canvas

  var tool = new Tool();  // Inititalize Paper Tool

  // Paper Tool Mouse Down Event
  tool.onMouseDown = function(event) {
    // New Paper Path and Settings
    path = new Path();
    path.strokeColor = 'black';
    path.strokeWidth = 7;

    // Get Time [ms] for each Guess (needed for accurate Google AI Guessing)
    var thisTimestamp = event.event.timeStamp;
    if(timer === 0){
      timer = 1;
      var time = 0;
    }else{
      var timeDelta = thisTimestamp - lastTimestamp;
      var time = ink[2][ink[2].length-1] + timeDelta;
    }

    // Get XY point from event w/ time [ms] to update Ink Array
    updateInk(event.point, time);
    // Draw XY point to Paper Path
    path.add(event.point);

    // Reset Timestamps
    lastTimestamp = thisTimestamp;
  }

  // Paper Tool Mouse Drag Event
  tool.onMouseDrag = function(event) {
    // Get Event Timestamp and Timestamp Delta
    var thisTimestamp = event.event.timeStamp ;
    var timeDelta = thisTimestamp - lastTimestamp;
    // Get new Time for Ink Array
    var time = ink[2][ink[2].length-1] + timeDelta;

    // Get XY point from event w/ time [ms] to update Ink Array
    updateInk(event.point, time);
    // Draw XY point to Paper Path
    path.add(event.point);

    // Reset Timestamps
    lastTimestamp = thisTimestamp;

    // Check Google AI Quickdraw every 250 m/s
    // if(thisTimestamp - lastTimestamp_check > 250){
    //   checkQuickDraw();
    //   lastTimestamp_check = thisTimestamp;
    // }
  }

  // Initialize Info Modal
  initInfoModal();

}

// Initialize Ink Array
function initInk(){
  ink = [[],[],[]];
}

// Clear Paper Drawing Canvas
function clearDrawing() {

  // Remove Paper Path Layer
  paper.project.activeLayer.removeChildren();
  paper.view.draw();

  // Init Ink Array
  initInk();

  // Resert Variables
  timer = 0;
  idx_guess = 0;
  d_scores = {};

  // Destroy Guess Chart
  chart.destroy();

}

// TODO
function saveDrawing() {
  // Get Paper Canvas Weight/Height
  var c_dims = getCanvasDimensions();
  var e = document.getElementById("dropDown");
  var selectedWord = e.options[e.selectedIndex].value;
  imgData = {
    "language":"quickdraw",
    "writing_guide":{"width": c_dims.width, "height":c_dims.height},
    "ink": [ink],
    "word": selectedWord
  }
  clearDrawing()
}

// Update Ink Array w/ XY Point + Time
function updateInk(point, time){
  ink[0].push(point.x);
  ink[1].push(point.y);
  ink[2].push(time);
}

// Get Paper Canvas Dimensions Width/Height
function getCanvasDimensions(){
  var w = document.getElementById('canvas').offsetWidth;
  var h = document.getElementById('canvas').offsetHeight;
  return {height: h, width: w};
}

// Create and Fill Array
function createArray(len, itm) {
    var arr1 = [itm],
        arr2 = [];
    while (len > 0) {
        if (len & 1) arr2 = arr2.concat(arr1);
        arr1 = arr1.concat(arr1);
        len >>>= 1;
    }
    return arr2;
}

// Initialize Info Modal
function initInfoModal(){

  // Get the modal
  var modal = document.getElementById('info');

  // Get the button that opens the modal
  var btn = document.getElementById("btnInfo");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
}
