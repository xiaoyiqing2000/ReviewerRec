
url = window.location.href;
ismanuscript = false;
if (url.match("manuscriptcentral.com") != null)
  ismanuscript = true;

isreviewing = false;
x = document.getElementsByClassName("redesigndetailsontext")[0];
if (x != null)
  isreviewing = true;

isfirsttime = true;
if (window.sessionStorage.title != null)
  isfirsttime = false;

txt = $.ajax({url:chrome.extension.getURL("scis.txt"), async : false}).responseText;
scis = txt.split('\r\n');

if (document.getElementById("side") == null){
  if (ismanuscript && !isreviewing && window.sessionStorage.title != null){
    window.sessionStorage.show = undefined;
  }
  createUI((window.sessionStorage.show == "true"));
}
if (window.sessionStorage.show == "true"){
  $("#side").show();
}

if (ismanuscript) {
  if (!isreviewing) {
    chrome.runtime.sendMessage("not");
    window.sessionStorage.clear();
  } else {
    chrome.runtime.sendMessage("ok");
    if (window.sessionStorage.keywords != null){
      document.getElementById('keywords').value = window.sessionStorage.keywords;
    } else {
      analyze();
    }
    if (window.sessionStorage.explist != null){
      explist = JSON.parse(window.sessionStorage.explist);
      createRes();
      if (window.sessionStorage.scroll != null){
        document.getElementById('result').scrollTop = Number(window.sessionStorage.scroll);
      }
    }
  }
}


//---------------------------------
// part 1 :   createUI
//---------------------------------

function createUI(show) {

  side = document.createElement('div');
  side.id = "side";
  if (!show) {
    $(side).hide();
  }

  window.addEventListener("scroll", setSide);
  window.addEventListener("resize", setSide);

  function setSide() {
    side.style.position = "absolute";
    //side.style.float = "right";
    toppos = window.pageYOffset + 10;
    if (toppos < 160 && ismanuscript) { toppos = 160; }
    side.style.top = String(toppos)+"px";
    x = document.getElementsByClassName("redesigndetailsontext")[0];
    if (x != null)
      side.style.left = String(getElementLeft(x) + x.offsetWidth + 20) + "px"; //"88%";
    side.style.right = "10px";
    side.style.width = "270px";
    div = document.getElementById("result");
    if (div != null) {
      div.style.height = String(document.documentElement.clientHeight - 290 ) + "px";
    }
    function getElementLeft(element){
      var actualLeft = element.offsetLeft;
      var current = element.offsetParent;
      while (current !== null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
      }
      return actualLeft;
    }
  }

  setSide();
  side.style.fontFamily = "Verdana";
  side.style.fontSize = "11px";


  table = document.createElement('table');
  table.cellPadding = "2"; table.cellSpacing = "0"; table.border = "1";
  table.style.width = "97%";
  table.style.borderCollapse = "collapse";
  table.style.backgroundColor = "#F8F8F8";
  row = document.createElement('tr');
  col = document.createElement('th');
  col.colSpan = "2"; col.align = "left"; col.style.background = "#FAE6BE";
  txt = document.createTextNode(" Reviewer Recommender");
  col.appendChild(txt);
  row.appendChild(col);
  img = document.createElement("img");
  img.src = chrome.extension.getURL("close.png");
  img.style.height = "16px"; img.align = "right";
  img.onclick = function(){
    $("#side").hide();
    window.sessionStorage.show = "false";
  }
  col.appendChild(img);
  row.appendChild(col);
  table.appendChild(row);

  qtb = document.createElement('table');
  qtb.cellSpacing = "1";

  row = document.createElement('tr'); $(row).hide();
  col = document.createElement('td');
  col.appendChild(document.createTextNode("Title"));
  row.appendChild(col);
  col = document.createElement('td');
  inp = document.createElement('input');
  inp.id = 'title'; inp.type = 'text'; inp.style.width = "170px";
  ///inp.value = info[1];
  col.appendChild(inp); row.appendChild(col); qtb.appendChild(row);

  row = document.createElement('tr'); $(row).hide();
  col = document.createElement('td');
  col.appendChild(document.createTextNode("Authors"));
  row.appendChild(col);
  col = document.createElement('td');
  inp = document.createElement('input');
  inp.id = 'authors'; inp.type = 'text'; inp.style.width = "170px";
  //inp.value = info[2];
  col.appendChild(inp); row.appendChild(col); qtb.appendChild(row);

  row = document.createElement('tr'); $(row).hide();
  col = document.createElement('td');
  col.appendChild(document.createTextNode("Abstract"));
  row.appendChild(col);
  col = document.createElement('td');
  inp = document.createElement('textarea');
  inp.id = 'abstract'; inp.type = 'text'; inp.style.width = "168px";
  inp.style.resize = "none";
  //inp.value = info[4];
  col.appendChild(inp); row.appendChild(col); qtb.appendChild(row);

  row = document.createElement('tr');
  col = document.createElement('td'); col.colSpan = "2";
  col.appendChild(document.createTextNode("Keywords (Seperated by \",\"):"));
  row.appendChild(col); qtb.appendChild(row);
  row = document.createElement('tr');
  col = document.createElement('td'); col.colSpan = "2";
  inp = document.createElement('textarea');
  if (isreviewing) { inp.value = "Analyzing..."; }
  inp.id = 'keywords'; inp.type = 'text';
  inp.onkeydown = function() { if (event.keyCode == 13) query(); };
  inp.style.width = "250px"; inp.style.height = "60px"; inp.style.resize = "none";
  col.appendChild(inp); row.appendChild(col); qtb.appendChild(row);

  row = document.createElement('tr');
  row.style.height = "24px";
  col = document.createElement('td'); col.colSpan = "2";
  col.appendChild(document.createTextNode("H-index:  "));
  form = document.createElement('form'); form.style.display = 'inline'; form.id = 'hindexform';
  inp1 = document.createElement('input'); inp1.type = 'checkbox'; inp1.id = 'hindex1'; inp1.style.margin = 0;
  form.appendChild(inp1); form.appendChild(document.createTextNode('<10 '));
  inp2 = document.createElement('input'); inp2.type = 'checkbox'; inp2.id = 'hindex2'; inp2.style.margin = 0;
  form.appendChild(inp2); form.appendChild(document.createTextNode('10~20 '));
  inp3 = document.createElement('input'); inp3.type = 'checkbox'; inp3.id = 'hindex3'; inp3.style.margin = 0;
  form.appendChild(inp3); form.appendChild(document.createTextNode('20~30 '));
  inp4 = document.createElement('input'); inp4.type = 'checkbox'; inp4.id = 'hindex4'; inp4.style.margin = 0;
  form.appendChild(inp4); form.appendChild(document.createTextNode('>30'));
  inp1.checked = true; inp2.checked = true;
  if (window.sessionStorage.inp1 != undefined) inp1.checked = (window.sessionStorage.inp1 == "true");
  if (window.sessionStorage.inp2 != undefined) inp2.checked = (window.sessionStorage.inp2 == "true");
  if (window.sessionStorage.inp3 != undefined) inp3.checked = (window.sessionStorage.inp3 == "true");
  if (window.sessionStorage.inp4 != undefined) inp4.checked = (window.sessionStorage.inp4 == "true");
  inp1.onclick = function() {
    if (inp1.checked) {
      if (inp4.checked) inp3.checked = true;
      if (inp3.checked) inp2.checked = true;
    }
  }
  inp2.onclick = function() {
    if (inp2.checked) {
      if (inp4.checked) inp3.checked = true;
    } else {
      if (inp3.checked) inp1.checked = false;
    }
  }
  inp3.onclick = function() {
    if (inp3.checked) {
      if (inp1.checked) inp2.checked = true;
    } else {
      if (inp2.checked) inp4.checked = false;
    }
  }
  inp4.onclick = function() {
    if (inp4.checked) {
      if (inp1.checked) inp2.checked = true;
      if (inp2.checked) inp3.checked = true;
    }
  };
  col.appendChild(form);
  //inp = document.createElement('input'); inp.id = 'hindex1'; inp.type = 'text'; inp.style.width = '25px';
  //col.appendChild(inp);
  //col.appendChild(document.createTextNode(" ~ "));
  //inp = document.createElement('input'); inp.id = 'hindex2'; inp.type = 'text'; inp.style.width = '25px';
  //col.appendChild(inp);
  row.appendChild(col); qtb.appendChild(row);

  row = document.createElement('tr');
  row.style.height = "24px";
  col = document.createElement('td'); col.colSpan = "2";
  col.appendChild(document.createTextNode("Location:  "));
  sel = document.createElement('select'); sel.id = 'location'; sel.style.width = "55px";
  opt = document.createElement("option"); opt.text = "All"; sel.add(opt, null);
  opt = document.createElement("option"); opt.text = "USA"; sel.add(opt, null);
  opt = document.createElement("option"); opt.text = "China"; sel.add(opt, null);
  opt = document.createElement("option"); opt.text = "Taiwan"; sel.add(opt, null);
  opt = document.createElement("option"); opt.text = "Japan"; sel.add(opt, null);
  opt = document.createElement("option"); opt.text = "Canada"; sel.add(opt, null);
  opt = document.createElement("option"); opt.text = "United Kingdom"; sel.add(opt, null);
  opt = document.createElement("option"); opt.text = "German"; sel.add(opt, null);
  col.appendChild(sel);
  col.appendChild(document.createTextNode("   Language:  "));
  sel = document.createElement('select'); sel.id = 'language'; sel.style.width = "55px";
  opt = document.createElement("option"); opt.text = "All"; sel.add(opt, null);
  opt = document.createElement("option"); opt.text = "English"; sel.add(opt, null);
  opt = document.createElement("option"); opt.text = "Chinese"; sel.add(opt, null);
  col.appendChild(sel);
  row.appendChild(col);
  qtb.appendChild(row);

  row = document.createElement('tr');
  col = document.createElement('td'); col.colSpan = "2";
  col.align = "center";
  p = document.createElement('span');
  $(p).text("Search by:");
  //col.appendChild(p);
  //col.align = "left";
  //col.appendChild(document.createElement('br'));
  sub = document.createElement("input");
  sub.type = "image"; sub.src = chrome.extension.getURL("search.png");
  sub.style.width = "150px";
  sub.style.marginTop = "4px"; sub.style.marginBottom = "4px"; //sub.style.marginRight = "4px";
  sub.align = "center"; sub.onclick = query;
  col.appendChild(sub);
  /*sub = document.createElement("input");
  sub.type = "image"; sub.src = chrome.extension.getURL("title.png");
  sub.style.width = "80px";
  sub.style.marginTop = "4px"; sub.style.marginBottom = "4px"; sub.style.marginRight = "4px";
  sub.align = "center"; sub.onclick = query;
  col.appendChild(sub);
  sub = document.createElement("input");
  sub.type = "image"; sub.src = chrome.extension.getURL("co-author.png");
  sub.style.width = "80px"; sub.style.marginTop = "4px"; sub.style.marginBottom = "4px";
  sub.align = "center"; sub.onclick = query;
  col.appendChild(sub);*/
  row.appendChild(col);
  qtb.appendChild(row);

  row = document.createElement('tr');
  col = document.createElement('td');
  col.appendChild(qtb);
  row.appendChild(col);
  table.appendChild(row);

  row = document.createElement('tr');
  col = document.createElement('th');
  col.colSpan = "2"; col.align = "left";
  col.style.background = "#FAE6BE";
  txt = document.createTextNode(" Result ");
  col.appendChild(txt);
  span = document.createElement('span');
  span.id = "resnum";
  span.style.fontWeight = "normal";
  col.appendChild(span);
  row.appendChild(col);
  table.appendChild(row);

  row = document.createElement('tr');
  col = document.createElement('td');
  col.id = "menu"; $(col).hide();
  inp = document.createElement('input');
  inp.type = "text"; inp.style.width = "130px"; inp.id = "searchname";
  inp.style.marginLeft = "1px"; inp.style.verticalAlign = "middle";
  inp.onkeydown = function() { if (event.keyCode == 13) searchNameAminer(); };
  col.appendChild(inp);
  inp = document.createElement("input");
  inp.type = "image"; inp.src = chrome.extension.getURL("search.gif"); inp.style.verticalAlign = "middle";
  // inp.onclick = searchName;
  inp.onclick = searchNameAminer;
  col.appendChild(inp);
  sel = document.createElement("select"); sel.id = "rankorder"; sel.onchange = changeOrder;
  sel.style.marginLeft = "10px"; sel.style.width = "85px"; sel.style.verticalAlign = "middle";
  opt = document.createElement("option"); opt.text = "Relevance"; sel.add(opt, null);
  opt = document.createElement("option"); opt.text = "H-index↑"; sel.add(opt, null);
  opt = document.createElement("option"); opt.text = "H-index↓"; sel.add(opt, null);
  //opt = document.createElement("option"); opt.text = "Nationality"; sel.add(opt, null);
  //opt = document.createElement("option"); opt.text = "Affiliation"; sel.add(opt, null);
  col.appendChild(sel);
  row.appendChild(col);
  row.style.borderBottomStyle = "hidden";
  table.appendChild(row);

  row = document.createElement('tr');
  col = document.createElement('td');
  div = document.createElement('div');
  div.id = "result";
  div.style.height = String(document.documentElement.offsetHeight - 300) + "px";
  div.style.overflow = "auto";
  div.style.overflowX = "hidden";
  img = document.createElement("img");
  img.id = "loading"; img.align = "center";
  img.src = chrome.extension.getURL("loading.gif");
  img.style.filter = "chroma(color=#ffffff)";
  img.style.display = "none";
  div.appendChild(img);
  rtb = document.createElement("table");
  rtb.id = "rtb"; rtb.style.width = "97%"; rtb.style.maxWidth = "97%"; rtb.style.wordWrap = "break-word";
  div.appendChild(rtb);
  par = document.createElement('div'); par.align = "center";
  more = document.createElement('a'); more.id = "more";
  img = document.createElement("img"); img.src = chrome.extension.getURL("viewmore.png");
  more.appendChild(img);
  more.onclick = showMore; more.style.display = "none"; more.style.cursor = "pointer";
  par.appendChild(more); div.appendChild(par);
  div.onscroll = function(){
    window.sessionStorage.scroll = div.scrollTop;
  }
  col.appendChild(div);
  row.appendChild(col);
  table.appendChild(row);

  row = document.createElement('tr');
  col = document.createElement('td')
  col.align = "right";
  col.appendChild(document.createTextNode('Powered by '));
  aminer = document.createElement('a');
  aminer.href = "http://arnetminer.org/"; aminer.target = "_blank";
  aminer.appendChild(document.createTextNode('AMiner'));
  col.appendChild(aminer);
  row.appendChild(col); table.appendChild(row);
  side.appendChild(table);

  document.body.appendChild(side);
  setSide();

}




//---------------------------------
// part 2 :  Query API
//---------------------------------

function query() {
  $('#loading').show();
  $('#more').hide();
  $('#menu').hide();
  document.getElementById('searchname').value = "";
  document.getElementById('rankorder').selectedIndex = 0;
  $('#rtb').empty();
  var words = document.getElementById("keywords").value.split(",");
  window.sessionStorage.keywords = document.getElementById("keywords").value;
  window.sessionStorage.displaynum = "20";
  window.sessionStorage.inp1 = document.getElementById("hindex1").checked;
  window.sessionStorage.inp2 = document.getElementById("hindex2").checked;
  window.sessionStorage.inp3 = document.getElementById("hindex3").checked;
  window.sessionStorage.inp4 = document.getElementById("hindex4").checked;
  wordlist = [];
  for (var i in words){
    if (words[i].length > 4){
      wordlist.push(words[i]); //alert(words[i]);
    }
  }
  wordlist = [];
  wordlist.push(words.join());
  getExpertList(wordlist);
  explist = [];
  expall = [];
}

function binScis(name) {
  name = name.replace(/[^a-zA-z]/g, '');
  var l = -1; var r = scis.length;
  while (l < r - 1) {
    var mid = Math.floor((l + r) / 2);
    if (scis[mid] <= name)
      l = mid;
    else
      r = mid;
  }
  if (l == -1) return false;
  return (scis[l] == name);
}

function checkScis(name) {
  if (binScis(name))
    return true;
  var a = name.split(" ");
  var b = a[a.length - 1];
  for (var i = 0; i < a.length - 1; i++)
    b = b + a[i];
  if (binScis(b))
    return true;
  return false;
}

function getExpertList(words) {
  lists = [];
  finished = 0;
  total = words.length;

  for (var i in words) {
    //alert(words[i]);
    lists.push([]);
    //var url = "https://api.aminer.org/api/search/people/multi?query="+words[i]+"&size=500";
    var url = "https://api.aminer.org/api/reviewer/search?query="+words[i]+"&size=100";
    ele = document.getElementById('hindexform').elements;
    h1 = 200; h2 = 0;
    if (ele[0].checked) { if (0 < h1)  h1 = 0;  if (10 > h2) h2 = 10; }
    if (ele[1].checked) { if (10 < h1) h1 = 10; if (20 > h2) h2 = 20; }
    if (ele[2].checked) { if (20 < h1) h1 = 20; if (30 > h2) h2 = 30; }
    if (ele[3].checked) { if (30 < h1) h1 = 30; h2 = 200; }
    if (h1 != 200 && h2 != 0)
      url = url + "&hindex1=" + h1 + "&hindex2=" + h2;
    if (document.getElementById('location').selectedIndex != 0) {
      x = document.getElementById('location');
      txt = x.options[x.selectedIndex].text;
      url = url + "&nation=" + txt;
    }
    if (document.getElementById('language').selectedIndex != 0) {
      x = document.getElementById('language');
      txt = x.options[x.selectedIndex].text;
      url = url + "&language=" + txt;
    }
    if (window.sessionStorage.paperid == null) {
      analyze();
    }
    url = url + "&venue=" + window.sessionStorage.paperid.split('-')[0];
    $.get(url, function(data, status){
      statechange(data);
    });
    //testNewAlgorithm();
    function testNewAlgorithm(){
      var url = "http://166.111.7.105:9005/api/reviewer/query"
      var data = {"query":words[i], "size":500, "hindex1":h1, "hindex2":h2}
      data.authors = JSON.parse(window.sessionStorage.authors)
      $.ajax({
        type : "POST",
        url : url,
        data : $.toJSON(data),
        contentType : "application/json"
      });
    }
  }
}

function statechange(strdata) {
  data = JSON.parse(strdata);
  //data = eval ("(" + strdata + ")");
  //alert(data);
  var i = finished;
  finished = finished + 1;
  lists.push([]);
  var res = data.results;
  for (var j in res) {
    if (res[j].affiliation != '' && res[j].affiliation != null
      && res[j].email != '' && res[j].email != null) {
      lists[i].push(res[j]);
    }
  }
  for (var j in res) {
    if (!(res[j].affiliation != '' && res[j].affiliation != null
      && res[j].email != '' && res[j].email != null)) {
      lists[i].push(res[j]);
    }
  }
  if (finished == total) {
  //alert(total);
    explist = [];
    expall = [];
    var maxlen = 0;
    for (var i = 0; i < total; i++)
      if (lists[i].length > maxlen)
        maxlen = lists[i].length;
    for (var j = 0; j < maxlen; j++)
      for (var i = 0; i < total; i++) {
        if (lists[i][j] != null ) {
          var expcheck = true;
          for (var k in expall)
            if (expall[k].id == lists[i][j].id){
              expcheck = false; break;
            }
          if (!expcheck) continue;
            expall.push(lists[i][j]);
        }
      }
    for (var i in expall)
      expall[i].myid = i;
    searchName();
  }
}

function searchName() {
  str = document.getElementById("searchname").value;
  explist = [];
  for (var i in expall) {
    if (expall[i].name.match(RegExp(str, 'i')) != null)
      explist.push(expall[i]);
  }
  changeOrder();
}


function searchNameAminer() {
  $('#loading').show();
  $('#more').hide();
  $('#menu').hide();
  $('#rtb').empty();
  str = document.getElementById("searchname").value;
  explist = [];
  var url = "https://api.aminer.org/api/reviewer/search?query="+str+"&size=100";
  // var url = "https://api.aminer.org/api/search/person?query=" + str + "&size=100";
  function formatData(data) {
    var formated = {}
    results = []
    for (var i in data.result){
      var person = data.result[i];
      var newperson = {}
      newperson.name = person.name;
      newperson.workload = 0;
      newperson.email = "";
      newperson.affiliation = person.contact.affiliation;
      newperson.h_index = person.indices.h_index;
      newperson.citation = person.indices.num_citation;
      newperson.id = person.id;
      newperson.rating = 6;
      newperson.name_zh = person.name_zh;
      newperson.papers = person.indices.num_pubs;
      newperson.interests = person.tags.join(',');
      newperson.relevance = 0;
      newperson.homepage = person.contact.homepage;
      newperson.position = person.contact.position;
      newperson.picture_url = person.avatar;
      results.push(newperson);
      // results.push(person);
    }
    // console.log(JSON.stringify(newperson));
    formated.results = results;
    return formated;
  }
  $.get(url, function(data, status){
      // var formated = formatData(data);
      // console.log(JSON.stringify(formated));
      data = JSON.parse(data);
      console.log(JSON.stringify(data));

      for (var i in data.results){
        explist.push(data.results[i]);
      }
      changeOrder();
    });
}


function changeOrder() {
  od = document.getElementById('rankorder').selectedIndex;
  if (od == 0)
    explist.sort(function(a,b) {
      if (Number(a.myid) < Number(b.myid)) return -1;
      if (Number(a.myid) > Number(b.myid)) return 1;
      return 0;
    });
  if (od == 1)
    explist.sort(function(a,b) {
      if (Number(a.h_index) < Number(b.h_index)) return -1;
      if (Number(a.h_index) > Number(b.h_index)) return 1;
      return 0;
    });
  if (od == 2)
    explist.sort(function(a,b) {
      if (Number(a.h_index) > Number(b.h_index)) return -1;
      if (Number(a.h_index) < Number(b.h_index)) return 1;
      return 0;
    });
  if (od == 3)
    explist.sort(function(a,b) {
      if (a.affiliation == null) return 1;
      if (b.affiliation == null) return -1;
      if (a.affiliation < b.affiliation) return -1;
      if (a.affiliation > b.affiliation) return 1;
      return 0;
    });
  $('#rtb').empty();
  createRes();
}

function createRes() {
  window.sessionStorage.explist = JSON.stringify(explist);
  var maxworkload = 10;
  for (var i in explist) {
    if (explist[i].workload != undefined && explist[i].workload > maxworkload)
      maxworkload = explist[i].workload;
  }

  for (var i in explist) {
    exptb = document.createElement('table');
    exptb.id = "exptb" + String(i);
    exptb.border = 0; exptb.cellPadding = 0;

    row = document.createElement('tr');

    col = document.createElement('td');
    col.style.width = "42px"; col.style.maxWidth = "42px";
    a = document.createElement("a");
    if (explist[i].homepage == "" || explist[i].homepage == null)
      a.href = "javascript:void(0);";
    else {
      a.href = explist[i].homepage;
      a.target = "_blank";
    }
    a.style.width = "inherit"; a.style.height = "inherit";
    img = document.createElement('img');
    img.src = explist[i].picture_url;
    if (explist[i].picture_url == "" || explist[i].picture_url == null)
      img.src = chrome.extension.getURL("default.jpg");
    img.style.width = "inherit"; img.style.height = "inherit";
    a.appendChild(img);
    col.appendChild(a); col.style.verticalAlign = "top";
    slt = document.createElement('input'); slt.id = "select"+String(i);
    slt.type = "image"; slt.value = i; slt.style.width = "43px";
    slt.src = chrome.extension.getURL("select.png");
    slt.onclick = function() {
      for (var j in explist){
        document.getElementById("select"+String(j)).src = chrome.extension.getURL("select.png");
      }
      document.getElementById("select"+String(this.value)).src = chrome.extension.getURL("selected.png");
      fillin(this.value);
      url = "https://api.aminer.org/api/reviewer/workload?id=" + explist[this.value].id;
      $.get(url);
    }
    col.appendChild(slt);
    col.style.verticalAlign = "top"; col.style.paddingBottom = "10px";
    row.appendChild(col);

    col = document.createElement('td');
    col.style.width = "100%"; col.style.maxWidth = "100%";
    a = document.createElement("a");
    a.href = "https://aminer.org/profile/"+explist[i].id;
    a.target = "_blank";
    txt = document.createElement('span');
    txt.style.fontSize = "14px"; txt.style.fontWeight = "bold"; txt.style.color = "black";
    txt.appendChild(document.createTextNode(explist[i].name));
    a.appendChild(txt);
    col.appendChild(a);
    if (checkScis(explist[i].name)) {
      img = document.createElement("img");
      img.src = chrome.extension.getURL("logo.jpg");
      img.style.width = "15px"; img.style.height = "15px";
      img.style.marginLeft = "3px";
      col.appendChild(img);
    }
    col.appendChild(document.createElement('br'));

    txt = document.createElement('span');
    txt.style.fontFamily = "times"; txt.style.color = "grey";
    if (explist[i].position != null && explist[i].position.length > 100) { explist[i].position = null; }
    txt.appendChild(document.createTextNode(' (' + explist[i].position + ', ' + explist[i].affiliation + ')'));
    if (explist[i].position != null && explist[i].position != ""
      && explist[i].affiliation != null && explist[i].affiliation != "") {
      col.appendChild(txt); col.appendChild(document.createElement('br'));
    }

    function addNameValue(name, value, breakline) {
      txt = document.createElement('span');
      txt.style.fontFamily = "arial"; txt.style.fontWeight = "700";
      txt.appendChild(document.createTextNode(name + ": "));
      col.appendChild(txt);
      txt = document.createElement('span'); txt.style.fontFamily = "arial";
      txt.appendChild(value);
      col.appendChild(txt);
      if (breakline) col.appendChild(document.createElement('br'));
    }

    addNameValue("H-index", document.createTextNode(explist[i].h_index), true);
    str = '';
    if (explist[i].interests != null) str += explist[i].interests.replace(/,/g, ", ");
    addNameValue("Expertise", document.createTextNode(str), true);
    a = document.createElement("a");
    a.href = "mailto:" + explist[i].email;
    a.style.wordBreak = "break-all";
    if (explist[i].email == null) explist[i].email = "unknown";
    a.appendChild(document.createTextNode(explist[i].email));
    addNameValue("E-mail", a, true);

    col.style.verticalAlign = "top";

    row.appendChild(col);
    col.style.paddingBottom = "4px";
    exptb.appendChild(row);

    row = document.createElement('tr');
    col = document.createElement('td');
    col.appendChild(document.createTextNode("Workload:"));
    col.style.fontFamily = "'Lucida Sans Unicode', 'Lucida Grande', sans-serif";
    //col.style.fontStyle = "italic";
    col.style.fontWeight = 600;
    row.appendChild(col);
    col = document.createElement('td');
    workload = document.createElement("progress");
    workload.style.width = "95%";
    var wl = explist[i].workload;
    if (wl == undefined) wl = 0;
    if (wl > 100) wl = 100;
    workload.max = maxworkload; workload.value = wl;
    col.appendChild(workload);
    row.appendChild(col);
    exptb.appendChild(row);

    row = document.createElement('tr');
    col = document.createElement('td');
    col.appendChild(document.createTextNode("Rating:"));
    col.style.fontFamily = "'Lucida Sans Unicode', 'Lucida Grande', sans-serif";
    //col.style.fontStyle = "italic";
    col.style.fontWeight = 600;
    row.appendChild(col);
    col = document.createElement('td');
    var rt = explist[i].rating;
    if (rt == undefined) rt = 6;
    for (var j = 1; j <= 5; j++) {
      img = document.createElement("img");
      if (j * 2 <= rt)
        img.src = chrome.extension.getURL("star_on.png");
      else
        img.src = chrome.extension.getURL("star_off.png");
      img.style.width = "15px";
      col.appendChild(img);
    }
    tbdown = document.createElement("input");
    tbdown.type = "image";
    tbdown.src = chrome.extension.getURL("thumb_down.png");
    tbdown.style.height = "15px"; tbdown.align = "right"; tbdown.style.marginRight = "10px";
    tbdown.value = explist[i].id;
    col.appendChild(tbdown);
    tbup = document.createElement("input");
    tbup.type = "image";
    tbup.src = chrome.extension.getURL("thumb_up.png");
    tbup.style.height = "15px"; tbup.align = "right"; tbup.style.marginRight = "10px";
    tbup.value = explist[i].id;
    col.appendChild(tbup);
    tbdown.onclick = function(){
      //this.disabled = true;
      url = "https://api.aminer.org/api/reviewer/rating?id=" + this.value + "&delta=-1";
      $.get(url);
    }
    tbup.onclick = function(){
      //this.disabled = true;
      url = "https://api.aminer.org/api/reviewer/rating?id=" + this.value + "&delta=1";
      $.get(url);
    }
    row.appendChild(col);
    exptb.appendChild(row);

    row = document.createElement("tr");
    col = document.createElement("td");
    col.colSpan = 2;
    col.appendChild(exptb);
    row.appendChild(col);
    col.style.paddingBottom = "14px";
    row.id = "exprow" + String(i);
    $(row).hide();

    document.getElementById('rtb').appendChild(row);

  }
  $('#loading').hide();
  $('#more').show();
  $('#menu').show();
  if (window.sessionStorage.displaynum == undefined){
    window.sessionStorage.displaynum = "20";
  }
  displaynum = Number(window.sessionStorage.displaynum);
  displayRes();
}

function displayRes() {
  for (var i in explist) {
    if (i >= displaynum) break;
    $("#exprow"+String(i)).show();
  }
  if (displaynum > explist.length)
    displaynum = explist.length;
  span = document.getElementById('resnum');
  span.innerHTML = " ("+String(displaynum)+" of "+String(explist.length)+" experts)";
}

function showMore() {
  //alert("more");
  displaynum = displaynum + 20;
  displayRes();
  window.sessionStorage.displaynum = String(displaynum);
}

function fillin(i) {
  //alert(i);
  var fstname = explist[i].name.split(' ')[0];
  document.getElementsByName("PERSON_FIRSTNAME")[0].value = fstname;
  var lstname = explist[i].name.split(' ').pop();
  document.getElementsByName("PERSON_LASTNAME")[0].value = lstname;
  var eadd = explist[i].email;
  if (eadd == null)
    eadd = "";
  document.getElementsByName("EMAIL_ADDRESS")[0].value = eadd;
}




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
    //resetField('MANUSCRIPT_DETAILS_OVERRIDE_TASK_TAG','');
    //resetDataAndNextPage('MANUSCRIPT_DETAILS_SHOW_TAB','Tdetails','ASSOCIATE_EDITOR_MANUSCRIPT_DETAILS');

    var inf = [].slice.apply(doc.getElementsByClassName("pagecontents"));

    flag = 0;
    txt = "";
    for (var i in inf) {
      var text = inf[i].innerHTML;
      if (text.match("Authors") != null) {
        flag = 1;
        authorlist = [];
        authorfinished = 0;
      }
      if (flag == 1 && text.match("Contact Author") != null) {
        info.push(txt); txt = "";
        flag = 0;
        window.sessionStorage.authors = JSON.stringify(authorlist);
      }
      if (text == "Title:")
        flag = 2;
      if (flag == 2 && text == "Manuscript ID:") {
        info.push(txt); txt = "";
        flag = 0;
      }
      if (flag == 3 && text.match(":") != null) {
        info.push(txt); txt = "";
        flag = 0;
      }
      if (text.match("Keyword") != null)
        flag = 3;
      if (flag == 0)
        continue;
      if (flag == 1) {
        if (text.match("<a href=.*>") == null || text.match("javascript:popWindow") == null)
          continue;
        str = text.replace(/[\s\S]*javascript\:popWindow\(\'/, "");
        str = str.replace(/'[\s\S]*/g, "");
        host = window.location.host;
        url = host + "/" + str;
        text = text.replace(/<a href=[^>]*>/, "");
        text = text.replace(/<(\s|\S)*$/, "");
        text = text.replace(',', '').trim();
        author = {};
        author.name = text;
        x = $($(inf[i]).parent()).get(0);
        x = $($(x).next()).get(0);
        x = $($(x).next()).get(0);
        x = $($(x).next()).get(0);
        author.affiliation = $.trim(x.getElementsByClassName("pagecontents")[0].textContent);
        authorlist.push(author);
        if (authorlist.length == 1) $.get(url, function(data, status){ getAuthorEmail(0, data); });
        if (authorlist.length == 2) $.get(url, function(data, status){ getAuthorEmail(1, data); });
        if (authorlist.length == 3) $.get(url, function(data, status){ getAuthorEmail(2, data); });
        if (authorlist.length == 4) $.get(url, function(data, status){ getAuthorEmail(3, data); });
        if (authorlist.length == 5) $.get(url, function(data, status){ getAuthorEmail(4, data); });
        if (authorlist.length == 6) $.get(url, function(data, status){ getAuthorEmail(5, data); });
        if (authorlist.length == 7) $.get(url, function(data, status){ getAuthorEmail(6, data); });
        if (authorlist.length == 8) $.get(url, function(data, status){ getAuthorEmail(7, data); });
        if (authorlist.length == 9) $.get(url, function(data, status){ getAuthorEmail(8, data); });
        if (authorlist.length == 10) $.get(url, function(data, status){ getAuthorEmail(9, data); });
        if (txt == "") {
          txt = text;
        } else {
          txt = txt + ", " + text;
        }
      }
      if (flag == 2) {
        if (text != "Title:")
          txt = txt + text;
      }
      if (flag == 3) {
        if (text != "Keywords:")
          txt = txt + text.replace(/<img[^>]*> /g, "");
      }
    }

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
    nwords = info[3].replace(/</g, '');
    nwords = nwords.replace(/&lt;/g, ',');
    nwords = nwords.replace(/;/g, ',');
    nwords = nwords.replace(/\S*\.\S*\s/g, ', ');
    nwords = nwords.replace(/\s\s/g, ' ');
    nwords = nwords.replace(/,\s,/g, ',');
    nwords = nwords.replace(/^,\s*/, '');
    //document.getElementById('keywords').value = nwords;
    //document.getElementById('abstract').value = info[4];
    if (window.sessionStorage.keywords == undefined){
      window.sessionStorage.title = info[1];
      window.sessionStorage.authorsname = info[2];
      window.sessionStorage.keywords = nwords;
      window.sessionStorage.abstract = info[4];
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
  window.sessionStorage.analyze = "true";
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


