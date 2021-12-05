const Message = require('./models/Message')


function request() {
	const logMessage = new Message.find()
	console.log(logMessage.message)
}

request()