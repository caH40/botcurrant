import path from 'path';
import download from 'image-downloader';

export async function screenDownLoad(webcam, bot) {
	try {
		let options = {
			url: `https://gw.cmo.sai.msu.ru/${webcam}.jpg`,
			dest: path.resolve('./', 'images', `${webcam}.jpg`),
		};
		await download.image(options).catch(e => {
			console.log(e);
			bot.reply('Что то пошло не так, есть более ранняя фотография...');
		});
		await bot.replyWithPhoto({ source: `./images/${webcam}.jpg` });
	} catch (error) {
		console.log(error);
	}
}
