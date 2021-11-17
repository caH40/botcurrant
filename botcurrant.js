require('dotenv').config()
const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)
const func = require('./app_modules/function')
const text = require('./app_modules/texts')
const keyboards = require('./app_modules/keyboards')
const addLog = require('./app_modules/log')
const logerror = require('./app_modules/logerror')
const writeCurrentWeather = require('./weather/interval')



bot.catch((err, ctx) => {
	console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
})
bot.start(async ctx => {
	await ctx.reply(`Привет! ${ctx.message.from.first_name ?? 'Незнакомец'}!\nПри нажании "/" вызываются команды бота!`)
})
bot.help(async ctx => await ctx.reply(text.commands))
bot.command('webcam', async ctx => {
	await ctx.reply('Вебкамеры:', { reply_markup: { inline_keyboard: keyboards.webCam } })
	addLog(ctx.update)
	func.delay(60000)
		.then(() => {
			ctx.deleteMessage(ctx.update.message.message_id + 1).catch(err => logerror(err))
			ctx.deleteMessage(ctx.update.message.message_id).catch(err => logerror(err))
		})
		.catch(err => logerror(err))
})
bot.command('info', async ctx => {
	await ctx.reply('Информационные ресурсы:', { reply_markup: { inline_keyboard: keyboards.info } })
	addLog(ctx.update)
	func.delay(60000)
		.then(() => {
			ctx.deleteMessage(ctx.update.message.message_id + 1).catch(err => logerror(err))
			ctx.deleteMessage(ctx.update.message.message_id).catch(err => logerror(err))
		})
		.catch(err => logerror(err))
})
bot.on('callback_query', async ctx => {
	const data = ctx.update.callback_query.data
	if (data === 'weather') {
		func.readWeatherJson('satweather')
			.then(response => ctx.reply(response, { parse_mode: 'html' }))
		func.readWeatherJson('sunweather')
			.then(response => ctx.reply(response, { parse_mode: 'html' }))
	}
	if (data === 'weatherTomorrow') {
		func.readWeatherJson('tomweather')
			.then(response => ctx.reply(response, { parse_mode: 'html' }))
	}
})

bot.launch()
// запрос погоды с сервера и запись данных в локальные файлы
setInterval(writeCurrentWeather, 10000)

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))