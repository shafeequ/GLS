//ADD YOUR CODE HERE.

var jsonData;
var step=0;
var totalSteps;


//loading the json file
request = new XMLHttpRequest;
request.open('GET', 'guide.json', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400){
    response = JSON.parse(request.responseText);
    jsonData = response.steps;
    totalSteps = jsonData.length;
    positionTooltip();
  } else {
    // We reached our target server, but it returned an error
  }
};

request.onerror = function() {
  // There was a connection error of some sort
  console.log("Connection Error")
};

request.send();


// binding event for the tooltip close button
document.querySelector(".tooltip-close").addEventListener("click", closeTooltip);
// binding event for the tooltip done button
document.querySelector(".tooltip-done").addEventListener("click", closeTooltip);
// binding event for the tooltip next and back buttons
document.querySelector(".tooltip-actions").addEventListener("click", positionTooltip);

function closeTooltip() {
  document.querySelector(".tooltip-block").classList.remove('show');
  document.querySelector(".tooltip-block").classList.add('hide');
}

//function which position the tooltip on pageload/clicking next and back button
function positionTooltip(event) {

    document.querySelector(".tooltip-block").classList.add('fadeOut');
    document.querySelector(".tooltip-block").classList.remove('fadeIn');

    //if the event is from next and back buttons
    if(event) {
      event.stopPropagation();
      var targetElem = event.target;
      var targetText = targetElem.innerText.toLowerCase();

      if(targetText == 'next'){
        step++;
      }
      else if(targetText == 'back') {
        step--;
      }
    }
    //if the event is on page load
    else {
      step++;
    }


    var toolTipData = jsonData[step-1];
    var toolTipTitle = toolTipData.content;
    var type = toolTipData.type;
    var selector = toolTipData.selector;
    var toolTipId = toolTipData.id;

    var splitElem = selector.split(':');
    var splitArray=[];
    splitArray.push(splitElem[1]);
    var splitNum = splitArray.toString();
    var splitNode = parseInt(splitNum.match(/\d+/));

    //if the element selector is a node
    if(splitElem[1]){
      var parentElem = document.querySelectorAll(splitElem[0])[splitNode];
      var elem = parentElem.children[0];
    }
    // if the element selector is a id or class
    else {
      var elem = document.querySelector(selector);
    }
    var scrollTo = elem.getBoundingClientRect().top + window.scrollY-100;


        //scrolls to the element mentioned in the json
        window.scroll({
          top: scrollTo,
          behavior: 'smooth'
        });

        window.onscroll = e => {
          let currentScrollOffset = window.pageYOffset || document.documentElement.scrollTop;

          // on the scroll is finished, load the tooltip
          if (currentScrollOffset == Math.ceil(scrollTo)) {

            document.querySelector(".tooltip-number").innerText = toolTipId;
            document.querySelector(".tooltip-title").innerText = toolTipTitle;

            document.querySelector(".tooltip-block").classList.remove('fadeIn');
            document.querySelector(".tooltip-block").classList.add('fadeOut');
            document.querySelector(".tooltip-number").classList.add('show');
            document.querySelector(".tooltip-number").classList.remove('hide');

            var elemCoords = elem.getBoundingClientRect();
            var top = elemCoords.top + window.pageYOffset;
            var left = elemCoords.left;
            var width = elemCoords.width;
            var height = elemCoords.height;


            document.querySelector(".tooltip-block").style.top = top+'px';
            document.querySelector(".tooltip-block").style.left = left+width+30+'px';

            if(step==1){
              document.querySelector(".tooltip-next").classList.remove('hide');
              document.querySelector(".tooltip-next").classList.add('show');

              document.querySelector(".tooltip-back").classList.remove('show');
              document.querySelector(".tooltip-back").classList.add('hide');

              document.querySelector(".tooltip-done").classList.add('hide');
              document.querySelector(".tooltip-done").classList.remove('show');

            }
            else if(step>1 && step<totalSteps) {
              document.querySelector(".tooltip-back").classList.remove('hide');
              document.querySelector(".tooltip-back").classList.add('show');

              document.querySelector(".tooltip-done").classList.add('hide');
              document.querySelector(".tooltip-done").classList.remove('show');

              document.querySelector(".tooltip-next").classList.remove('hide');
              document.querySelector(".tooltip-next").classList.add('show');

            }
            else if(step == totalSteps) {
              document.querySelector(".tooltip-next").classList.add('hide');
              document.querySelector(".tooltip-next").classList.remove('show');

              document.querySelector(".tooltip-done").classList.add('show');
              document.querySelector(".tooltip-done").classList.remove('hide');

            }

            document.querySelector(".tooltip-block").classList.remove('fadeOut');
            document.querySelector(".tooltip-block").classList.add('fadeIn');

            window.onscroll = null // remove listener
          }
        }

}
