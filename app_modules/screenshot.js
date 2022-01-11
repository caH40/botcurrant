const puppeteer = require('puppeteer');


//функция обёртка для синхронных операций
async function screenShot(webcam, bot) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setViewport({
		width: 1920,
		height: 1080,
		deviceScaleFactor: 1
	})
	await page.goto(`https://gw.cmo.sai.msu.ru/${webcam}.jpg`);
	// чтобы дождаться загружаемого селектора:
	await page.waitForSelector('body > img');
	await page.screenshot({ path: `${webcam}.jpg` });
	await browser.close();
	await bot.replyWithPhoto({ source: `${webcam}.jpg` })

}




module.exports = screenShot