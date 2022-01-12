const puppeteer = require('puppeteer');

//функция обёртка для синхронных операций
async function screenShot(webcam, bot) {
	try {
		const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser', args: ['--no-sandbox'] });// for Ubuntu VPS
		// const browser = await puppeteer.launch(); // for windows
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1080,
			deviceScaleFactor: 1
		})
		await page.goto(`https://gw.cmo.sai.msu.ru/${webcam}.jpg`);
		// чтобы дождаться загружаемого селектора:
		await page.waitForSelector('body > img');
		await page.screenshot({ path: `./images/${webcam}.jpg` });
		await browser.close();
		await bot.replyWithPhoto({ source: `./images/${webcam}.jpg` })
	} catch (error) {
		console.log(error)
	}
}

module.exports = screenShot