const { Schema, model } = require('mongoose')

const weatherWeek = new Schema({
	list: {

		type: Object

	}
})

module.exports = model('weatherWeeks', weatherWeek)