import { texts } from '../app_modules/texts.js';

export async function getHelp(ctx) {
	try {
		await ctx.reply(texts.help);
		await ctx.deleteMessage(ctx.message_id).catch(e => true);
	} catch (error) {
		console.log(error);
	}
}
