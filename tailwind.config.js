/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: ["class", '[data-mode="dark"]'],
	// important: true,
	theme: {
		fontFamily: {
			mono: ["FiraCode", "ui-monospace", "SFMono-Regular"]
		},
		fontSize: {
			DEFAULT: ["1rem", "2em"],
			title: ["20px", "1.2"],
			sm: ["15px", "20px"],
			lg: ["18px", "28px"],
			xl: ["20px", "32px"],
			"2xl": ["30px", "36px"],
			"4xl": ["36px", "40px"]
		},
		borderRadius: {
			terminal: "0.625rem",
			selection: "0.2rem"
		},
		colors: {
			"background-color": "var(--background-color)",
			"window-color": "var(--window-color)",
			"glow-color": "var(--glow-color)",
			transparent: "#00000000",
			textColor: "var(--text-color)",
			white: "var(--white)",
			gray: "var(--gray)",
			black: "var(--black)",
			red: "var(--red)",
			green: "var(--green)",
			yellow: "var(--yellow)",
			blue: "var(--blue)",
			cyan: "var(--cyan)",
			magenta: "var(--magenta)"
		},
		extend: {
			maxWidth: {
				terminal: "50rem",
				'terminal-1': "20rem",
				'terminal-2': "35rem",
				'terminal-3': "50rem",
				'terminal-4': "65rem",
				'terminal-5': "80rem",
				'terminal-6': "95rem",
			},
			padding: {
				terminal: "0.9rem"
			},
			margin: {
				line: "1.4rem"
			},
			spacing: {
				full: "100%"
			},
			animation: {
				fadeIn: "fadeIn 0.15s ease-in-out"
			},
			blur: {
				wallpaper: "8px"
			},
			keyframes: () => ({
				fadeIn: {
					"0%": { opacity: 0 },
					"100%": { opacity: 1 }
				}
			})
		}
	},
	plugins: [],
	safelist: [
		"background-color",
		"window-color",
		"glow-color",
		{
			pattern:
				/(bg|text|border|caret)-(white|gray|black|red|green|yellow|blue|cyan|magenta|textColor)/
		},
		"max-w-terminal-1",
		"max-w-terminal-2",
		"max-w-terminal-3",
		"max-w-terminal-4",
		"max-w-terminal-5",
		"max-w-terminal-6",
		"grid-cols-1",
		"grid-cols-2",
		"grid-cols-3",
		"grid-cols-4",
		"grid-cols-5",
		"grid-cols-6",
	]
}
