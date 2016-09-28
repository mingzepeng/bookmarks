function setBadge() {
	// var marks = markService.getAllReading()
	var mark = markService.getOldestMark()
	var text = ''
	var bgColor = [100, 200, 255, 250]
	if (mark) {
		var text = mark.getLeftDays()
		// var bgColor = null
		if (text <= 5) {
			bgColor = [255,80, 0, 250]
		}
	}
	chrome.browserAction.setBadgeText({text:text + ''});
	chrome.browserAction.setBadgeBackgroundColor({color:bgColor});
}
setBadge()