/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-primary": "#16D5FF",
        maintheme: "#00D1FF",
      },
      borderRadius: {
        "3xl": "30px",
      },
      fontFamily: {
        gothic: ["Century Gothic", "sans-serif"],
        century: ["Century Gothic", "sans-serif"],
        roboto: ['Roboto Serif', 'serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // colors: {
      // 	background: 'hsl(var(--background))',
      // 	foreground: 'hsl(var(--foreground))',
      // 	card: {
      // 		DEFAULT: 'hsl(var(--card))',
      // 		foreground: 'hsl(var(--card-foreground))'
      // 	},
      // 	popover: {
      // 		DEFAULT: 'hsl(var(--popover))',
      // 		foreground: 'hsl(var(--popover-foreground))'
      // 	},
      // 	primary: {
      // 		DEFAULT: 'hsl(var(--primary))',
      // 		foreground: 'hsl(var(--primary-foreground))'
      // 	},
      // 	secondary: {
      // 		DEFAULT: 'hsl(var(--secondary))',
      // 		foreground: 'hsl(var(--secondary-foreground))'
      // 	},
      // 	muted: {
      // 		DEFAULT: 'hsl(var(--muted))',
      // 		foreground: 'hsl(var(--muted-foreground))'
      // 	},
      // 	accent: {
      // 		DEFAULT: 'hsl(var(--accent))',
      // 		foreground: 'hsl(var(--accent-foreground))'
      // 	},
      // 	destructive: {
      // 		DEFAULT: 'hsl(var(--destructive))',
      // 		foreground: 'hsl(var(--destructive-foreground))'
      // 	},
      // 	border: 'hsl(var(--border))',
      // 	input: 'hsl(var(--input))',
      // 	ring: 'hsl(var(--ring))',
      // 	chart: {
      // 		'1': 'hsl(var(--chart-1))',
      // 		'2': 'hsl(var(--chart-2))',
      // 		'3': 'hsl(var(--chart-3))',
      // 		'4': 'hsl(var(--chart-4))',
      // 		'5': 'hsl(var(--chart-5))'
      // 	}
      // }
      colors: {
        cyan: "#16D5FF",
        maintheme: "#00D1FF",
        "dark-navy": "#0A1F2C",
        "midnight-blue": "#14253C",
        "light-gray": "#E8F2F7",
        "bright-green": "#00E676",
        "warning-orange": "#FFAB40",
        "text-dark-gray": "#2D2D2D",
      },
    },
  },
  // plugins: [require("tailwindcss-animate")],
};
