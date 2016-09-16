// chrome.browserAction.setBadgeText({text:'text'});
chrome.tabs.getSelected(function (tab) {
	
	if (tab) {
		var url = tab.url
		var mark = markService.get(url)
		var text = null
		var bgColor = null
		alert(text)
		if (mark && mark.isReading()) {
			text =  mark.getLeftDays()
		}
		alert(text)
		if (text <= 5) {
			bgColor = [255, 0, 0, 250]
		}
		if (text) {
			chrome.browserAction.setBadgeText({text:text+''});
		}
		if (bgColor) {
			chrome.browserAction.setBadgeBackgroundColor({color:bgColor});
		}
	}
})