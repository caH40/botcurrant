const mongoose = require('mongoose')
const Message = require('../models/Message')


// подключение к базе данных
mongoose.connect('mongodb://localhost:27017/testbot')
	.then(() => {
		console.log('MongoDb connected..')
	})
	.catch((e) => {
		console.log(e)
	})

const savelogs = async function (messageObj) {
	const messageLog = new Message({ message: messageObj })
	await messageLog.save().catch(error => console.log(error))
}
module.exports = savelogs