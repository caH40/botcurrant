export function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		//берем случайное число, меньшее текущего индекса
		let j = Math.floor(Math.random() * (i + 1));
		//меняем местами элементы в массиве
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}
