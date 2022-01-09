// модуль для сохранения всех сообщений, которые видит botcurrant
require('dotenv').config();
const Message = require('../models/Message');

const logsAllMessages = async function (messageObj) {
	const messageLog = new Message({ message: messageObj });
	await messageLog.save().catch(error => console.log(error));
}
module.exports = logsAllMessages