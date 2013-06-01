var listPageSel = "input:checked[type=checkbox][name=ixBulkBug]";

var isMac = navigator.userAgent.indexOf('Mac') >= 0;
var isWin = navigator.userAgent.indexOf('Win') >= 0;

function copyFromPage(sendResponse) {
    if (casePageUrlRe.exec(document.location.href)) {
	var title = $("title").text().replace(" - FogBugz", "");
	chrome.extension.sendMessage({
	    command: "copyLink",
	    link: {
		url: RegExp.$1,
		title: title
	    }
	}, function(resp) {
	    sendResponse({message: "Copied!"});
	});
    } else if (listPageUrlRe.exec(document.location.href) &&
	       $(listPageSel).size() > 0) {
	var urlBase = RegExp.$1;
	var links = $(listPageSel).map(function () {
	    var bugId = $(this).val();
	    var title = $(this).closest("tr").find(".title.uvb,.title.vb").text();
	    return {
		url: urlBase + "/default.asp?" +  bugId,
		title: bugId + ": " + title
	    };
	}).get();

	chrome.extension.sendMessage({
	    command: "copyLinks",
	    links: links
	}, function(resp) {
	    sendResponse({message: "Copied!"});
	});
	
    } else {
	sendResponse({message: "None copied"});
    }
    return true;
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
//    console.log(msg);
    if (msg.command == "copyFromPage") {
	return copyFromPage(sendResponse);
    }
});

$(function() {
    document.onkeydown = function (e) {
	var selType = window.getSelection().type;
	if (
	    e.keyCode == "C".charCodeAt(0) &&
		((isMac && e.metaKey) || (!isMac && e.ctrlKey)) &&
		(selType == "None" || selType == "Caret")
	) {
	    // Cmd-c or Ctrl-c pressed without selection
	    copyFromPage(function(){});
	}
    };
});
