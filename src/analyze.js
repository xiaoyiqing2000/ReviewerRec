//---------------------------------
// part 3 :    analyze
//---------------------------------

function analyze() {

  info = ["type0"];
  //title
  var div = document.getElementById("content");
  var oriTitle = div.children[1].rows[0].cells[0].innerText;
  var left = oriTitle.indexOf("英文文题");
  var right = oriTitle.indexOf("学科分类号");
  var oriTitle = oriTitle.substring(left + 6, right - 1);
  info.push(oriTitle);
  //authornames
  div = document.getElementById("manu_info_1");
  var authornames = div.rows[0].cells[1].innerText;
  var end = authornames.lastIndexOf(";");
  authornames = authornames.substring(0, end);
  authornames = authornames.replace(/;/g, ",");
  info.push(authornames);
  //keywords
  div = document.getElementById("edit_submit");
  tbEntries = div.children[0].children[0].children;
  for (var i in tbEntries) {
    try {
      if (tbEntries[i].innerText.match("英文关键词")) {
        var oriKeywordsStr = tbEntries[i].cells[1].innerText;
        oriKeywordsStr = oriKeywordsStr.replace(/;/g, ",");
        oriKeywordsStr = oriKeywordsStr.replace(/^\s+|\s+$/g, "");
        info.push(oriKeywordsStr);
      }
    } catch {
      continue;
    }
  }
  info.push("Omitted.");
  //document.getElementById('title').value = info[1];
  //document.getElementById('authors').value = info[2];
  nwords = info[3].replace(/&lt;/g, ',').replace(/;/g, ',').replace(/</g, ',');
  nwords = nwords.replace(/\S*\.\S*\s/g, ', ').replace(/^[A-Z]\s/, '').replace(/\s[A-Z]\s/g, ', ');
  nwords = nwords.replace(/\s\s/g, ' ');
  nwords = nwords.replace(/,\s*,/g, ',');
  nwords = nwords.replace(/^,\s*/g, '');
  //document.getElementById('keywords').value = nwords;
  //document.getElementById('abstract').value = info[4];
  if (window.sessionStorage.keywords == undefined) {
    window.sessionStorage.title = info[1];
    window.sessionStorage.authorsname = info[2];
    window.sessionStorage.keywords = nwords;
    // window.sessionStorage.abstract = info[4];
    today = new Date();
    window.sessionStorage.date = today.toDateString();
    document.getElementById('keywords').value = window.sessionStorage.keywords;
    document.getElementById("keywords").style.fontFamily = "Verdana";
    document.getElementById("keywords").style.fontSize = "11px";
  }
}