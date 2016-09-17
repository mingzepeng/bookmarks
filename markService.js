var markService = (function () {
	var KEY = 'readmarks'

	// var READING = 'reading'
	function get(key) {
		var result = localStorage.getItem(key) 
		return result ? JSON.parse(result) : null
	}

	function set(key,value) {
		return localStorage.setItem(key,JSON.stringify(value))
	}

	function filterUrl(url) {
		if (!url) {
			return url
		}
		var hashIndex = url.lastIndexOf('#')
		if (hashIndex >= 0) {
			url = url.slice(0,hashIndex)
		}
		return url
	}


	return {
		add : function (url,title) {
			url = filterUrl(url)
			var marks = get(KEY)
			if (!marks) {
				marks = {}
			}
			if (!marks[url]) {
				marks[url] = new Mark({url : url, title : title}) 
				set(KEY,marks)
				return true
			}
			return false

		},
		save : function (mark) {
			if (mark) {
				var marks = get(KEY)
				var url = mark.url
				if (!marks) {
					marks = {}
				}
				marks[url] = mark
				set(KEY,marks)
			}
		},

		has : function (url) {
			url = filterUrl(url)
			var marks = get(KEY)
			if (marks) {
				return marks[url] ? true : false  
			}
			return false
		},
		finish : function (url) {
			url = filterUrl(url)
			var mark = this.get(url)

			if (mark && mark.isReading()) {
				mark.state = Mark.FINISHED
				mark.finishTime = +new Date
				this.save(mark)
				// set(KEY,marks)/
				return true
			}
			return false
		},

		remove : function (url) {
			url = filterUrl(url)
			var marks = get(KEY)
			if (marks && marks[url]) {
				delete marks[url]
				set(KEY,marks)
				return true
			}
			return false
		},
		removeAll : function () {
			set(KEY,{})
			return true
		},
		get : function (url) {
			url = filterUrl(url)
			var marks = get(KEY)
			return  marks[url] ? new Mark(marks[url]) : null
			// body...
		},

		getAll : function (url) {
			var marksArr = []
			var marks = get(KEY)
			if (marks) {
				for(var url in marks){
					var addTime = marks[url].addTime
					var finishTime = marks[url].finishTime
					var title = marks[url].title
					var state = marks[url].state
					marksArr.push({url : url,title : title, addTime : addTime, finishTime : finishTime, state : state})
				}
				marksArr.sort(function (item1,item2) {
					return item1.addTime > item2.addTime
				})
				marksArr = marksArr.map(function (markObj) {
					return new Mark(markObj)
				})
			}
			return marksArr
		},
		getAllReading : function (url) {
			var marksArr = []
			var marks = get(KEY)
			if (marks) {
				for(var url in marks){
					var addTime = marks[url].addTime
					var finishTime = marks[url].finishTime
					var title = marks[url].title
					var state = marks[url].state
					marksArr.push({url : url,title : title, addTime : addTime, finishTime : finishTime, state : state})
				}
				marksArr.sort(function (item1,item2) {
					return item1.addTime > item2.addTime
				})
				marksArr = marksArr
					.map(function (markObj) {
						return new Mark(markObj)
					})
					.filter(function(mark) {
						return mark.isReading()
					})
			}
			return marksArr
		}
	};
})();