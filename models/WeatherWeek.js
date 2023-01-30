import { Schema, model } from 'mongoose';

const weatherWeek = new Schema({
	list: {
		type: Object,
	},
});

export const WeatherWeek = model('weatherWeeks', weatherWeek);
