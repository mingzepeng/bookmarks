(function () {


	// body...
	var $ = document.querySelector.bind(document)
	var $$ = document.querySelectorAll.bind(document)
	var $addBtn = $('#add-reading');
	var $finishBtn = $('#finish-reading');
	$('#remove').addEventListener('click',function () {
		chrome.tabs.getSelected(function (tab) {
			if (tab) {
				var url = tab.url
				markService.remove(url)
			}else{
				alert('no tab')
			}
			window.close();
		})
	});
	$('#remove-all').addEventListener('click',function () {
		markService.removeAll()
	});

	$finishBtn.addEventListener('click',function () {
		
		chrome.tabs.getSelected(function (tab) {
			if (tab) {
				var url = tab.url
				markService.finish(url)
			}else{
				alert('no tab')
			}
			window.close();
		})
	});
	$addBtn.addEventListener('click',function () {
		chrome.tabs.getSelected(function (tab) {
			if (tab) {
				var url = tab.url
				var title = tab.title
				markService.add(url,title)
			}else{
				alert('no tab')
			}
			window.close();
		})
	});

	chrome.tabs.getSelected(function (tab) {
		if (tab) {
			var url = tab.url
			var mark = markService.get(url)
			if (mark) {
				$addBtn.disabled = true
			}
			// var hasMark = mark.has(url)
			// var isFinish = mark.isFinish(url)
			if (!(mark && mark.isReading())) {
				$finishBtn.disabled = true
			}
		}else{
			alert('no tab')
		}
	})
})();