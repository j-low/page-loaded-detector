var firstObs = true;
var detector = {
  observer: new MutationObserver(function(mutations) {
    // since DOM has begun to render, clear load-failure timeout
    window.clearTimeout(initialObsTimer);

    var observation = { mutations: mutations, firstObs: firstObs };
    chrome.runtime.sendMessage(observation, function(resp) {
      if (firstObs) firstObs = false;
      if (resp.disconnect) handlePageLoaded(detector);
    });
  }),
  target: document.getElementsByTagName('body')[0],
  config: { childList: true, subtree: true }
};

var initialObsTimer = setTimeout(function() {
  chrome.runtime.sendMessage({ loadingFailed: true }, function() {
    handlePageNotLoaded(detector);
  });
}, 500);


function init(det) {
  det.observer.observe(det.target, det.config);
}

function handlePageLoaded(det) {
  det.observer.disconnect();
  console.log('content-script:page-loaded');
}

function handlePageNotLoaded(det) {
  det.observer.disconnect();
  console.log('content-script:page-not-loaded');
}

init(detector);
