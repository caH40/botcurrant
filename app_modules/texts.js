// веломастер Вячеслав
const vyacheslav_1 = 'Вячеслав, г.Кисловодск,\n';
const vyacheslav_2 = 'тел: <b>+7 928 970-80-80</b>,\n';
const vyacheslav_3 =
  '<a href="https://www.google.com/maps/place/ВЕЛО+МОТО+26,+ул.+Андрея+Губина,+62,+Кисловодск,+Ставропольский+край,+357736/data=!4m2!3m1!1s0x40582bac3b2b2b0f:0x121e7bfa6b811562?utm_source=mstt_1&entry=gps&g_ep=CAESBzExLjM1LjEYACD___________8BKgA%3D">www.google.com/maps</a>\n\n';
const vyacheslavStr = `${vyacheslav_1}${vyacheslav_2}${vyacheslav_3}`;

// веломастерская Фристайл
const freestyle_1 = 'Александр Велоремонт, г.Пятигорск,\n';
const freestyle_2 = 'тел: <b>+7 961 477-00-99</b>,\n\n';
const freestyleStr = `${freestyle_1}${freestyle_2}`;

// веломастерская Фрирайд
const freeride_1 = '"Freeride" (mtb), г.Ессентуки,\n';
const freeride_2 = 'тел: <b>+7 963 384-45-94</b>,\n';
const freeride_3 =
  '<a href="https://www.google.com/maps/place/Freeride,+Привокзальный+рынок+павильон+45,+Железнодорожная+ул.,+1,+Ессентуки,+Ставропольский+край,+357601/data=!4m2!3m1!1s0x40578496c899e399:0x9d74ff479e807e82?utm_source=mstt_1&entry=gps&g_ep=CAESBzExLjM1LjEYACD___________8BKgA%3D">www.google.com/maps</a>\n\n';
const freerideStr = `${freeride_1}${freeride_2}${freeride_3}`;

// веломастерская Велоки
const veloki_1 = '"Veloki", г.Кисловодск,\n';
const veloki_2 = 'тел: <b>+7 928 326-27-84</b>,\n';
const veloki_3 = '<a href="https://veloki.ru/">veloki.ru</a>\n\n';
const velokiStr = `${veloki_1}${veloki_2}${veloki_3}`;

// веломастерская Райдер
const rider_1 = '"Райдер", г.Пятигорск,\n';
const rider_2 = 'тел: <b>+7 918 77 64 000</b>,\n';
const rider_3 = '<a href="https://www.google.ru/maps/place/Райдер/@44.0375473,43.0640047,18.25z/data=!4m14!1m7!3m6!1s0x405776307b42ae9b:0xd647b24dc648266a!2z0KDQsNC50LTQtdGA!8m2!3d44.037481!4d43.0648622!16s%2Fg%2F11b6qcc49b!3m5!1s0x405776307b42ae9b:0xd647b24dc648266a!8m2!3d44.037481!4d43.0648622!16s%2Fg%2F11b6qcc49b?entry=ttu">rider.su</a>\n\n';
const riderStr = `${rider_1}${rider_2}${rider_3}`;

export const texts = {
  start: 'При нажатии "/" вызываются команды бота!\nИли воспользуйтесь /help',
  help: '	Могу вот это: \n/webcam - Вебкамеры 🎦\n/repair - Веломастерские 🛠\n/info - Информационные ресурсы ❗️',
  bikeMaster: [vyacheslavStr, freestyleStr, freerideStr, velokiStr, riderStr],
};
