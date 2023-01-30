import 'dotenv/config';
import mongoose from 'mongoose';
import { Telegraf } from 'telegraf';

import { getWeatherDb } from './weather/get-weather.js';
import { getCurrentWeather } from './app_modules/weather-post.js';
import { screenDownLoad } from './app_modules/screen-dl.js';
import { getStart } from './handlers/start.js';
import { getHelp } from './handlers/help.js';
import { getWorkshops } from './handlers/workshops.js';
import { getWebcam } from './handlers/webcam.js';
import { getInfo } from './handlers/info.js';

const bot = new Telegraf(process.env.BOT_TOKEN);

mongoose.set('strictQuery', true); //в базе будут только данные которые есть в схеме
mongoose
	.connect(process.env.MONGODB)
	.then(() => {
		console.log('MongoDb connected..');
	})
	.catch(error => {
		console.log(error);
	});

bot.start(getStart);
bot.help(getHelp);
bot.command('repair', getWorkshops);
bot.command('webcam', getWebcam);
bot.command('info', getInfo);
bot.action('bikeMaster', getWorkshops);
bot.action('weatherWeekend', async ctx => await getCurrentWeather('weatherWeekend', ctx));
bot.action('weatherTomorrow', async ctx => await getCurrentWeather('weatherTomorrow', ctx));
bot.action(/webcam/, async ctx => await screenDownLoad(ctx.update.callback_query.data, ctx));

bot.launch();
// запрос погоды с сервера и запись данных в базу данных
const secondsInHour = 3600000;
setInterval(async () => {
	await getWeatherDb().catch(error => console.log(error));
}, secondsInHour);

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
