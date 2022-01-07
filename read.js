require('dotenv').config()
const mongoose = require('mongoose');
const { Schema, model } = require('mongoose')
const messageSchema = new Schema({
	message: {
		type: Object
	}
})
const Message = model('messages', messageSchema)

mongoose.connect(process.env.MONGODB)
	.then(() => {
		console.log('MongoDb connected..')
	})
	.catch((e) => {
		console.log(e)
	})

async function request() {
	try {
		const logMessage = await Message.find({ "message.text": /^\/\w+/i })
		for (let i = 0; i < logMessage.length; i++) {
			console.log(`${new Date(logMessage[i].message.date * 1000).toLocaleString()}, ${logMessage[i].message.from.username ??= 'Незнакомец'}, ${logMessage[i].message.text}`)
		}
	} catch (error) {
		console.log('ошибка в запросе данных с базы', error)
	}
}
request()