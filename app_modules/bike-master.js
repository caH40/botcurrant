const text = require('./texts')

async function bikeMaster(bot) {
	await bot.reply(text.bikeMaster, { parse_mode: 'html' }).catch(error => console.log(error))
}

module.exports = bikeMaster
