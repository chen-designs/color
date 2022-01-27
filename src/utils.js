const Color = require('color')

const formats = ['hex', 'rgb', 'hsl']

const formatter = format => {
	if (!format || formats.indexOf(format) < 0) {
		return 'hex'
	}
	return format
}

exports.rgbStr = color => {
	return Color(color).rgb().round().color.join(',')
}

exports.colorStr = (color, format) => {
	const fmt = formatter(format)

	if (fmt === 'hex') return color[fmt]()

	return color[fmt]().round().string()
}
