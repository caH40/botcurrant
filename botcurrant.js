import 'dotenv/config';
import mongoose from 'mongoose';
import { Telegraf } from 'telegraf';

import { getWeatherDb } from './weather/get-weather.js';
import { keyboards, info } from './app_modules/keyboards.js';
import { getWeather } from './app_modules/weather-post.js';
import { logsAllMessages } from './app_modules/log-messages.js';
import { screenDownLoad } from './app_modules/screen-dl.js';
import { deleteMes } from './app_modules/delete-mes.js';
import { bikeMaster } from './app_modules/bike-master.js';

const bot = new Telegraf(process.env.BOT_TOKEN);
// подключение к базе данных
mongoose.set('strictQuery', true); //в базе будут только данные которые есть в схеме
mongoose
	.connect(process.env.MONGODB)
	.then(() => {
		console.log('MongoDb connected..');
	})
	.catch(error => {
		console.log(error);
	});

const secondsInMinute = 60000;

bot.catch((err, ctx) => {
	console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

bot.start(async ctx => {
	try {
		await ctx.reply(`Привет! ${ctx.message.from.first_name ?? 'Незнакомец'}!\n${text.start}`);
		await logsAllMessages(ctx.message);
	} catch (error) {
		console.log(error);
	}
});

bot.help(async ctx => {
	try {
		await ctx.reply(text.help);
		deleteMes(ctx, 0);
		await logsAllMessages(ctx.message);
	} catch (error) {
		console.log(error);
	}
});
bot.command('repair', async ctx => {
	try {
		await bikeMaster(ctx);
		deleteMes(ctx, 0);
		await logsAllMessages(ctx.message);
	} catch (error) {
		console.log(error);
	}
});

bot.command('webcam', async ctx => {
	try {
		await ctx.reply('Вебкамеры:', { reply_markup: { inline_keyboard: keyboards.webCam } });
		deleteMes(ctx, 0);
		setTimeout(() => {
			deleteMes(ctx, 1);
		}, secondsInMinute);
		await logsAllMessages(ctx.message);
	} catch (error) {
		console.log(error);
	}
});

bot.command('info', async ctx => {
	try {
		let isPrivate = false;
		if (ctx.update.message.chat.type === 'private') isPrivate = true;
		await ctx.reply('Информационные ресурсы:', {
			reply_markup: { inline_keyboard: info(isPrivate) },
		});
		deleteMes(ctx, 0);
		setTimeout(() => {
			deleteMes(ctx, 1);
		}, secondsInMinute);
		await logsAllMessages(ctx.message);
	} catch (error) {
		console.log(error);
	}
});

bot.on('callback_query', async ctx => {
	try {
		const data = ctx.update.callback_query.data;
		if (data === 'bikeMaster') {
			await bikeMaster(ctx);
		}
		if (data === 'weatherWeekend') {
			getWeather(data, ctx);
		}
		if (data === 'weatherTomorrow') {
			getWeather(data, ctx);
		}
		if (data.includes('webcam')) {
			await screenDownLoad(data, ctx);
		}
		// пока нет необходимости в логах
		// await logsAllMessages(ctx.update.callback_query);
	} catch (error) {
		console.log(error);
	}
});

bot.on('message', async ctx => {
	try {
		await logsAllMessages(ctx.message);
	} catch (error) {
		console.log(error);
	}
});

bot.launch();
// запрос погоды с сервера и запись данных в базу данных
const secondsInHour = 3600000;
setInterval(() => {
	getWeatherDb();
}, secondsInHour);

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
