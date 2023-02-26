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

export async function paginationWebcam() {
	if (!ctx.session) return;

	const lengthArr = ctx.session.team.length;
	ctx.session.element = +cbqData.slice(5);

	const button = { prev: 'Предыдущая', next: 'Следующая' };

	if (cbqData.slice(0, 4) === 'prev' && +cbqData.slice(5) !== 0) {
		ctx.session.element--;
		ctx.answerCbQuery();
	}
	if (cbqData.slice(0, 4) === 'prev' && +cbqData.slice(5) === 0)
		return await ctx.answerCbQuery('Больше нет команд!');

	if (cbqData.slice(0, 4) === 'next' && +cbqData.slice(5) !== lengthArr - 1) {
		ctx.session.element++;
		ctx.answerCbQuery();
	}
	if (cbqData.slice(0, 4) === 'next' && +cbqData.slice(5) === lengthArr - 1)
		return await ctx.answerCbQuery('Больше нет команд!');

	if (ctx.session.element === 0) {
		button.prev = 'X';
	} else {
		button.prev = 'Предыдущая';
	}
	if (ctx.session.element === lengthArr - 1) {
		button.next = 'X';
	} else {
		button.next = 'Следующая';
	}
	let ridersInTeam = '\n';
	ctx.session.team[ctx.session.element].riders?.forEach(
		(rider, index) =>
			(ridersInTeam += `${index + 1}. ${rider.rider.lastName} ${rider.rider.firstName}\n`)
	);

	ctx.editMessageMedia(
		{
			type: 'photo',
			media: { source: Buffer.from(ctx.session.team[ctx.session.element].logoBase64, 'base64') },
			caption: ctx.session.team[ctx.session.element].description + ridersInTeam,
		},
		{
			...Markup.inlineKeyboard([
				Markup.button.callback(button.prev, `prev_${ctx.session.element}`),
				Markup.button.callback(button.next, `next_${ctx.session.element}`),
			]),
		}
	);
}
