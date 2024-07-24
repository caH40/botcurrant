import 'dotenv/config';
import fs from 'fs';
import { HttpsProxyAgent } from 'https-proxy-agent';
import cityList from './citylistru.json' assert { type: 'json' };
import { WeatherWeek } from '../models/WeatherWeek.js';
import axios from 'axios';

export const getWeatherDb = async function () {
  try {
    const cityMy = [
      'Кисловодск',
      'Пятигорск',
      'Карачаевск',
      'Алагир',
      'Архыз',
      'Баксан',
      'Нальчик',
      'Барашек',
      'Ессентуки',
      'Ставрополь',
    ];
    const arrayWeather = [];

    for (let x = 0; x < cityMy.length; x++) {
      let lon = cityList.filter((obj) => obj.name === cityMy[x])[0].coord.lon;
      let lat = cityList.filter((obj) => obj.name === cityMy[x])[0].coord.lat;

      const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.IDWEATHER}&exclude=hourly&units=metric&lang=ru`;
      const proxyServer = process.env.PROXY;
      if (!proxyServer) {
        throw new Error('Не получен адрес прокси-сервера!');
      }

      const agent = new HttpsProxyAgent(proxyServer);

      const response = await axios(requestUrl, { agent });

      const weatherData = response.data;

      fs.appendFileSync('./data.JSON', JSON.stringify(weatherData));
      for (let i = 0; i < 8; i = i + 1) {
        const weatherDate = new Date(weatherData.daily[i].dt * 1000).toLocaleDateString();
        const weatherTempDay = weatherData.daily[i].temp.day;
        const weatherTempMorn = weatherData.daily[i].temp.morn;
        const weatherTempEve = weatherData.daily[i].temp.eve;
        const weatherHumidity = weatherData.daily[i].humidity;
        const weatherWindSpeed = weatherData.daily[i].wind_speed;
        const weatherDescription = weatherData.daily[i].weather[0].description;
        const dayWeather = new Date(weatherData.daily[i].dt * 1000).getDay();
        const dateUpdate = new Date().toLocaleString();

        const dayMyObj = {
          1: 'Понедельник',
          2: 'Вторник',
          3: 'Среда',
          4: 'Четверг',
          5: 'Пятница',
          6: 'Суббота',
          0: 'Воскресенье',
        };

        const zap = {
          dateUpdate: dateUpdate,
          date: weatherDate,
          dateString: dayMyObj[dayWeather],
          city: cityMy[x],
          tempMorn: weatherTempMorn,
          tempDay: weatherTempDay,
          tempEve: weatherTempEve,
          humidity: weatherHumidity,
          windSpeed: weatherWindSpeed,
          desc: weatherDescription,
        };
        // формирование массива погоды с отфильтрованными данными
        arrayWeather.push(zap);
      }
    }
    //обновление данных о погоде в базе данных, если нет, то создает новую коллекцию
    await WeatherWeek.replaceOne({}, { list: arrayWeather }, { upsert: true });
  } catch (error) {
    throw error;
  }
};
