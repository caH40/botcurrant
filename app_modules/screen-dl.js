const download = require('image-downloader');

async function screenDownLoad(webcam, bot) {
	try {
		let options = {
			url: `https://gw.cmo.sai.msu.ru/${webcam}.jpg`,
			dest: `./images/${webcam}.jpg`
		};
		await download.image(options)
			.catch(() => {
				bot.reply('Что то пошло не так, есть более ранняя фотография...')
			})
		await bot.replyWithPhoto({ source: `./images/${webcam}.jpg` });
	} catch (error) {
		console.log(error);
	}

}

module.exports = screenDownLoad