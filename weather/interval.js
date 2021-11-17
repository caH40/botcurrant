const fetch = require('node-fetch');
const fs = require('fs');
const cityList = require('./citylistru.json')
const logerror = require('../app_modules/logerror')

const writeCurrentWeather = function () {

	let i = 0
	const cityMy = ['Kislovodsk', 'Pyatigorsk', 'Karachayevsk', 'Alagir', 'Arkhyz', 'Baksan', 'Nal’chik']
	const arrayWeatherSun = []
	const arrayWeatherSat = []
	const arrayWeatherTom = []

	for (let x = 0; x < 7; x++) {

		let lon = cityList.filter(obj => obj.name === cityMy[x])[0].coord.lon
		let lat = cityList.filter(obj => obj.name === cityMy[x])[0].coord.lat

		const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=2b149698008867fabba93ac5e856e71e&exclude=hourly&units=metric&lang=ru` // first token
		// const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=0ab9f04031374506e1d90ffb30e3d937&exclude=hourly&units=metric&lang=ru` //second token

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

					const cityMyObj = {
						'Kislovodsk': 'Кисловодск',
						'Pyatigorsk': 'Пятигорск',
						'Karachayevsk': 'Карачаевск',
						'Alagir': 'Алагир',
						'Arkhyz': 'Архыз',
						'Baksan': 'Баксан',
						'Nal’chik': 'Нальчик'
					}

					const zap = { 'dateUpdate': dateUpdate, 'date': weatherDateRus, 'city': cityMyObj[cityMy[x]], 'temp': Math.round(weatherTemp), 'humidity': weatherHumidity, 'windSpeed': Math.round(weatherWindSpeed), 'desc': weatherDescription }

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

				fs.writeFile('./weather/sunweather.json', JSON.stringify(arrayWeatherSun), err => {
					if (err) {
						logerror(err)
					}
				})
				fs.writeFile('./weather/satweather.json', JSON.stringify(arrayWeatherSat), err => {
					if (err) {
						logerror(err)
					}
				})
				fs.writeFile('./weather/tomweather.json', JSON.stringify(arrayWeatherTom), err => {
					if (err) {
						logerror(err)
					}
				})

			}
			)
			.catch((err) => logerror(err))
	};
}

module.exports = writeCurrentWeather
