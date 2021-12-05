// коллекция, состоящяя из объекта сообщения ctx.message
const { Schema, model } = require('mongoose')
const testSchema = new Schema({
	message: {
		type: String
	}
})
module.exports = model('messages', testSchema)