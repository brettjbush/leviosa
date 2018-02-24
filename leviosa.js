/**
 * @file leviosa main JS file
 * @copyright Brett Bush 2018
 */

// Obtain leviosa boxes
var leviosaBoxes = document.getElementsByClassName("leviosa");

// Various depth constants for shadows (distance to background in pixels)
var depthConstantMinima = 10;
var depthConstantDefault = 25;
var depthConstantMaxima = 40;

// The current vertical and horizontal offsets
var currentBeta = 0;
var currentGamma = 0;

// Current angle in degrees
var currentBetaDegrees = 0;
var currentGammaDegrees = 0;

// Original Degrees
//var originalBeta = 0;
//var originalGamma = 0;

// Markers to check first
//var firstBeta = true;
//var firstGamma = true;

// Convert multiply to degrees to get radians
var degtorad = Math.PI / 180;

// Calculate the shadow offset from beta angle
function calcBetaOffset(depth, angle) {

  // Tangent * Adjacent = Opposite
  var offsetValue = Math.tan(Math.abs(angle) * degtorad) * depth;

  // Account for correct shadow direction
  if(angle < 0)
  {
    offsetValue = offsetValue * -1;
  }
  return offsetValue;
}

// Calculate the shadow offset from gamma angle
function calcGammaOffset(depth, angle) {

  // Tangent * Adjacent = Opposite
  var offsetValue = Math.tan(Math.abs(angle) * degtorad) * depth;

  // Account for correct shadow direction
  if(angle < 0)
  {
    offsetValue = offsetValue * -1;
  }
  return offsetValue;
}

function calcOpacity(betaAngle, gammaAngle) {
  return 1 - (Math.max(Math.abs(betaAngle), Math.abs(gammaAngle)) / 90);
}

// Triggered on device tilt
window.addEventListener("deviceorientation", function(event) {

  // Vertical tilt
  if(event.beta != null)
  {
    /*
    if(firstBeta)
    {
      originalBeta = event.beta;
      firstBeta = false;
    }
    var deltaBetaValue = event.beta - originalBeta;
    */
    var deltaBetaValue = event.beta;
    currentBeta = parseInt(Number(calcBetaOffset(depthConstantMaxima, deltaBetaValue)).toFixed(0));
    currentBetaDegrees = deltaBetaValue;
  }

  // Horizontal tilt
  if(event.gamma != null)
  {
    /*
    if(firstGamma)
    {
      originalGamma = event.gamma;
      firstGamma = false;
    }
    var deltaGammaValue = event.gamma - originalGamma;
    */
    var deltaGammaValue = event.gamma;
    currentGamma = parseInt(Number(calcGammaOffset(depthConstantMaxima, deltaGammaValue)).toFixed(0));
    currentGammaDegrees = deltaGammaValue;
  }

  // Apply change to all leviosa boxes
  for(i = 0; i < leviosaBoxes.length; i++)
  {
    if (Math.abs(window.orientation) === 90) {
      leviosaBoxes[i].style.boxShadow = (-1 * currentBeta.toString()) + "px " + currentGamma.toString() + "px 20px rgba(80, 80, 80, " + Number(calcOpacity(currentBetaDegrees, currentGammaDegrees)).toFixed(3) + ")";
    } else {
    	// Portrait
      leviosaBoxes[i].style.boxShadow = currentGamma.toString() + "px " + currentBeta.toString() + "px 20px rgba(80, 80, 80, " + Number(calcOpacity(currentBetaDegrees, currentGammaDegrees)).toFixed(3) + ")";
    }

  }
}, true);
