/** @type {import("prettier").Config} */
module.exports = {
	plugins: [require.resolve('prettier-plugin-tailwindcss')],
	arrowParens: 'avoid',
	singleQuote: true,
	useTabs: true,
	trailingComma: 'none',
	tabWidth: 1
};
