var workingEl, workingElId = "copy-div";
var casePageUrlRe = /^(.+\.fogbugz\.com\/default\.asp\?\d+)/;

$(function() {
    workingEl = $("#" + workingElId);
});

function copyLink(link) {
    console.log("copyLink()");
    // Add <a> tag to workingEl
    var el = $("<a />").attr("href", link.url).text(link.title);
    workingEl.empty();
    workingEl.append(el);

    // select the created element
    var range = document.createRange();
    var node = document.getElementById(workingElId);
    range.selectNode(node);
    window.getSelection().addRange(range);

    // And copy it!
    document.execCommand("Copy", false, null);
}

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log(msg);
    if (msg.command == "copyLink") {
	copyLink(msg.link);
    }
    sendResponse();
});

chrome.tabs.onUpdated.addListener(function(id, changeInfo, tab) {
    if (casePageUrlRe.test(tab.url)) {
	chrome.pageAction.show(id);
    }
});
