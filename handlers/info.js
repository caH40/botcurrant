import { keyboardInfo } from '../keyboards/information.js';

export async function getInfo(ctx) {
	try {
		const secondsInMinute = 60000;
		const messageForDelete = ctx.update.message.message_id;
		let isPrivate = false;

		if (ctx.update.message.chat.type === 'private') isPrivate = true;
		await ctx.reply('Информационные ресурсы:', {
			reply_markup: { inline_keyboard: keyboardInfo(isPrivate) },
		});

		await ctx.deleteMessage(messageForDelete).catch(e => true);

		setTimeout(async () => {
			await ctx.deleteMessage(messageForDelete + 1).catch(e => true);
		}, secondsInMinute);

		await ctx.deleteMessage(messageForDelete).catch(e => true);
	} catch (error) {
		console.log(error);
	}
}
