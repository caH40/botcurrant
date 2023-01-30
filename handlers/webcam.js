import { keyboardWebcam } from '../keyboards/webcams.js';

export async function getWebcam(ctx) {
	try {
		const messageForDelete = ctx.update.message.message_id;
		const secondsInMinute = 60000;
		await ctx.reply('Вебкамеры:', {
			reply_markup: { inline_keyboard: keyboardWebcam },
		});
		await ctx.deleteMessage(messageForDelete).catch(e => true);
		setTimeout(async () => {
			await ctx.deleteMessage(messageForDelete + 1);
		}, secondsInMinute);
	} catch (error) {
		console.log(error);
	}
}
