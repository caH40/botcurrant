const text = require('./texts')

async function bikeMaster(bot) {
	await bot
		.reply(text.bikeMaster, { parse_mode: 'html', disable_web_page_preview: true })
		.catch(error => console.log(error))
}

module.exports = bikeMaster
