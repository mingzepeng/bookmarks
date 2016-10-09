(function () {

	// client.putObjectFromString(bucket, key, data)
	//   .then(response => console.log(response))    // 成功
	//   .catch(error => console.error(error));      // 失败

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
		if (typeof chrome !== 'undefined' && chrome.browserAction) {
			chrome.browserAction.setBadgeText({text:text + ''});
			chrome.browserAction.setBadgeBackgroundColor({color:bgColor});
		}
	}

	function init() {
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
					var url = tab.url;
					var result = markService.finish(url);
					if (result) {
						result.then(function () {
							setBadge();
						})
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
					// debugger;
					var url = tab.url
					var title = tab.title
					var result = markService.add(url,title)
					if (result) {
						result.then(function () {
							// debugger
							setBadge()
						})
					}
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
		// body...
	}

	
	markService.getAllAsync().then(function (data) {
		var marks = markService.getAllReading()
		generateList(marks)
		setBadge()
		init()
	})
})();