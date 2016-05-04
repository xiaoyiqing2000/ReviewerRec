window.localStorage.clear();

chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.executeScript(tab.id, {code: "window.sessionStorage.show='true';"});
  exec(tab, true);
});

chrome.tabs.onUpdated.addListener(function(tadid, changeinfo, tab) {
  if (changeinfo.status == "complete" && tab.url.match("manuscriptcentral.com") != null) {
    state = window.localStorage.getItem(tab.id);
    if (state == "true") {
      exec(tab, true);
    } else {
      chrome.tabs.executeScript(tab.id, {code: "window.sessionStorage.clear();"});
      exec(tab, false);
    }
  }
});

chrome.runtime.onMessage.addListener(function (message, sender){
  tabid = sender.tab.id;
  if (message == "ok") {
    window.localStorage.setItem(tabid, "true");
  } else {
    window.localStorage.setItem(tabid, "false");
  }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  window.localStorage.removeItem(tabId);
});

function exec(tab, show) {
  if (tab.url.match("manuscriptcentral.com") != null) {
    //chrome.tabs.executeScript(Tabs[0].id, {file: 'bootstrap.min.js', allFrames: true});
    chrome.tabs.executeScript(tab.id, {file: 'content.js', allFrames: true});
    chrome.tabs.executeScript(tab.id, {file: 'scholarone.js', allFrames: true});
  }
  chrome.tabs.executeScript(tab.id, {file: 'jquery.min.js', allFrames: true});
  chrome.tabs.executeScript(tab.id, {file: 'jquery.json.js', allFrames: true});
  chrome.tabs.executeScript(tab.id, {file: 'jquery.soap.js', allFrames: true});
  chrome.tabs.executeScript(tab.id, {file: 't.js', allFrames: false}, function(){
    //if (show) chrome.tabs.executeScript(tab.id, {code: "$('#side').show();"});
  });
}

