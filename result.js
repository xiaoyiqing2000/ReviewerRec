chrome.runtime.onMessage.addListener(function (info){
  if (info[0] == "type1") {
    words = info[1].split(",");
    for (var i in words) {
      //alert(words[i]);
      url = "http://arnetminer.org/services/search-expert?q="+words[i]+"&u=thomas0809&start=0&num=5&outputjs=true&varname=res";
      req = new XMLHttpRequest();
      req.open("GET", url, false);
      req.send(null);
      x = JSON.parse(req.responseText).Results;
      //alert(x.Results[0].Name);
      for (var j in x) {
        row = document.createElement('tr');
        col = document.createElement('td');
        row.appendChild(col);
        
        col = document.createElement('td');
        img = document.createElement('img');
        img.src = x[j].PictureUrl;
        img.width = 100;
        img.height = 125;
        col.appendChild(img);
        row.appendChild(col);
        
        col = document.createElement('td'); col.width = 150;
        txt = document.createTextNode(x[j].Name);
        col.appendChild(txt);
        row.appendChild(col);
        
        //s = new Set();
        //s.add('Phone'); s.add('Fax'); s.add('Email'); s.add('Homepage');
        //s.add('Position'); s.add('Affiliation'); s.add('Address');
        col = document.createElement('td'); col.width = 450;
        txt = document.createTextNode('Position: ' + x[j].Position);
        col.appendChild(txt); col.appendChild(document.createElement('br'));
        txt = document.createTextNode('Affiliation: ' + x[j].Affiliation);
        col.appendChild(txt); col.appendChild(document.createElement('br'));
        txt = document.createTextNode('Phone: ' + x[j].Phone);
        col.appendChild(txt); col.appendChild(document.createElement('br'));
        txt = document.createTextNode('Fax: ' + x[j].Fax);
        col.appendChild(txt); col.appendChild(document.createElement('br'));
        txt = document.createTextNode('Email: ');
        col.appendChild(txt);
        lnk = document.createElement('a');
        lnk.href = 'mailto:' + x[j].Email;
        lnk.appendChild(document.createTextNode(x[j].Email));
        col.appendChild(lnk);
        col.appendChild(document.createElement('br'));
        txt = document.createTextNode('Homepage:  ');
        col.appendChild(txt);
        lnk = document.createElement('a');
        lnk.href = x[j].Homepage; lnk.target = "_blank";
        lnk.appendChild(document.createTextNode(x[j].Homepage));
        col.appendChild(lnk);
        col.appendChild(document.createElement('br'));
        row.appendChild(col);
        
        /*col = document.createElement('td');
        for (var k in x[j]) {
          txt = document.createTextNode(k + ': ' + x[j][k]);
          col.appendChild(txt);
          col.appendChild(document.createElement('br'));
        }
        row.appendChild(col);*/
        
        col = document.createElement('td'); col.width = 450;
        txt = document.createTextNode('Interests' + ': ' + x[j].Interests);
        col.appendChild(txt); col.appendChild(document.createElement('br'));
        txt = document.createTextNode('Papers: ' + x[j].PubCount);
        col.appendChild(txt); col.appendChild(document.createElement('br'));
        txt = document.createTextNode('Citation: ' + x[j].CitationNum);
        col.appendChild(txt); col.appendChild(document.createElement('br'));
        txt = document.createTextNode('H-index: ' + x[j].Hindex + ', ');
        col.appendChild(txt); //col.appendChild(document.createElement('br'));
        txt = document.createTextNode('G-index: ' + x[j].Gindex);
        col.appendChild(txt); col.appendChild(document.createElement('br'));
        txt = document.createTextNode('Activity: ' + x[j].Activity.toFixed(2) + ', ');
        col.appendChild(txt); //col.appendChild(document.createElement('br'));
        txt = document.createTextNode('Diversity: ' + x[j].Diversity.toFixed(2) + ', ');
        col.appendChild(txt); //col.appendChild(document.createElement('br'));
        txt = document.createTextNode('Sociability: ' + x[j].Sociability.toFixed(2));
        col.appendChild(txt); //col.appendChild(document.createElement('br'));
        row.appendChild(col);
        
        document.getElementById('table').appendChild(row);
      }
    }
  }
});