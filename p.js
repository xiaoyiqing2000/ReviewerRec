tabset = {};

chrome.browserAction.onClicked.addListener(function(tab){ 
  chrome.tabs.executeScript(tab.id, {code: "window.sessionStorage.show='true';"});
  exec(tab, true);
});

chrome.tabs.onUpdated.addListener(function(tadid, changeinfo, tab) {
  if (changeinfo.status == "complete" && tabset[tab.id] == true && tab.url.match("manuscriptcentral.com") != null) {
    exec(tab, true);
  }
  if (changeinfo.status == "complete" && tabset[tab.id] != true && tab.url.match("manuscriptcentral.com") != null) {
    chrome.tabs.executeScript(tab.id, {code: "window.sessionStorage.clear();"});
    exec(tab, false);
  }
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

chrome.runtime.onMessage.addListener(function (message, sender){
  tabid = sender.tab.id;
  if (message == "ok") {
    tabset[tabid] = true;
  }
  else {
    tabset[tabid] = false;
  }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  //alert(tabId);
  tabset[tabid] = undefined;
});

chrome.tabs.onCreated.addListener(function(tab){
  //alert(tab.id);
});

/*
style="width=500px;height=500px"
<form name="q">
<table>
<tr> <td>Title:</td> <td><input size=68 type="text" name="title"></input></td> </tr>
<tr> <td>Authors:</td> <td><input size=68 type="text" name="authors"></input></td>  </tr>
<tr> <td>Abstract:</td> <td><textarea cols=69 rows=10 name="abstract" style="resize: none;"></textarea></td> </tr>
<tr> <td>Keywords:</td> <td><input size=68 type="text" name="keywords"></input></td> </tr>
</table>
</form>
<p> <button id=submit>Submit</button> </p>
*/

/*chrome.runtime.onMessage.addListener(function (info){
    //document.getElementById("test").innerHTML = "1234561";
  if (info[0] == "type0") {
    document.getElementsByName("title")[0].value = info[1];
    document.getElementsByName("authors")[0].value = info[2];
    document.getElementsByName("keywords")[0].value = info[3];
    document.getElementsByName("abstract")[0].value = info[4];
  };
});

function query() {
  //document.getElementsByName("title")[0].value = "123";
  //alert("Hello World!");
  info = ["type1"];
  info.push(document.getElementsByName("keywords")[0].value);
  chrome.tabs.create({url:chrome.extension.getURL("result.html")});
  chrome.runtime.sendMessage(info);
}*/
//alert("!");
//window.onload = function() {
  //document.getElementById('submit').onclick = query;
