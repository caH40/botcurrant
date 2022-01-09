require('dotenv').config()
const fetch = require('node-fetch');
const Weather = require('../models/Weather');
const cityList = require('./citylistru.json')
const logerror = require('../app_modules/logerror')

const writeCurrentWeather = function () {

	let i = 0
	const cityMy = ['Кисловодск', 'Пятигорск', 'Карачаевск', 'Алагир', 'Архыз', 'Баксан', 'Нальчик']
	const arrayWeatherSun = []
	const arrayWeatherSat = []
	const arrayWeatherTom = []

	for (let x = 0; x < 7; x++) {

		let lon = cityList.filter(obj => obj.name === cityMy[x])[0].coord.lon
		let lat = cityList.filter(obj => obj.name === cityMy[x])[0].coord.lat

		const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${(process.env.IDWEATHER)}&exclude=hourly&units=metric&lang=ru`

		fetch(requestUrl)
			.then(function (resp) {
				return resp.json()
			})
			.then(function (data) {
				for (let i = 0; i < 8; i = i + 1) {
					const weatherDate = new Date(data.daily[i].dt * 1000).toLocaleDateString();
					const weatherTemp = data.daily[i].temp.day;
					const weatherHumidity = data.daily[i].humidity;
					const weatherWindSpeed = data.daily[i].wind_speed;
					const weatherDescription = data.daily[i].weather[0].description;
					const dayWeather = new Date(data.daily[i].dt * 1000).getDay();
					const dayWeatherToday = new Date(data.daily[i].dt * 1000).toLocaleDateString();
					const dateUpdate = new Date().toLocaleString();
					let weatherDateRus = '';

					const dayMyObj = {
						1: 'Понедельник',
						2: 'Вторник',
						3: 'Среда',
						4: 'Четверг',
						5: 'Пятница',
						6: 'Суббота',
						0: 'Воскресенье',
					}
					weatherDateRus = dayMyObj[dayWeather] + ' ' + weatherDate

					const zap = { 'dateUpdate': dateUpdate, 'date': weatherDateRus, 'city': cityMy[x], 'temp': Math.round(weatherTemp), 'humidity': weatherHumidity, 'windSpeed': Math.round(weatherWindSpeed), 'desc': weatherDescription }

					if (dayWeather === 0 && dayWeatherToday !== new Date().toLocaleDateString()) {
						arrayWeatherSun.push(zap)
					}
					if (dayWeather === 6 && dayWeatherToday !== new Date().toLocaleDateString()) {
						arrayWeatherSat.push(zap)
					}
					if (dayWeather === new Date().getDay() + 1) {
						arrayWeatherTom.push(zap)
					}
				} // найти способ подсчета элементов объекта
				arrayWeatherSun.sort((a, b) => b.temp - a.temp)
				arrayWeatherSat.sort((a, b) => b.temp - a.temp)
				arrayWeatherTom.sort((a, b) => b.temp - a.temp)






				// fs.writeFile('./weather/sunweather.json', JSON.stringify(arrayWeatherSun), err => {
				// 	if (err) {
				// 		logerror(err)
				// 	}
				// })
				// fs.writeFile('./weather/satweather.json', JSON.stringify(arrayWeatherSat), err => {
				// 	if (err) {
				// 		logerror(err)
				// 	}
				// })
				// fs.writeFile('./weather/tomweather.json', JSON.stringify(arrayWeatherTom), err => {
				// 	if (err) {
				// 		logerror(err)
				// 	}
				// })

			}
			)
			.catch((err) => logerror('Fetch - ' + err))
	};
}

module.exports = writeCurrentWeather
