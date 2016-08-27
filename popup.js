var results = null
chrome.bookmarks.getTree(function (bookmarks) {
	results = bookmarks.map(function (item) {
		return item.title
	})
	document.body.innerHTML = results.join('<br />')
})
