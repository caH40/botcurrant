import { WeatherWeek } from '../models/WeatherWeek.js';

//получение массива с погодой из базы данных
export async function getCurrentWeather(currentDay, bot) {
	const weatherArr = await WeatherWeek.findOne().catch(error => console.log(error));
	console.log(weatherArr);
	if (currentDay === 'weatherWeekend') {
		await getMessageFinal('Суббота', weatherArr, bot).catch(error => console.log(error));
		await getMessageFinal('Воскресенье', weatherArr, bot).catch(error => console.log(error));
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

		await getMessageFinal(tomorrow, weatherArr, bot).catch(error => console.log(error));
	}
}

async function getMessageFinal(requiredDay, weatherArr, bot) {
	//исключается сегодняшний выходной день
	let weatherCurrent = await weatherArr.list.filter(
		element =>
			element.dateString === requiredDay && element.date !== new Date().toLocaleDateString()
	);
	// сортировка массива по дневной температуре(tempDay) от большей к меньшей
	weatherCurrent.sort((a, b) => b.tempDay - a.tempDay);
	//формирование сообщения о погоде в городах
	let messageFinal = `<u><b>${weatherCurrent[0].dateString} ${weatherCurrent[0].date} \n</b></u>`;
	for (let i = 0; i < weatherCurrent.length; i++) {
		const messageWeather = `<b>${weatherCurrent[i].city}:</b> ${Math.round(
			weatherCurrent[i].tempDay
		)}°С, ${weatherCurrent[i].humidity}%, ${Math.round(weatherCurrent[i].windSpeed)}м/с, ${
			weatherCurrent[i].desc
		} \n`;
		messageFinal = messageFinal + messageWeather;
	}

	await bot.reply(messageFinal, { parse_mode: 'html' }).catch(error => console.log(error));
}
