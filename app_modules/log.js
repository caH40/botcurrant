const fs = require('fs')
const logerror = require('./logerror')

const getDate = () => new Date().toLocaleDateString()
const path = `./logs/log/${getDate()}.json`
const creatNewLog = () => {
	fs.writeFile(path, '[]', err => {
		if (err) {
			logerror(err)
		}
	})
}
// update информация о запросе
const addLog = async function (update) {
	//проверка наличия файла с текущей датой
	if (!fs.existsSync(path)) {
		await creatNewLog()
	}
	fs.readFile(path, 'utf-8', (err, content) => {
		if (err) {
			logerror(err)
		}
		try {
			const contentArr = JSON.parse(content)
			contentArr.push(update)
			fs.writeFile(path, JSON.stringify(contentArr), err => {
				if (err) {
					logerror(err)
				}
			})
		} catch { logerror(`${new Date().toLocaleString()}: ошибка чтения/записи логов`) }
	})
}

module.exports = addLog