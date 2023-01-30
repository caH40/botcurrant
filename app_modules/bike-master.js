import { texts } from './texts.js';
import { shuffle } from './shuffle.js';

export async function bikeMaster(bot) {
	try {
		const shufflePostsArr = shuffle(texts.bikeMaster);

		let shufflePosts = '';
		shufflePostsArr.forEach(post => (shufflePosts = shufflePosts + post));

		await bot.reply(shufflePosts, { parse_mode: 'html', disable_web_page_preview: true });
	} catch (error) {
		console.log(error);
	}
}
