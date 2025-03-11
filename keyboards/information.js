export function keyboardInfo(isPrivate) {
  return [
    [
      {
        text: 'Анонсы и результаты соревнований', // текст на кнопке
        url: 'https://t.me/results_cycling_KMV',
      },
    ],
    // isPrivate
    //   ? [
    //       {
    //         text: 'Результаты соревнований ДжилыСу', // текст на кнопке
    //         web_app: { url: 'https://bike-caucasus.ru/dzhilsu' },
    //       },
    //     ]
    //   : [],
    isPrivate
      ? [
          {
            text: 'Велосипедные маршруты', // текст на кнопке
            web_app: { url: 'https://bike-caucasus.ru/trails' },
          },
        ]
      : [],
    [
      {
        text: 'Веломастерские на КМВ', // текст на кнопке
        callback_data: 'bikeMaster',
      },
    ],
    // [
    // 	{
    // 		text: 'Погода на завтра', // текст на кнопке
    // 		callback_data: 'weatherTomorrow',
    // 	},
    // ],
    // [
    // 	{
    // 		text: 'Погода на выходные', // текст на кнопке
    // 		callback_data: 'weatherWeekend',
    // 	},
    // ],
  ];
}
