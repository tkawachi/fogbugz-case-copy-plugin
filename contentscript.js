var casePageUrlRe = /^(.+\.fogbugz\.com\/default\.asp\?\d+)/;
var isMac = navigator.userAgent.indexOf('Mac') >= 0;
var isWin = navigator.userAgent.indexOf('Win') >= 0;

function copyFromPage(sendResponse) {
    var m = casePageUrlRe.exec(document.location.href);
    if (m) {
	chrome.extension.sendMessage({
	    command: "copyLink",
	    link: {
		url: m[1],
		title: $("title").text()
	    }
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
	if (e.keyCode == "C".charCodeAt(0) &&
	    ((isMac && e.metaKey) || (isWin && e.ctrlKey)) &&
	    (selType == "None" || selType == "Caret")
	   ) {
	    // Cmd-c or Ctrl-c pressed without selection
	    copyFromPage(function(){});
	}
    };
});
