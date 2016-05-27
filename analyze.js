//---------------------------------
// part 3 :    analyze
//---------------------------------

function analyze(){

  setField('MANUSCRIPT_DETAILS_OVERRIDE_TASK_TAG','');
  setDataAndNextPage('MANUSCRIPT_DETAILS_SHOW_TAB','Tdetails','ASSOCIATE_EDITOR_MANUSCRIPT_DETAILS');

  url = window.location.href;
  url = url.replace(/#.*/, "");
  url = url + "?" + $("form").serialize();
  info = ["type0"];

  resetField('MANUSCRIPT_DETAILS_OVERRIDE_TASK_TAG','');
  resetDataAndNextPage('MANUSCRIPT_DETAILS_SHOW_TAB','Tdetails','ASSOCIATE_EDITOR_MANUSCRIPT_DETAILS');

  $.get(url, function(data, status) {
    parser = new DOMParser();
    doc = parser.parseFromString(data, "text/html");

    var table = doc.getElementById("brn15");
    var left = [].slice.apply(table.getElementsByClassName("alternatetablecolor"));
    var right = [].slice.apply(table.getElementsByClassName("tablelightcolor"));

    for (var i in left){
      lefttext = left[i].innerText;
      righttext = right[i].innerText;
      if (lefttext == "Title:")
        info.push(righttext);
      if (lefttext.match("Authors") != null){
        authorfinished = 0;
        pagecontents = [].slice.apply(right[i].getElementsByClassName("pagecontents"));
        authorsname = [];
        authorlist = [];
        var j = 0;
        while(j < pagecontents.length){
          author = {}
          name = pagecontents[j].innerText.trim();
          name = name.replace(',', '').trim();
          authorsname.push(name);
          a = pagecontents[j].getElementsByTagName('a')[0];
          if (a == null || a.href.match("javascript:popWindow") == null){
            j += 1;
            continue;
          }
          j += 1;
          while(pagecontents[j].getElementsByTagName('a')[0] != null)
            j += 1;
          affiliation = pagecontents[j].innerText.trim();
          author.name = name;
          author.affiliation = affiliation;
          authorlist.push(author);
          str = a.href.replace(/[\s\S]*javascript\:popWindow\(\'/, "");
          str = str.replace(/'[\s\S]*/g, "");
          host = window.location.host;
          url = host + "/" + str;

          (function(url, length){
            $.get(url, function(data, status){ getAuthorEmail(length-1, data); });
          })(url, authorlist.length);

          j += 1;
        }
        info.push(authorsname.join(", "));
      }
      if(lefttext.match("Keyword") != null){
        info.push(righttext);
      }
    }

    // console.log(info);
    // console.log(authorlist);

    getAbstract = false;
    var links = [].slice.apply(doc.getElementsByTagName('a'));

    for (var i in links) {
      var text = links[i].href;
      if (text.match("ms_preview") != null) {
        text = text.replace("javascript:popWindow(\'", "");
        text = text.replace(/','ms_preview'(\s|\S)*$/, "");
        text = window.location.host + text;
        $.get(text, function(data, status){
          var parser = new DOMParser();
          var doc = parser.parseFromString(data, "text/html");
          var str = doc.getElementsByClassName("pagecontents")[1].textContent;
          window.sessionStorage.abstract = str.replace("Abstract: ", "");
          getAbstract = true;
          if (getAbstract && reviewerfinished == reviewerlist.length && authorfinished == authorlist.length) {
            sendDataToAminer();
          }
        });
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
    if (window.sessionStorage.keywords == undefined){
      window.sessionStorage.title = info[1];
      window.sessionStorage.authorsname = info[2];
      window.sessionStorage.keywords = nwords;
      // window.sessionStorage.abstract = info[4];
      today = new Date();
      window.sessionStorage.date = today.toDateString();
      document.getElementById('keywords').value = window.sessionStorage.keywords;
    }

    getReviewerInfo();

  });

}





function getReviewerInfo(){
  list = $(".pagecontents");
  for (var i in list) {
    if (list[i].getElementsByTagName("b").length > 0) {
      window.sessionStorage.paperid = $.trim(list[i].textContent);
      break;
    }
  }
  flag = false;
  reviewerlist = [];
  reviewerfinished = 0;
  for (var i = 0; i < list.length; i++) {
    if (list[i].getElementsByTagName("b").length > 0 && list[i].textContent.match("Reviewer List") != null) {
      flag = true; continue;
    }
    if (list[i].getElementsByTagName("b").length > 0 && list[i].textContent.match("Alternates") != null) {
      flag = false; break;
    }
    if (flag == true && list[i].innerHTML.match("mailpopup") != null) {
      reviewer = {}
      reviewer.name = $(list[i]).text();
      // console.log(reviewer.name);
      // console.log(type(reviewer.name));
      reviewer.name = reviewer.name.replace('recommended', '').trim();
      // console.log(reviewer.name);
      x = list[i];
      while (x.className != "tablelightcolor"){
        x = x.parentNode;
      }
      x = $($(x).next()).get(0);
      tmp = $.trim(x.getElementsByTagName("p")[0].textContent);
      tmp = tmp.replace(/\n[\s\S]*/g, "");
      reviewer.status = tmp;
      x = $($(x).next()).get(0);
      tmp = $.trim(x.getElementsByClassName("pagecontents")[1].textContent);
      reviewer.date = tmp;
      reviewerlist.push(reviewer);
      host = window.location.host;
      str = list[i].innerHTML.replace(/[\s\S]*javascript\:popWindow\(\'/, "");
      str = str.replace(/'[\s\S]*/g, "");
      url = host + "/" + str;
      if (reviewerlist.length == 1) $.get(url, function(data, status){ getReviewerEmail(0, data); });
      if (reviewerlist.length == 2) $.get(url, function(data, status){ getReviewerEmail(1, data); });
      if (reviewerlist.length == 3) $.get(url, function(data, status){ getReviewerEmail(2, data); });
      if (reviewerlist.length == 4) $.get(url, function(data, status){ getReviewerEmail(3, data); });
      if (reviewerlist.length == 5) $.get(url, function(data, status){ getReviewerEmail(4, data); });
      if (reviewerlist.length == 6) $.get(url, function(data, status){ getReviewerEmail(5, data); });
      if (reviewerlist.length == 7) $.get(url, function(data, status){ getReviewerEmail(6, data); });
      if (reviewerlist.length == 8) $.get(url, function(data, status){ getReviewerEmail(7, data); });
      if (reviewerlist.length == 9) $.get(url, function(data, status){ getReviewerEmail(8, data); });
      if (reviewerlist.length == 10) $.get(url, function(data, status){ getReviewerEmail(9, data); });
      if (reviewerlist.length == 11) $.get(url, function(data, status){ getReviewerEmail(10, data); });
      if (reviewerlist.length == 12) $.get(url, function(data, status){ getReviewerEmail(11, data); });
      if (reviewerlist.length == 13) $.get(url, function(data, status){ getReviewerEmail(12, data); });
      if (reviewerlist.length == 14) $.get(url, function(data, status){ getReviewerEmail(13, data); });
      if (reviewerlist.length == 15) $.get(url, function(data, status){ getReviewerEmail(14, data); });
      if (reviewerlist.length == 16) $.get(url, function(data, status){ getReviewerEmail(15, data); });
      if (reviewerlist.length == 17) $.get(url, function(data, status){ getReviewerEmail(16, data); });
      if (reviewerlist.length == 18) $.get(url, function(data, status){ getReviewerEmail(17, data); });
      if (reviewerlist.length == 19) $.get(url, function(data, status){ getReviewerEmail(18, data); });
      if (reviewerlist.length == 20) $.get(url, function(data, status){ getReviewerEmail(19, data); });
    }
  }
}

function getAuthorEmail(id, data){
  var parser = new DOMParser();
  var doc = parser.parseFromString(data, "text/html");
  var str = doc.getElementsByName("mainemailwindow")[0].getAttribute("src");
  $.get(str, function(data, status){
    var parser = new DOMParser();
    var doc = parser.parseFromString(data, "text/html");
    var str = doc.getElementsByName("EMAIL_TEMPLATE_TO")[0].value;
    var author = authorlist[id];
    author.email = str;
    authorlist[id] = author;
    authorfinished = authorfinished + 1;
    if (getAbstract && reviewerfinished == reviewerlist.length && authorfinished == authorlist.length) {
      sendDataToAminer();
    }
  });
}

function getReviewerEmail(id, data){
  var parser = new DOMParser();
  var doc = parser.parseFromString(data, "text/html");
  var str = doc.getElementsByName("mainemailwindow")[0].getAttribute("src");
  $.get(str, function(data, status){
    var parser = new DOMParser();
    var doc = parser.parseFromString(data, "text/html");
    var str = doc.getElementsByName("EMAIL_TEMPLATE_TO")[0].value;
    var reviewer = reviewerlist[id];
    reviewer.email = str;
    reviewerlist[id] = reviewer;
    reviewerfinished = reviewerfinished + 1;
    if (getAbstract && reviewerfinished == reviewerlist.length && authorfinished == authorlist.length) {
      sendDataToAminer();
    }
  });
}

function sendDataToAminer(){
  if (reviewerlist.length == 0) return;
  window.sessionStorage.reviewers = JSON.stringify(reviewerlist);
  window.sessionStorage.authors = JSON.stringify(authorlist);
  //btn = document.createElement('button');
  //btn.appendChild(document.createTextNode("post"));
  //btn.onclick = function(){
    var url = "https://api.aminer.org/api/reviewer/add";
    var data = {};
    data.paperid = window.sessionStorage.paperid;
    data.title = window.sessionStorage.title;
    data.keywords = window.sessionStorage.keywords;
    data.abstract = window.sessionStorage.abstract;
    data.date = window.sessionStorage.date;
    data.authors = authorlist;
    data.reviewers = reviewerlist;
    $.ajax({
      type : "POST",
      url : url,
      data : $.toJSON(data),
      contentType : "application/json"
    });
  //}
  //document.body.appendChild(btn);
  //$(btn).click();
}


