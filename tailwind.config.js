/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {},
	},
	safelist: [
		'bg-green-400',
		'bg-yellow-400',
		'bg-red-400',
		'from-green-400',
		'from-yellow-400',
		'from-red-400',
		'to-green-400',
		'to-yellow-400',
		'to-red-400',
	],
	plugins: [],
};
