function Mark(markObj) {
	if (markObj) {
		this.title = markObj.title
		this.url = markObj.url
		this.state = markObj.state || Mark.READING
		this.addTime = markObj.addTime || (+new Date)
		this.finishTime = markObj.finishTime
	}
}

Mark.FINISHED = 'finished'
Mark.READING = 'reading'
Mark.expire = 30

Mark.prototype = {
	isFinish : function () {
		return this.state === Mark.FINISHED
	},

	isReading : function () {
		var time = +new Date
		return this.state === Mark.READING && (this.addTime + 86400000 * Mark.expire - time > 0 )
	},

	getLeftDays : function () {
		var time = +new Date
		return Math.ceil((this.addTime +  86400000 * 30 - time ) /  86400000)
	}


}