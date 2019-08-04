//---------------------------------
// part 3 :    analyze
//---------------------------------

function analyze(){
  //3.0.5
  //updateKeywords(); //activate when needed. since js cant output to local files, src/tkdeKeywords.txt need to be changed manually
  //3.0.5
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
      /*
      3.0.4 code
      righttext = right[i].innerText;
      */
      //3.0.5
      var validRighttext = true;
      try {
        righttext = right[i].innerText;
      } catch {
        validRighttext = false;
        //alert(i + "no innerText");//debug
      }
      //3.0.5
      if (lefttext == "Title:" && validRighttext) //3.0.5 validRighttext
        info.push(righttext);
      if (lefttext.match("Authors") != null){
        //3.0.5
        try {
          if (authorlist.length != 0) continue;
        } catch {
          
        }
        //3.0.5
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
      if(lefttext.match("Keyword") != null && validRighttext){  //3.0.5 validRighttext
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
          extractKeywords();
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




//3.0.5
//update Keywords (activated when needed)
/*
function updateKeywords() {
  keywordsCount = [];

  function countKeywords(data) {
    for (var i in data.result) {
      var curReviewerTags = data.result[i].tags;
      for (var j in curReviewerTags) {
        //find if tag in array then ++ or push
        curTag = curReviewerTags[j].t.toLowerCase();
        var findFlag = false;
        //change alg: if Levenshtein distance similarity > 0.9 deem as same words
        for (var k in keywordsCount) {
          if (similarity(curTag, keywordsCount[k].name) > 0.9) {
            keywordsCount[k].counts++;
            findFlag = true;
          }
        }
        if (!findFlag) {
          var keyword = {};
          keyword.name = curTag;
          keyword.counts = 1;
          keywordsCount.push(keyword);
        }
      }
    }
  }
  url = "https://api.aminer.cn/api/roster/56f1750f76d9110ef18db5fe/order-by/h_index/offset/0/size/3000";
  $.get(url, function (data) {
    countKeywords(data);
  })
  url = "https://api.aminer.cn/api/roster/56f1750f76d9110ef18db5fe/order-by/h_index/offset/100/size/3000";
  $.get(url, function (data) {
    countKeywords(data);
  })
  url = "https://api.aminer.cn/api/roster/56f1750f76d9110ef18db5fe/order-by/h_index/offset/200/size/3000";
  $.get(url, function (data) {
    countKeywords(data);
  })
  url = "https://api.aminer.cn/api/roster/56f1750f76d9110ef18db5fe/order-by/h_index/offset/300/size/3000";
  $.get(url, function (data) {
    countKeywords(data);
  })
  url = "https://api.aminer.cn/api/roster/56f1750f76d9110ef18db5fe/order-by/h_index/offset/400/size/3000";
  $.get(url, function (data) {
    countKeywords(data);
  })
  url = "https://api.aminer.cn/api/roster/56f1750f76d9110ef18db5fe/order-by/h_index/offset/500/size/3000";
  $.get(url, function (data) {
    countKeywords(data);
  })
  url = "https://api.aminer.cn/api/roster/56f1750f76d9110ef18db5fe/order-by/h_index/offset/600/size/3000";
  $.get(url, function (data) {
    countKeywords(data);
  })
  url = "https://api.aminer.cn/api/roster/56f1750f76d9110ef18db5fe/order-by/h_index/offset/700/size/3000";
  $.get(url, function (data) {
    countKeywords(data);
  })
  url = "https://api.aminer.cn/api/roster/56f1750f76d9110ef18db5fe/order-by/h_index/offset/800/size/3000";
  $.get(url, function (data) {
    countKeywords(data);
  })
  url = "https://api.aminer.cn/api/roster/56f1750f76d9110ef18db5fe/order-by/h_index/offset/900/size/3000";
  $.get(url, function (data) {
    countKeywords(data);
    //bubble sort descend
    for (var i in keywordsCount) {
      for (var j = i; j in keywordsCount; j++) {
        if (keywordsCount[j].counts > keywordsCount[i].counts) {
          var tmp = keywordsCount[j];
          keywordsCount[j] = keywordsCount[i];
          keywordsCount[i] = tmp;
        }
      }
    }
    //output
    str = "";
    for (var i = 0; i < 100; i++) {
      str += "\"" + keywordsCount[i].name + "\", ";
    }
    console.log(str);
  })
}
*/
// test simlarity with Levenshtein distance  copyrighy https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function addOneScholarReviewerRoster(name, affiliation, email) {
  //find scholar and judge h-index >= 5
  //test tkde keywords
  var tkde = ["data mining", "machine learning", "information retrieval", "social network", "computer science", "database system", "support vector machine", "relational databases", "query processing", "knowledge discovery", "learning artificial intelligence", "search engine", "data analysis", "neural networks", "indexation", "recommender systems", "feature extraction", "wireless sensor network", "data models", "sensor network", "internet", "decision tree", "web services", "image retrieval", "semantic web", "information extraction", "feature selection", "distributed database", "algorithms", "query optimization", "association rule", "bioinformatics", "spatial databases", "data management", "neural-network", "artificial intelligence", "data structures", "supervised learning", "data stream", "privacy", "indexes", "satisfiability", "computational complexity", "data privacy", "expert system", "query languages", "xml", "classification", "genetic algorithm", "collaborative filtering", "world wide web", "similarity search", "bayesian networks", "distributed systems", "web page", "indexing", "knowledge base", "data warehouses", "information system", "time series", "xml document", "pattern recognition", "graphical model", "clustering", "index", "probabilistic model", "social media", "real time", "web pages", "clustering algorithm", "anomaly detection", "text mining", "image segmentation", "cloud computing", "p2p", "mixture model", "gene expression", "parallel processing", "approximation algorithm", "location based service", "security", "hidden markov model", "databases", "nearest neighbor", "wireless network", "access control", "temporal databases", "data integration", "parallel algorithms", "concurrency control", "data visualization", "data integrity", "natural language processing", "outlier detection", "mobile computing", "document clustering", "ad hoc network", "natural languages", "image classification", "graph theory"];
  var reName = name.replace(/ /g, "+");
  reName = reName.split("(")[0];
  var reAffi = affiliation.replace(/ /g, "+");
  //cut affiliation with "-" or ","
  reAffi = reAffi.split("-")[0];
  reAffi = reAffi.split(",")[0];
  url = "https://api.aminer.cn/api/search/person/advanced?name=" + reName + "&org=" + reAffi + "&size=10&sort=relevance&term=";
  $.get(url, function (data) {
    for (var i in data.result) {
      var curScholar = data.result[i];
      //h-index test
      if (curScholar.indices.h_index <= 5) continue;
      //keywords similarity
      //get all tags splited to words
      var overallSimilarity = [];
      var curScholarTags = [];
      for (var j in curScholar.tags) {
        var curtag = curScholar.tags[j].t;
        curtag = curtag.toLowerCase();
        curScholarTags = curScholarTags.concat(curtag);
      }
      //similarity algorithm 1 : Levenshtein distance of each word
      for (var j in curScholarTags) {
        var maxSim = 0;
        for (var k in tkde) {
          var curSim = similarity(curScholarTags[j], tkde[k]);
          if (curSim > maxSim) maxSim = curSim;
          if (k == 99) overallSimilarity.push(maxSim);
        }
      }
      //similarity algorithm 2 : Levenshtein simlarity >=0.8 will be set as 1, otherwise 0
      /*
      for (var j in curScholarTags) {
        var maxSim = 0;
        for (var k in tkde) {
          var curSim = similarity(curScholarTags[j], tkde[k]);
          if (curSim < 0.8) curSim = 0;
          else {
            curSim = 1
            overallSimilarity.push(curSim);
            break;
          }
          if (k == 99) {
            overallSimilarity.push(curSim);
          }
        }
      }
      */
      //cal av and sum
      var sumSim = 0;
      for (var j in overallSimilarity) {
        sumSim += overallSimilarity[j];
      }
      var averageSim = sumSim / overallSimilarity.length;
      url = "https://apiv2.aminer.cn/magic";
      var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyLXZTT05LV0VzelBjVTY0QzlVTnJzdk9cL1ZQYndteFNBUTVMNkNnSmJOcGZNZFhSYkNEZURuSUFRcWRcL3poemhlTkZXSWIrZGJMTDZwOFV1cVwvdXpMc0pxbUtjY0t6YkdvK0ZqNzlKMEI5eHc9PSIsInVpZCI6IjU0ZjUxMTJlNDVjZTFiYzZkNTYzYjhkOSIsInNyYyI6ImFtaW5lciIsInJvbGVzIjpbInJvb3QiLCJyb3N0ZXJfZWRpdG9yIiwidGVzdHJvbGUiXSwiaXNzIjoiYXBpLmFtaW5lci5vcmciLCJleHAiOjE1NjcwNTk0NzcsImlhdCI6MTU2NDQ2NzQ3NywianRpIjoiZjc3YzczMDRjMzVhYWNiOTRiYjI1NDQwM2UzMjg3MzZiZDE2YzA4YTBjNjkzZjI1NGI0OTBkY2I0NGEzZmU4MjdjNTMwMDdkZWU3ZDdkYTRkYzAyODYwNDk3NmY1MjcxNWM4OGYxMDMxMjkyZWNmOGRiMzFhODI0MDIwNzFmNGUyM2UzNjFiMmEzMzQzOGZiNmRiN2FmODlmNTEyYjlhNjQ5ODlhY2QxYjc2MDRiZDY1Mjc2YmYwNTA5ZDY1ZmJhNTFlY2QxNjEyMGJmODYyMGQ2NzRmZjFlN2I3OTVhODM4ZjMwMzg2M2EyODNlN2MzNjc4N2QyMDY2YjM5MTViMyIsImVtYWlsIjoiaGRfeWFuZ3ltQHNpbmEuY29tIn0.9FNPSDdHOZG9Ek8v2M2yxT1bdoiwKU_FvbYi_UGZSbc";
      if (averageSim >= 0.6) {
        var id = curScholar.id;
        //add to candidate. roster id is "5d42844e7390bff0dbf05b14"
        $.ajax({
          url: url,
          type: "POST",
          headers: {
            "Authorization": token
          },
          data: JSON.stringify([{
            "action": "person_eb.alter",
            "parameters": {
              "opts": [{
                "aid": id,
                "eid": "5d42844e7390bff0dbf05b14",
                "opt": "add"
              }]
            }
          }]),
          success: function (data) {
            //console.log(data);
          }
        })
        var tagsstr = "";
        for (var j in curScholar.tags) {
          tagsstr += curScholar.tags[j].t;
          tagsstr += ", ";
        }
        str = curScholar.id + "\n" + curScholar.name + "\n" + curScholar.aff.desc + "\n" + curScholar.indices.h_index + "\n" + tagsstr + "\n" + averageSim;
        //alert(str);
        //console.log(str);
        //add tracking (AMiner log)
        $.ajax({
          type: "POST",
          url: url,
          headers: {
            "Authorization": token
          },
          data: JSON.stringify([{
            "action": "tracking.Track",
            "parameters": {
              "data": [{
                "type": "ReviewerRec",
                "target_type": "TKDE Add to Candidate",
                "payload": str
              }]
            }
          }]),
          //success: function(data){console.log(data);}
        })
      }
    }
  })
}
//3.0.5

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
  //3.0.5
  reviewerAffiliation = [];
  //3.0.5
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

      //3.0.5 get reviewer affiliation
      //note: Because "reviewerlist" will be sent to Aminer, for now we don't add affiliation to reviewer's property.
      //for list[i+1], the content may be affiliation, orcid or status. in the former 2 cases, the innerHTML end with <br>
      var tmpText = list[i + 1].innerHTML;
      if (tmpText.match("orcid") == null && tmpText.match("<br>") != null) {
        tmpText = tmpText.replace("<br>", "");
        reviewerAffiliation.push(tmpText);
        //alert(tmpText); //debug
      } else {
        reviewerAffiliation.push("");
      }
      //3.0.5

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
    //3.0.5 add scholar when all data got
    addOneScholarReviewerRoster(authorlist[id].name, authorlist[id].affiliation, authorlist[id].email);
    //3.0.5
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
    //3.0.5 add scholar when all data got
    addOneScholarReviewerRoster(reviewerlist[id].name, reviewerAffiliation[id], reviewerlist[id].email);
    //3.0.5
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

function extractKeywords(){
  if (sessionStorage.abstract == null)
    return;
  sessionStorage.removeItem("extractedKeywords");

  function saveKeywords(XMLHttpRequest, textStatus) {
    terms = XMLHttpRequest.responseJSON.terms;
    keywords = [];
    for (var i in terms){
      keywords.push(terms[i].t);
    }
    if (sessionStorage.extractedKeywords == null){
      sessionStorage.extractedKeywords = keywords.join(", ");
    }
    else{
      saved = sessionStorage.extractedKeywords.split(", ");
      length = saved.length;
      for (var i in keywords){
        if (saved.indexOf(keywords[i]) == -1){
          if (length >= 5)
            saved.splice(length+i, 0, keywords[i])
          else
            saved.splice(i, 0, keywords[i])
        }
      }
      sessionStorage.extractedKeywords = saved.join(", ");
    }
  }

  var url = "https://loki.aminer.org/api/te";
  var data = {};
  data.s = sessionStorage.title + sessionStorage.abstract;
  data.t = 2;
  data.n = 5;

  $.ajax({
    type : "POST",
    url : url,
    data : $.toJSON(data),
    contentType : "application/json",
    complete : saveKeywords
  });
/*
  data.s = sessionStorage.abstract;
  data.t = 2;
  data.n = 4;
  $.ajax({
    type : "POST",
    url : url,
    data : $.toJSON(data),
    contentType : "application/json",
    complete : saveKeywords
  });
*/
}


