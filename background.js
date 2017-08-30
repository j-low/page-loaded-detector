function init() {
  var detectionStarted = false;
  var obs;
  var timer;

  chrome.runtime.onMessage.addListener(function(obs, sender, resp) {
    if (obs.loadingFailed) resp({ disconnect: true });

    // reset the detection flag if a content script is reloaded
    if (obs.firstObs) detectionStarted = false;

    // if new page load, start detection
    if (!detectionStarted) {
      detectionStarted = true;
      window.clearTimeout(timer);
      timer = setTimeout(function() {
        resp({ disconnect: true });
        handlePageLoaded();
      }, 3000);

    // else reset timer if new DOM mutation occurs
    } else {
      window.clearTimeout(timer);
      timer = setTimeout(function() {
        resp({ disconnect: true });
        handlePageLoaded();
      }, 3000);
    }
    return true;
  });
}

function handlePageLoaded() {
  console.log('background:page-loaded');
}

function handlePageNotLoaded() {
  console.log('background:page-not-loaded');
}

init();
