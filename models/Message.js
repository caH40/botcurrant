// коллекция, состоящяя из объекта сообщения ctx.message
const { Schema, model } = require('mongoose')
const messageSchema = new Schema({
	message: {
		type: Object
	}
})
module.exports = model('messages', messageSchema)