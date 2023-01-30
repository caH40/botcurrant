// модуль для сохранения всех сообщений, которые видит botcurrant

import { Message } from '../models/Message.js';

export const logsAllMessages = async function (messageObj) {
	const messageLog = new Message({ message: messageObj });
	await messageLog.save().catch(error => console.log(error));
};
