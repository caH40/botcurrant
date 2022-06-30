require('dotenv').config()
const mongoose = require('mongoose')
const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

const getWeatherDb = require('./weather/get-weather')
const text = require('./app_modules/texts')
const keyboards = require('./app_modules/keyboards')
const weatherPost = require('./app_modules/weather-post')
const logsAllMessages = require('./app_modules/log-messages')
const screenShot = require('./app_modules/screenshot')
const screenDownLoad = require('./app_modules/screen-dl')
const deleteMes = require('./app_modules/delete-mes')
const bikeMaster = require('./app_modules/bike-master')

// подключение к базе данных
mongoose
	.connect(process.env.MONGODB)
	.then(() => {
		console.log('MongoDb connected..')
	})
	.catch(error => {
		console.log(error)
	})

const secondsInMinute = 60000

bot.catch((err, ctx) => {
	console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

bot.start(async ctx => {
	try {
		await ctx.reply(`Привет! ${ctx.message.from.first_name ?? 'Незнакомец'}!\n${text.start}`)
		await logsAllMessages(ctx.message)
	} catch (error) {
		console.log(error)
	}
})

bot.help(async ctx => {
	try {
		await ctx.reply(text.help)
		deleteMes(ctx, 0)
		await logsAllMessages(ctx.message)
	} catch (error) {
		console.log(error)
	}
})
bot.command('repair', async ctx => {
	try {
		await ctx.reply(text.bikeMaster, { parse_mode: 'html' })
		deleteMes(ctx, 0)
		await logsAllMessages(ctx.message)
	} catch (error) {
		console.log(error)
	}
})

bot.command('webcam', async ctx => {
	try {
		await ctx.reply('Вебкамеры:', { reply_markup: { inline_keyboard: keyboards.webCam } })
		deleteMes(ctx, 0)
		setTimeout(() => {
			deleteMes(ctx, 1)
		}, secondsInMinute)
		await logsAllMessages(ctx.message)
	} catch (error) {
		console.log(error)
	}
})

bot.command('info', async ctx => {
	try {
		await ctx.reply('Информационные ресурсы:', {
			reply_markup: { inline_keyboard: keyboards.info },
		})
		deleteMes(ctx, 0)
		setTimeout(() => {
			deleteMes(ctx, 1)
		}, secondsInMinute)
		await logsAllMessages(ctx.message)
	} catch (error) {
		console.log(error)
	}
})

bot.on('callback_query', async ctx => {
	try {
		const data = ctx.update.callback_query.data
		if (data === 'bikeMaster') {
			bikeMaster(ctx)
		}
		if (data === 'weatherWeekend') {
			weatherPost(data, ctx)
		}
		if (data === 'weatherTomorrow') {
			weatherPost(data, ctx)
		}
		if (data.includes('webcam')) {
			// await screenShot(data, ctx); //with pupppeteer
			await screenDownLoad(data, ctx)
		}
		// пока нет необходимости в логах
		// await logsAllMessages(ctx.update.callback_query);
	} catch (error) {
		console.log(error)
	}
})

bot.on('message', async ctx => {
	try {
		await logsAllMessages(ctx.message)
	} catch (error) {
		console.log(error)
	}
})

bot.launch()
// запрос погоды с сервера и запись данных в базу данных
const secondsInHour = 3600000
setInterval(() => {
	getWeatherDb()
}, secondsInHour)

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
