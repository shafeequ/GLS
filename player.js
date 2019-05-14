var jsonData;
var step=0;
var totalSteps;

fetch('guide.json').then(function(resp){
    return resp.json();
}).then(function(data){
  jsonData = data.steps;
  totalSteps = jsonData.length;
  setInitialTooltip();

});


function setInitialTooltip() {

  document.querySelector(".tooltip-back").classList.add('hide');
  document.querySelector(".tooltip-next").classList.add('hide');
  document.querySelector(".tooltip-done").classList.add('hide');
  document.querySelector(".tooltip-number").classList.add('hide');
  document.querySelector(".tooltip-block").classList.add('left');

  document.querySelector(".tooltip-block").classList.remove('fadeOut');
  document.querySelector(".tooltip-block").classList.add('fadeIn');

  var tourBtnCoords = document.querySelector('.tour-btn').getBoundingClientRect();
  var top = tourBtnCoords.top;
  var left = tourBtnCoords.left;
  var width = tourBtnCoords.width;
  var height = tourBtnCoords.height;
  document.querySelector(".tooltip-block").style.top = top+'px';
  document.querySelector(".tooltip-block").style.left = left+width+30+'px';

}

document.querySelector(".tooltip-close").addEventListener("click", closeTooltip);
document.querySelector(".tour-btn").addEventListener("click", positionTooltip);
document.querySelector(".tooltip-done").addEventListener("click", closeTooltip);
document.querySelector(".tooltip-actions").addEventListener("click", positionTooltip);

function closeTooltip() {
  document.querySelector(".tooltip-block").classList.remove('show');
  document.querySelector(".tooltip-block").classList.add('hide');
}

function positionTooltip(event) {

    event.stopPropagation();

    document.querySelector(".tooltip-block").classList.add('fadeOut');
    document.querySelector(".tooltip-block").classList.remove('fadeIn');

    var targetElem = event.target;
    var targetText = targetElem.innerText.toLowerCase();

    if(targetText == 'next' || targetText.indexOf('tour') != -1){
      step++;
    }
    else if(targetText == 'back') {
      step--;
    }


    var toolTipData = jsonData[step-1];
    var toolTipTitle = toolTipData.title;
    var toolTipDesp = toolTipData.desp;
    var type = toolTipData.type;
    var selector = toolTipData.selector;
    var toolTipId = toolTipData.id;


    if(type == 'id' || type == 'class') {

      var elem = document.querySelector(selector);
      var scrollTo = elem.getBoundingClientRect().top + window.scrollY-100;

    }
    else {
      var splitElem = selector.split(':');
      var nthElem = splitElem[1];
      var parentElem = document.querySelectorAll(splitElem[0])[nthElem];
      var elem = parentElem.children[0];
      var scrollTo = elem.getBoundingClientRect().top + window.scrollY-100;
    }

        window.scroll({
          top: scrollTo,
          behavior: 'smooth'
        });

        window.onscroll = e => {
          let currentScrollOffset = window.pageYOffset || document.documentElement.scrollTop;
          // Scroll reach the target
          if (currentScrollOffset == Math.ceil(scrollTo)) {

            document.querySelector(".tooltip-number").innerText = toolTipId;
            document.querySelector(".tooltip-title").innerText = toolTipTitle;
            document.querySelector(".tooltip-desp").innerText = toolTipDesp;

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
