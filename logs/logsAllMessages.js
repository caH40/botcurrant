// модуль для сохранения всех сообщений, которые видит botcurrant
require('dotenv').config()
const mongoose = require('mongoose')
const Message = require('../models/Message')


// подключение к базе данных
mongoose.connect(process.env.MONGODB)
	.then(() => {
		console.log('MongoDb connected..')
	})
	.catch((e) => {
		console.log(e)
	})

const logsAllMessages = async function (messageObj) {
	const messageLog = new Message({ message: messageObj })
	await messageLog.save().catch(error => console.log(error))
}
module.exports = logsAllMessages