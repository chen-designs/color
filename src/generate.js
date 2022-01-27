const { palette, darkPalette } = require('./palette.js')

module.exports = function (color, options = {}) {
	const { dark, list, index = 6, format = 'hex' } = options

	if (list) {
		const list = []
		const func = dark ? darkPalette : palette
		for (let i = 1; i <= 10; i++) {
			list.push(func(color, i, format))
		}
		return list
	}
	return dark ? darkPalette(color, index, format) : palette(color, index, format)
}
