const generate = require('./generate')
const { rgbStr, colorStr } = require('./utils')

const COLORS = {
	red: '#F53F3F',
	orangered: '#F77234',
	orange: '#FF7D00',
	gold: '#F7BA1E',
	yellow: '#FADC19',
	lime: '#9FDB1D',
	green: '#00B42A',
	cyan: '#14C9C9',
	blue: '#3491FA',
	purple: '#722ED1',
	pinkpurple: '#D91AD9',
	magenta: '#F5319D',
	chenblue: '#165DFF'
}

exports.generate = generate

exports.rgbStr = rgbStr

exports.colorStr = colorStr

exports.presetColors = (function () {
	const presets = Object.create(null)

	Object.keys(COLORS).forEach(key => {
		presets[key] = Object.create(null)
		presets[key].primary = COLORS[key]
		presets[key].light = generate(COLORS[key], { list: true })
		presets[key].dark = generate(COLORS[key], { list: true, dark: true })
	})

	presets['gray'] = {
		primary: '#6b7785',
		light: ['#f7f8fa', '#f2f3f5', '#e5e6eb', '#c9cdd4', '#a9aeb8', '#86909c', '#6b7785', '#4e5969', '#272e3b', '#1d2129'],
		dark: ['#17171a', '#2e2e30', '#484849', '#5f5f60', '#78787a', '#929293', '#ababac', '#c5c5c5', '#dfdfdf', '#f6f6f6']
	}

	return Object.freeze(presets)
})()
