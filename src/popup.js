(function() {
    document.addEventListener('DOMContentLoaded', function () {
	var console = chrome.extension.getBackgroundPage().console;

	chrome.tabs.getSelected(null, function(tab) {
	    chrome.tabs.sendMessage(
		tab.id,
		{command: "copyFromPage"},
		function(resp) {
		    $("#result").text(resp.message);
		});
	});
    });

})();
