import { texts } from '../app_modules/texts.js';

export async function getStart(ctx) {
	try {
		await ctx.reply(`Привет! ${ctx.message.from.first_name ?? 'Незнакомец'}!\n${texts.start}`);
		await ctx.deleteMessage(ctx.message_id).catch(e => true);
	} catch (error) {
		console.log(error);
	}
}
