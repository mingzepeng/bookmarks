(function () {


	// body...
	var $ = document.querySelector.bind(document)
	var $$ = document.querySelectorAll.bind(document)
	var $addBtn = $('#add-reading');
	var $finishBtn = $('#finish-reading');
	var $list = $('#list')

	function generateList(marks) {
		// var html = []
		if (marks) {
			var html = marks
				.filter(function(mark){
					return mark.isReading()
				})
				.map(function (mark) {
					var leftDays = mark.getLeftDays()
					var className = ''
					if (leftDays <= 5) {
						className = 'danger'
					}
					return '<li><a class="'+className+'" title="'+mark.title+'" target="_blank" href="'+mark.url+'">('+ mark.getLeftDays() + ')' + mark.title +'</a></li>'
				})
				.join('')
			$list.innerHTML = html
		}

	}

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

	$('#remove').addEventListener('click',function () {
		chrome.tabs.getSelected(function (tab) {
			if (tab) {
				var url = tab.url
				markService.remove(url)
				setBadge()
			}else{
				alert('no tab')
			}
			window.close();
		})
	});
	$('#remove-all').addEventListener('click',function () {
		markService.removeAll();
		setBadge()
		window.close();
	});

	$finishBtn.addEventListener('click',function () {
		
		chrome.tabs.getSelected(function (tab) {
			if (tab) {
				var url = tab.url
				markService.finish(url)
				setBadge()
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
				setBadge()
			}else{
				alert('no tab')
			}
			window.close();
		})
	});
	if (typeof chrome !== 'undefined' && chrome.tabs) {
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
	}
	var marks = markService.getAllReading()
	generateList(marks)
	setBadge()
})();