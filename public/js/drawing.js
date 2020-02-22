// Initialize Variables
var path, ink, scores, imgData
var timer = 0, lastTimestamp = 0, lastTimestamp_check = 0, idx_guess = 0
var d_scores = {}

paper.install(window)

window.onload = function() {

  initInk()
  paper.setup('canvas')
  var tool = new Tool()

  // Paper Tool Mouse Down Event
  tool.onMouseDown = function(event) {
    path = new Path();
    path.strokeColor = 'black';
    path.strokeWidth = 7;

    // Get Time [ms] for each Guess (needed for accurate Google AI Guessing)
    var thisTimestamp = event.event.timeStamp;
    if(timer === 0) {
      timer = 1;
      var time = 0;
    } else {
      var timeDelta = thisTimestamp - lastTimestamp;
      var time = ink[2][ink[2].length-1] + timeDelta;
    }

    // Get XY point from event w/ time [ms] to update Ink Array
    updateInk(event.point, time)
    // Draw XY point to Paper Path
    path.add(event.point)
    // Reset Timestamps
    lastTimestamp = thisTimestamp;
  }

  tool.onMouseDrag = function(event) {
    // Get Event Timestamp and Timestamp Delta
    var thisTimestamp = event.event.timeStamp
    var timeDelta = thisTimestamp - lastTimestamp
    // Get new Time for Ink Array
    var time = ink[2][ink[2].length-1] + timeDelta;
    // Get XY point from event w/ time [ms] to update Ink Array
    updateInk(event.point, time)
    // Draw XY point to Paper Path
    path.add(event.point)
    // Reset Timestamps
    lastTimestamp = thisTimestamp
  }
}

function initInk(){
  ink = [[],[],[]]
}

function clearDrawing() {
  // Remove Paper Path Layer
  paper.project.activeLayer.removeChildren()
  paper.view.draw()
  initInk()
  timer = 0
  idx_guess = 0
  d_scores = {}
}

function saveDrawing() {
  // Get Paper Canvas Weight/Height
  var c_dims = getCanvasDimensions()
  var e = document.getElementById("dropDown")
  var label = e.options[e.selectedIndex].value
  imgData = {
    "dims": {"width": c_dims.width, "height":c_dims.height},
    "label": label,
    "ink": [ink]
  }
  clearDrawing()
}

// Update Ink Array w/ XY Point + Time
function updateInk(point, time){
  ink[0].push(point.x)
  ink[1].push(point.y)
  ink[2].push(time)
}

function getCanvasDimensions(){
  var w = document.getElementById('canvas').offsetWidth
  var h = document.getElementById('canvas').offsetHeight
  return {height: h, width: w}
}

// Create and Fill Array
function createArray(len, itm) {
  var arr1 = [itm], arr2 = []
  while (len > 0) {
    if (len & 1) arr2 = arr2.concat(arr1)
    arr1 = arr1.concat(arr1)
    len >>>= 1
  }
  return arr2
}
