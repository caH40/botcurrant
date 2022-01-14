const puppeteer = require('puppeteer');

//функция обёртка для синхронных операций
async function screenShot(webcam, bot) {
	try {
		const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser', args: ['--no-sandbox'] }).catch((error) => console.log(error));// for Ubuntu VPS
		// const browser = await puppeteer.launch().catch((error) => console.log(error)); // for windows
		const page = await browser.newPage().catch((error) => console.log(error));
		await page.setViewport({
			width: 1920,
			height: 1080,
			deviceScaleFactor: 1
		}).catch((error) => console.log(error));
		await page.goto(`https://gw.cmo.sai.msu.ru/${webcam}.jpg`).catch((error) => console.log(error));
		// чтобы дождаться загружаемого селектора:
		await page.waitForSelector('body > img').catch((error) => console.log(error));
		await page.screenshot({ path: `./images/${webcam}.jpg` }).catch((error) => console.log(error));
		await browser.close().catch((error) => console.log(error));
		await bot.replyWithPhoto({ source: `./images/${webcam}.jpg` }).catch((error) => console.log(error));
	} catch (error) {
		console.log(error)
	}
}

module.exports = screenShot