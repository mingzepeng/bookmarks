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
		markService.removeAll();
		window.close();
	});

	$finishBtn.addEventListener('click',function () {
		
		chrome.tabs.getSelected(function (tab) {
			if (tab) {
				var url = tab.url
				markService.finish(url)

				
				var marks = markService.getAllReading()
				if (marks && marks.length > 0) {
					var text = marks.length + ''
					var bgColor = [0, 255, 255, 250]
					chrome.browserAction.setBadgeText({text:text});
					chrome.browserAction.setBadgeBackgroundColor({color:bgColor});
				}
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

				var marks = markService.getAllReading()
				if (marks && marks.length > 0) {
					var text = marks.length + ''
					var bgColor = [0, 255, 255, 250]
					chrome.browserAction.setBadgeText({text:text});
					chrome.browserAction.setBadgeBackgroundColor({color:bgColor});
				}
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
		var marks = markService.getAllReading()
		generateList(marks)
	})

})();