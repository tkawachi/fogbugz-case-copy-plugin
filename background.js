var workingEl, workingElId = "copy-div";

$(function() {
    workingEl = $("#" + workingElId);
});

function createA(link) {
   return $("<a />").attr("href", link.url).text(link.title);
 }

function copyEl(jQueryEl) {
    workingEl.empty();
    workingEl.append(jQueryEl);

    // select the created element
    var range = document.createRange();
    var node = document.getElementById(workingElId);
    range.selectNode(node);
    window.getSelection().addRange(range);

    // And copy it!
    document.execCommand("Copy", false, null);
}

function copyLink(link) {
    console.log("copyLink()", link);
    copyEl(createA(link));
}

function copyLinks(links) {
    console.log("copyLinks()", links);
    var ul = $("<ul />");
    for (var i = 0; i < links.length; i++) {
	var link = links[i];
	var li = $("<li />")
	li.append(createA(link))
	ul.append(li)
    }
    copyEl(ul);
}

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log(msg);
    if (msg.command == "copyLink") {
	copyLink(msg.link);
    } else if (msg.command == "copyLinks") {
	copyLinks(msg.links);
    }
    sendResponse();
});

chrome.tabs.onUpdated.addListener(function(id, changeInfo, tab) {
    if (casePageUrlRe.test(tab.url) || listPageUrlRe.test(tab.url)) {
	chrome.pageAction.show(id);
    }
});
