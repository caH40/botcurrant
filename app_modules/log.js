const fs = require('fs')
const logerror = require('./logerror')

const getDate = () => new Date().toLocaleDateString()
const dirDate = () => ((new Date().getMonth()) + 1) + '.' + (new Date().getFullYear())
const pathDir = `./logs/log/${dirDate()}`
const path = `./logs/log/${dirDate()}/${getDate()}.json`
const creatNewDir = () => { fs.mkdirSync(pathDir) }
const creatNewLog = () => {
	fs.writeFile(path, '[]', err => {
		if (err) {
			logerror(err)
		}
	})
}


// update информация о запросе
const addLog = async function (update) {
	// проверка наличия папки mm.yyyy, если нет то создаем
	if (!fs.existsSync(pathDir)) {
		creatNewDir()
	}
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