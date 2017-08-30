var firstObs = true;
var detector = {
  observer: new MutationObserver(function(mutations) {
    var observation = { mutations: mutations, firstObs: firstObs };
    chrome.runtime.sendMessage(observation, function(resp) {
      if (firstObs) firstObs = false;
      if (resp.disconnect) handlePageLoaded(detector);
    });
  }),
  target: document.getElementsByTagName('body')[0],
  config: { childList: true, subtree: true }
};

function init(det) {
  det.observer.observe(det.target, det.config);
}

function handlePageLoaded(det) {
  det.observer.disconnect();
  console.log('content-script:page-loaded');
}

init(detector);
