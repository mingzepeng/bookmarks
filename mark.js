var mark = (function () {

	function get(key) {
		var result = localStorage.getItem(key) 
		return result ? JSON.parse(result) : null
	}

	function set(key,value) {
		return localStorage.setItem(key,JSON.stringify(value))
	}
	return {
		add : function (url) {
			// body...
		},


		remove : function (argument) {
			// body...
		},
		get : function (argument) {
			// body...
		},

		getAll : function (argument) {
			// body...
		}
	};
})();