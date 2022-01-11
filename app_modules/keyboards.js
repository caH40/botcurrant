const keyboards = {
	webCam: [
		[
			// {
			// 	text: 'Шаджатмаз-КМВ',
			// 	url: 'http://gw.cmo.sai.msu.ru/webcam1.jpg' //внешняя ссылка
			// },
			{
				text: 'Шаджатмаз-КМВ',
				callback_data: 'webcam1'
			},
			// {
			// 	text: 'Шаджатмаз-Бермамыт',
			// 	url: 'http://gw.cmo.sai.msu.ru/webcam5.jpg'
			// },
			{
				text: 'Шаджатмаз-Бермамыт',
				callback_data: 'webcam5'
			}
		],
		[
			{
				text: '"Долина Роз"',
				url: 'https://rtsp.me/embed/c6v9wLIk/'
			},
			{
				text: 'Машук-Пятигорск',
				url: 'https://openapi-alpha.ivideon.com/cameras/100-3d215c9c51446d689ca1dd3b20f192ec:0/live_preview?op=GET&access_token=public&q=2&_=0.10991404626321222'
			}
		],
		[
			{
				text: 'Гарабаши-Эльбрус',
				url: 'https://rtsp.me/embed/4GKhyfDN/'
			},
			{
				text: 'Архыз сев. склон',
				url: 'https://rtsp.me/embed/zfb44nBB/'
			}
		]
	],
	info: [
		[
			{
				text: 'Анонсы и результаты соревнований', // текст на кнопке
				url: 'https://t.me/results_cycling_KMV'
			}
		],
		[
			{
				text: 'Погода на завтра', // текст на кнопке
				callback_data: 'weatherTomorrow'
			}
		],
		[
			{
				text: 'Погода на выходные', // текст на кнопке
				callback_data: 'weatherWeekend'
			}
		]

	]
};
module.exports = keyboards