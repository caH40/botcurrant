const WeatherWeek = require('../models/WeatherWeek');

//получение массива с погодой из базы данных
async function getWeather(currentDay, bot) {
	const weatherArr = await WeatherWeek.findOne().catch(error => console.log(error));

	if (currentDay === 'weatherWeekend') {
		getMessageFinal('Суббота', weatherArr, bot);
		getMessageFinal('Воскресенье', weatherArr, bot);
	}

	if (currentDay === 'weatherTomorrow') {
		const days = {
			1: 'Понедельник',
			2: 'Вторник',
			3: 'Среда',
			4: 'Четверг',
			5: 'Пятница',
			6: 'Суббота',
			0: 'Воскресенье',
		};
		const today = new Date().getDay();
		let tomorrow = days[today + 1];

		if (today === 6) {
			tomorrow = days[0];
		}

		getMessageFinal(tomorrow, weatherArr, bot);
	}
}


async function getMessageFinal(requiredDay, weatherArr, bot) {
	//исключается сегодняшний выходной день 
	let weatherCurrent = await weatherArr.list.filter(element => element.dateString === requiredDay && element.date !== new Date().toLocaleDateString());
	// сортировка массива по дневной температуре(tempDay) от большей к меньшей
	weatherCurrent.sort((a, b) => b.tempDay - a.tempDay);
	//формирование сообщения о погоде в городах
	let messageFinal = `<u><b>${weatherCurrent[0].dateString} ${weatherCurrent[0].date} \n</b></u>`;
	for (let i = 0; i < weatherCurrent.length; i++) {
		const messageWeather = `<b>${weatherCurrent[i].city}:</b> ${Math.round(weatherCurrent[i].tempDay)}°С, ${weatherCurrent[i].humidity}%, ${Math.round(weatherCurrent[i].windSpeed)}м/с, ${weatherCurrent[i].desc} \n`;
		messageFinal = messageFinal + messageWeather;
	}

	bot.reply(messageFinal, { parse_mode: 'html' });
}

module.exports = getWeather