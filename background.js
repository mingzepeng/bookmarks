// chrome.browserAction.setBadgeText({text:'text'});

var marks = markService.getAllReading()
if (marks && marks.length > 0) {
	var text = marks.length + ''
	var bgColor = [0, 255, 255, 250]
	chrome.browserAction.setBadgeText({text:text});
	chrome.browserAction.setBadgeBackgroundColor({color:bgColor});
}

// chrome.tabs.getSelected(function (tab) {
// 	// alert(tab)
// 	if (tab) {
// 		var url = tab.url
// 		url = 'chrome://extensions/?id=jhegggkblehkpemjfnegfklimmcbkdba'
// 		var mark = markService.get(url)
// 		var text = null
// 		var bgColor = null
// 		alert(url)
// 		if (mark && mark.isReading()) {
// 			text =  mark.getLeftDays()
// 		}
// 		alert(text)
// 		if (text != null) {
// 			if (text <= 5) {
// 				bgColor = [255, 255, 0, 250]
// 			}else{
// 				bgColor = [0, 255, 255, 250]
// 			}
// 			chrome.browserAction.setBadgeText({text:text+''});
// 			chrome.browserAction.setBadgeBackgroundColor({color:bgColor});
// 		}
// 	}
// })