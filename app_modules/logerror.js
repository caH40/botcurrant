const fs = require('fs')


const getDate = () => new Date().toLocaleDateString()
const path = `./logs/errors/${getDate()}_err.json`

const addLogError = (error) => {
	try {
		fs.appendFile(path, `${new Date().toLocaleString()}:${JSON.stringify(error)}\n`, err => {
			if (err) {
				console.log(`${new Date().toLocaleString()}: ошибка записи логов в error`)
			}
		})
	} catch { console.log(`${new Date().toLocaleString()}: ошибка чтения/записи логов error`) }
}

module.exports = addLogError