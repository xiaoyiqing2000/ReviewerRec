(function ($) {
    "use strict";




})(jQuery);
token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyLXZTT05LV0VzelBjVTY0QzlVTnJzdk9cL1ZQYndteFNBUTVMNkNnSmJOcGZNZFhSYkNEZURuSUFRcWRcL3poemhlTkZXSWIrZGJMTDZwOFV1cVwvdXpMc0pxbUtjY0t6YkdvK0ZqNzlKMEI5eHc9PSIsInVpZCI6IjU0ZjUxMTJlNDVjZTFiYzZkNTYzYjhkOSIsInNyYyI6ImFtaW5lciIsInJvbGVzIjpbInJvb3QiLCJyb3N0ZXJfZWRpdG9yIiwidGVzdHJvbGUiXSwiaXNzIjoiYXBpLmFtaW5lci5vcmciLCJleHAiOjE1NjcwNTk0NzcsImlhdCI6MTU2NDQ2NzQ3NywianRpIjoiZjc3YzczMDRjMzVhYWNiOTRiYjI1NDQwM2UzMjg3MzZiZDE2YzA4YTBjNjkzZjI1NGI0OTBkY2I0NGEzZmU4MjdjNTMwMDdkZWU3ZDdkYTRkYzAyODYwNDk3NmY1MjcxNWM4OGYxMDMxMjkyZWNmOGRiMzFhODI0MDIwNzFmNGUyM2UzNjFiMmEzMzQzOGZiNmRiN2FmODlmNTEyYjlhNjQ5ODlhY2QxYjc2MDRiZDY1Mjc2YmYwNTA5ZDY1ZmJhNTFlY2QxNjEyMGJmODYyMGQ2NzRmZjFlN2I3OTVhODM4ZjMwMzg2M2EyODNlN2MzNjc4N2QyMDY2YjM5MTViMyIsImVtYWlsIjoiaGRfeWFuZ3ltQHNpbmEuY29tIn0.9FNPSDdHOZG9Ek8v2M2yxT1bdoiwKU_FvbYi_UGZSbc";
candidateRosterID = "5d42844e7390bff0dbf05b14";

window.onload = function () {
    turnPage();
}

function addCandidatesToReviewer(row) {
    var url = "https://apiv2.aminer.cn/magic";
    var curname = document.getElementById("row" + row + "Name").innerHTML;
    var con = confirm("Add " + curname + " to TKDE Reviewer Roster?")
    if (con) {
        var curID = document.getElementById("row" + row + "ID").innerHTML;
        //add to reviewer
        $.ajax({
            type: "PUT",
            url: "https://api.aminer.cn/api/roster/56f1750f76d9110ef18db5fe/a",
            headers: {
                "Authorization": token
            },
            data: JSON.stringify({
                "aids": [curID]
            }),
            contentType: "application/json",
            success: function (data) {
                alert("Added");
                //console.log(data);
            }
        })
        //delete from candidates
        $.ajax({
            url: url,
            type: "POST",
            headers: {
                "Authorization": token
            },
            data: JSON.stringify(
                [{
                    "action": "person_eb.alter",
                    "parameters": {
                        "opts": [{
                            "aid": curID,
                            "eid": candidateRosterID,
                            "opt": "remove"
                        }]
                    }
                }]
            ),
        })
        //add tracking (AMiner log)
        var curName = document.getElementById("row" + row + "Name").innerHTML;
        var curAff = document.getElementById("row" + row + "Affiliation").innerHTML;
        var curHindex = document.getElementById("row" + row + "h-index").innerHTML;
        var curKeywords = document.getElementById("row" + row + "Keywords").innerHTML;
        str = curID + "\n" + curName + "\n" + curAff + "\n" + curHindex + "\n" + curKeywords;
        $.ajax({
            type: "POST",
            url: "https://apiv2.aminer.cn/magic",
            headers: {
                "Authorization": token
            },
            data: JSON.stringify([{
                "action": "tracking.Track",
                "parameters": {
                    "data": [{
                        "type": "ReviewerRec",
                        "target_type": "TKDE Add Reviewer from Candidate",
                        "payload": str
                    }]
                }
            }])
        })
    }
}

function deleteCandidates(row) {
    //delete
    var curname = document.getElementById("row" + row + "Name").innerHTML;
    var con = confirm("Delete " + curname + " from TKDE Reviewer Candidates Roster?")
    if (con) {
        var url = "https://apiv2.aminer.cn/magic";
        var curID = document.getElementById("row" + row + "ID").innerHTML;
        $.ajax({
            url: url,
            type: "POST",
            headers: {
                "Authorization": token
            },
            data: JSON.stringify(
                [{
                    "action": "person_eb.alter",
                    "parameters": {
                        "opts": [{
                            "aid": curID,
                            "eid": candidateRosterID,
                            "opt": "remove"
                        }]
                    }
                }]
            ),
            success: function () {
                alert("Deleted");
            }
        })
    }
    //add tracking (AMiner log)
    var curName = document.getElementById("row" + row + "Name").innerHTML;
    var curAff = document.getElementById("row" + row + "Affiliation").innerHTML;
    var curHindex = document.getElementById("row" + row + "h-index").innerHTML;
    var curKeywords = document.getElementById("row" + row + "Keywords").innerHTML;
    str = curID + "\n" + curName + "\n" + curAff + "\n" + curHindex + "\n" + curKeywords;
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
                    "target_type": "TKDE Delete Candidate",
                    "payload": str
                }]
            }
        }]),
        //success: function(data){console.log(data);}
    })
}

function turnPage() {
    var tar = document.getElementById("target page").value;
    if (isNaN(tar) || tar == "") tar = 1;
    $("td").hide();
    var url = "https://apiv2.aminer.cn/magic";
    $.ajax({
        url: url,
        type: "POST",
        headers: {
            "Authorization": token
        },
        data: JSON.stringify([{
            "action": "search.search",
            "parameters": {
                "searchType": "ToBPerson",
                "offset": 10 * (tar - 1),
                "size": 10,
                "aggregation": [
                    "gender",
                    "h_index",
                    "nation",
                    "lang"
                ],
                "filters": {
                    "dims": {
                        "eb": [
                            candidateRosterID
                        ]
                    }
                },
                "sorts": [
                    "!name_zh_sorted"
                ]
            },
            "schema": {
                "person": [
                    "id",
                    "name",
                    "title",
                    "name_zh",
                    "avatar",
                    "tags",
                    {
                        "profile": [
                            "position",
                            "position_zh",
                            "affiliation",
                            "affiliation_zh",
                            "org",
                            "org_zh"
                        ]
                    },
                    {
                        "indices": [
                            "hindex",
                            "gindex",
                            "pubs",
                            "citations",
                            "newStar",
                            "risingStar",
                            "activity",
                            "diversity",
                            "sociability"
                        ]
                    },
                    "tags_translated_zh"
                ]
            }
        }]),
        success: function (data) {
            for (var i = 1; i < 11; i++) {
                //if less than 10 in the page try
                try {
                    var curRow = "row" + i;
                    var curCandidate = data.data[0].items[i - 1];
                    document.getElementById(curRow + "Name").innerHTML = curCandidate.name;
                    document.getElementById(curRow + "Affiliation").innerHTML = curCandidate.profile.affiliation;
                    document.getElementById(curRow + "h-index").innerHTML = curCandidate.indices.hindex + "";
                    document.getElementById(curRow + "ID").innerHTML = curCandidate.id;
                    var tagsStr = "";
                    for (var j in curCandidate.tags) {
                        if (j > 9) break;
                        tagsStr += curCandidate.tags[j] + ", ";
                    }
                    tagsStr = tagsStr.substr(0, tagsStr.length - 2);
                    document.getElementById(curRow + "Keywords").innerHTML = tagsStr;
                } catch {
                    document.getElementById(curRow + "Name").innerHTML = "No data";
                    document.getElementById(curRow + "Affiliation").innerHTML = "No data";
                    document.getElementById(curRow + "h-index").innerHTML = "No data";
                    document.getElementById(curRow + "Keywords").innerHTML = "No data";
                    document.getElementById(curRow + "ID").innerHTML = "No data";
                }
                document.getElementById("curpage").innerHTML = "Currently at page " + tar + ".";
                $("td").show();
            }
        }
    })
}