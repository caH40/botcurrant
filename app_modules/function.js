const fs = require('fs')
//getDate - Функция запроса сегодняшней даты
// creatNewLog - функция формирования нового логфайла с текущей датой
// Функция чтения из JSON-файла данных о погоде, формирование строки представления погоды и отсылка сообщения ботом в телеграмм
// dayWeather - наименование дня недели, должно совпадать с именем JSON файла, где хранятся запросы о погоде
const func = {
	getDate: () => new Date().toLocaleDateString(),
	delay: function (ms) {
		return new Promise((res) => {
			setTimeout(() => res(), ms)
		})
	},
	readWeatherJson: async function (dayWeather) {
		let dayWeatherCurI
		const content = fs.readFileSync(`./weather/${dayWeather}.json`, { encoding: 'utf8' })
		// console.log(content)
		if (content !== '[]' && content !== '') {
			dayWeather = JSON.parse(content)
			dayWeather.sort((a, b) => b.temp - a.temp)
			dayWeatherCurI = `<u><b>${dayWeather[0].date} \n</b></u>`
			for (let i = 0; i < 7; i++) {
				let dayWeatherCur = `<b>${dayWeather[i].city}:</b> ${dayWeather[i].temp}°С, ${dayWeather[i].humidity}%, ${dayWeather[i].windSpeed}м/с, ${dayWeather[i].desc} \n`
				dayWeatherCurI = dayWeatherCurI + dayWeatherCur
			}
		} else {
			dayWeatherCurI = 'Что то пошло не так...'
			// console.log('Ошибка найдена')
		}
		return dayWeatherCurI
	}
}

module.exports = func
