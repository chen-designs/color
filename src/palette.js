const Color = require('color')
const { colorStr } = require('./utils')

/**
 * 色板 - 动态梯度算法
 * @param {*} originColor
 * @param {*} index
 * @param {*} format
 */
exports.palette = function (originColor, index, format) {
	const color = Color(originColor)
	const h = color.hue()
	const s = color.saturationv()
	const v = color.value()

	const hueStep = 2
	const maxSaturationStep = 100
	const minSaturationStep = 9

	const maxValue = 100
	const minValue = 30

	const getNewHue = (isLight, i) => {
		let hue
		if (h >= 60 && h <= 240) {
			hue = isLight ? h - hueStep * i : h + hueStep * i
		} else {
			hue = isLight ? h + hueStep * i : h - hueStep * i
		}
		if (hue < 0) {
			hue += 360
		} else if (hue >= 360) {
			hue -= 360
		}
		return Math.round(hue)
	}

	const getNewSaturation = (isLight, i) => (isLight ? (s <= minSaturationStep ? s : s - ((s - minSaturationStep) / 5) * i) : s + ((maxSaturationStep - s) / 4) * i)

	const getNewValue = (isLight, i) => (isLight ? v + ((maxValue - v) / 5) * i : v <= minValue ? v : v - ((v - minValue) / 4) * i)

	const isLight = index < 6
	const i = isLight ? 6 - index : index - 6

	const retColor =
		index === 6
			? color
			: Color({
					h: getNewHue(isLight, i),
					s: getNewSaturation(isLight, i),
					v: getNewValue(isLight, i)
			  })

	return colorStr(retColor, format)
}

/**
 * 暗色色板 - 动态梯度算法
 * @param {*} originColor
 * @param {*} index
 * @param {*} format
 */
exports.darkPalette = function (originColor, index, format) {
	const lightColor = Color(exports.palette(originColor, 10 - index + 1))
	const originBaseColor = Color(originColor)

	const originBaseHue = originBaseColor.hue()
	const originBaseSaturation = originBaseColor.saturationv()
	const baseColor = Color({
		h: originBaseColor.hue(),
		s: getNewSaturation(6),
		v: originBaseColor.value()
	})

	const baseSaturation = baseColor.saturationv()
	const step = Math.ceil((baseSaturation - 9) / 4)
	const step1to5 = Math.ceil((100 - baseSaturation) / 5)

	function getNewSaturation(i) {
		if (i < 6) return baseSaturation + (6 - i) * step1to5
		if (i === 6) {
			if (originBaseHue >= 0 && originBaseHue < 50) return originBaseSaturation - 15
			if (originBaseHue >= 50 && originBaseHue < 191) return originBaseSaturation - 20
			if (originBaseHue >= 191 && originBaseHue <= 360) return originBaseSaturation - 15
		}
		return baseSaturation - step * (i - 6)
	}

	const retColor = Color({
		h: lightColor.hue(),
		s: getNewSaturation(index),
		v: lightColor.value()
	})

	return colorStr(retColor, format)
}
