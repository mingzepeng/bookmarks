var markService = (function () {
	var url = 'http://marks.gz.bcebos.com/1.json?authorization=bce-auth-v1%2F3C6wefc3LtpFadgfRHn6dfMw%2F2016-10-05T15%3A47%3A56Z%2F-1%2Fhost%2Fd103d0f13999e6512e1baf0e8ce1bcad94436b8dd14a161e8f269c50945d2e52';
	var config = {
	  endpoint: "http://gz.bcebos.com",         //传入Bucket所在区域域名
	  credentials: {
	     ak: "3C6wefc3LtpFadgfRHn6dfMw",         //您的AccessKey
	     sk: "G7OnK0ZXq6tMQNjlAtfyIzXmUfRFxyPo"       //您的SecretAccessKey
	  }
	};

	var client = new baidubce.sdk.BosClient(config);
	var bucket = 'marks';
	var bucketObjectKey = '1.json';
	// var data = JSON.stringify({name : Math.random() * 1000 })

	var KEY = 'readmarks'
	var tmp_marks = []
	// var READING = 'reading'
	function get() {
		return fetch(url)
		.then(function(res) {
			return res.json();
		})
		.then(function(json) {
			return json.data || [];
		})
	}

	function set(data) {
		data = {updateTime : +new Date, data : data};
		data = JSON.stringify(data);
		return client.putObjectFromString(bucket, bucketObjectKey, data);
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
			// url = filterUrl(url)
			if (this.has(url) < 0) {
				var mark = new Mark({url : url, title : title});
				tmp_marks.push(mark);
				return set(tmp_marks);
			}
		},
		save : function (mark) {
			if (mark && mark.url) {
				var index = this.has(mark.url);
				if (index >= 0) {
					tmp_marks[index] = mark;
					return set(tmp_marks)
				}
			}
		},

		has : function (url) {
			url = filterUrl(url)
			var index = -1;
			tmp_marks.forEach(function (mark,i) {
				if (mark.url === url) {
					index = i;
				}
			})
			return index;
		},
		finish : function (url) {
			// url = filterUrl(url)
			var mark = this.get(url)

			if (mark && mark.isReading()) {
				mark.state = Mark.FINISHED
				mark.finishTime = +new Date
				return this.save(mark)
				// set(KEY,marks)/
				// return true
			}
			// return false
		},

		remove : function (url) {
			var index = this.has(url)
			if (index >= 0) {
				// return 
				tmp_marks.splice(index,1);
				return set(tmp_marks);
				// tmp_marks[index]
			}
		},
		removeAll : function () {
			return set([])
			// return true
		},
		get : function (url) {
			url = filterUrl(url)
			return tmp_marks.filter(function (mark) {
				return mark.url === url
			})[0] || null
		},

		getAllAsync : function (filter) {
			return get().then(function(marks) {

				marks.sort(function (item1,item2) {
					return item1.addTime > item2.addTime
				});
				marks = marks.map(function (markObj) {
					return new Mark(markObj)
				});
				tmp_marks = marks.slice(0);
				if (typeof filter === 'function') {
					marks = marks.filter(filter);
				}

				return marks;
				// body...
			});
		},
		getAllReading : function () {
			return tmp_marks.filter(function(mark){
				return mark.isReading();
			});
		},

		getOldestMark : function() {
			return tmp_marks.filter(function (mark,i) {
				return i === 0;
			})[0] || null;
		}
	};
})();