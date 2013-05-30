var casePageUrlRe = /^(.+\.fogbugz\.com\/default\.asp\?\d+)/;

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    console.log(msg);
    if (msg.command == "copyFromPage") {
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
});
