/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,vue}"],
	theme: {
		extend: {
			colors: {
				"primary": '#4000FFFF',
				"primary-dark": '#897CFFFF',
				"dark": '#101014',
			}
		},
	},
	plugins: [],
};