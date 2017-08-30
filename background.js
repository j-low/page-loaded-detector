function detect() {
  var detectionStarted = false;
  var timer;

  chrome.runtime.onMessage.addListener(function(req, sender, resp) {
    // reset the detection flag if a content script is reloaded
    if (req.firstObs) detectionStarted = false;

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

detect();
