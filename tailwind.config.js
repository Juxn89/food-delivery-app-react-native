/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
			colors: {
				primary: '#fe8c00',
				white: {
					DEFAULT: '#ffffff',
					100: '#fafafa',
					200: '#fe8c00'
				},
				gray: {
					100: '#878787',
					200: '#fe8c00'
				},
				dark: {
					100: '#181c2e'
				},
				error: '#f14141',
				success: '#2f9b65'
			},
			fontFamily: {
				quicksand: ['Quicksand-Regular', 'sans-serif'],
				"quicksand-bold": ['Quicksand-Bold', 'sans-serif'],
				'quicksand-semibold': ['Quicksand-SemiBold', 'sans-serif'],
				'quicksand-light': ['Quicksand-Light', 'sans-serif'],
				"quicksand-medium": ['Quicksand-Medium', 'sans-serif']
			}
		},
  },
  plugins: [],
}