/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,vue}"],
	theme: {
		extend: {
			colors: {
				"primary": '#4000FFFF',
				// "primary-highlight": '#B8AFF8',
				"primary-highlight": '#DED9FC',
				"primary-dark": '#897CFFFF',
				"primary-dark-highlight": '#18192E',
				"dark": '#101014',
			}
		},
	},
	plugins: [],
};