const keyboards = {
	webCam: [
		[
			{
				text: 'Шаджатмаз-КМВ',
				callback_data: 'webcam1',
			},

			{
				text: 'Шаджатмаз-Бермамыт',
				callback_data: 'webcam5',
			},
		],
		[
			{
				text: '"Кисловодск Телевышка"',
				url: 'https://www.kmv.ru/g.kislovodsk-cams.html',
			},
			{
				text: 'Машук-Пятигорск',
				url: 'https://openapi-alpha.ivideon.com/cameras/100-3d215c9c51446d689ca1dd3b20f192ec:0/live_preview?op=GET&access_token=public&q=2&_=0.10991404626321222',
			},
		],
		[
			{
				text: 'Азау',
				url: 'https://rtsp.me/embed/r9iGt7h6/',
			},
			{
				text: 'Архыз сев. склон',
				url: 'https://rtsp.me/embed/zfb44nBB/',
			},
		],
	],
};
function info(isPrivate) {
	return [
		[
			{
				text: 'Анонсы и результаты соревнований', // текст на кнопке
				url: 'https://t.me/results_cycling_KMV',
			},
		],
		isPrivate
			? [
					{
						text: 'Результаты соревнований ДжилыСу', // текст на кнопке
						web_app: { url: 'https://bike-caucasus.ru/dzhilsu' },
					},
			  ]
			: [],
		isPrivate
			? [
					{
						text: 'Велосипедные маршруты', // текст на кнопке
						web_app: { url: 'https://bike-caucasus.ru/trail' },
					},
			  ]
			: [],
		[
			{
				text: 'Веломастерские на КМВ', // текст на кнопке
				callback_data: 'bikeMaster',
			},
		],
		[
			{
				text: 'Погода на завтра', // текст на кнопке
				callback_data: 'weatherTomorrow',
			},
		],
		[
			{
				text: 'Погода на выходные', // текст на кнопке
				callback_data: 'weatherWeekend',
			},
		],
	];
}
module.exports.keyboards = keyboards;
module.exports.info = info;
