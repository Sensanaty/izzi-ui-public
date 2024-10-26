/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			"borderColor": { "DEFAULT": "rgb(64 64 64 / 0.6)" },
		},
	},
	plugins: [],
}
