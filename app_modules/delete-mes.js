export function deleteMes(bot, numberMessage) {
	bot
		.deleteMessage(bot.update.message.message_id + numberMessage)
		.catch(error => console.log(error));
}
