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

					if (dayWeather === 0) {
						weatherDateRus = 'Воскресенье ' + weatherDate
					}
					if (dayWeather === 6) {
						weatherDateRus = 'Суббота ' + weatherDate
					}
					if (dayWeather === 1 || dayWeather === 2 || dayWeather === 3 || dayWeather === 4 || dayWeather === 5) {
						weatherDateRus = weatherDate
					};

					let cityMyRus = [];
					if (cityMy[x] === 'Kislovodsk') {
						cityMyRus = 'Кисловодск';
					};
					if (cityMy[x] === 'Pyatigorsk') {
						cityMyRus = 'Пятигорск';
					};
					if (cityMy[x] === 'Karachayevsk') {
						cityMyRus = 'Карачаевск';
					};
					if (cityMy[x] === 'Alagir') {
						cityMyRus = 'Алагир';
					};
					if (cityMy[x] === 'Arkhyz') {
						cityMyRus = 'Архыз';
					};
					if (cityMy[x] === 'Baksan') {
						cityMyRus = 'Баксан';
					};
					if (cityMy[x] === 'Nal’chik') {
						cityMyRus = 'Нальчик';
					};


					const zap = { 'dateUpdate': dateUpdate, 'date': weatherDateRus, 'city': cityMyRus, 'temp': Math.round(weatherTemp), 'humidity': weatherHumidity, 'windSpeed': Math.round(weatherWindSpeed), 'desc': weatherDescription }
					// console.log(zap)
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
				// console.log(arrayWeatherSat)
				// console.log(arrayWeatherSun)
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
			.catch(() => logerror(err))
	};
}
// setInterval(writeCurrentWeather, 10000)
module.exports = writeCurrentWeather
