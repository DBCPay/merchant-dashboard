/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          focus: "hsl(var(--primary-focus))",
        },
        "secondary-blue": {
          DEFAULT: "hsl(var(--secondary-blue))",
          foreground: "hsl(var(--secondary-blue-foreground))",
          hover: "hsl(var(--secondary-blue-hover))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          foreground: "hsl(var(--tertiary-foreground))",
          hover: "hsl(var(--tertiary-hover))",
        },
        "secondary-gray": {
          DEFAULT: "hsl(var(--secondary-gray))",
          foreground: "hsl(var(--secondary-gray-foreground))",
          hover: "hsl(var(--secondary-gray-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderColor: {
        primary: {
          focus: "hsl(var(--primary-focus))",
        },
        "secondary-blue": {
          focus: "hsl(var(--secondary-blue-focus))",
        },
        tertiary: {
          focus: "hsl(var(--tertiary-focus))",
        },
        "secondary-gray": {
          DEFAULT: "hsl(var(--secondary-gray-border))",
          focus: "hsl(var(--secondary-gray-focus-border))",
          hover: "hsl(var(--secondary-gray-hover-border))",
        },
      },
      boxShadow: {
        primary: "0px 0px 0px 5px hsl(var(--primary-focus-shadow)) !important",
        "secondary-blue":
          "0px 0px 0px 5px hsl(var(--secondary-blue-focus-shadow)) !important",
        tertiary:
          "0px 0px 0px 5px hsl(var(--tertiary-focus-shadow)) !important",
        "secondary-gray":
          "0px 0px 0px 5px hsl(var(--secondary-gray-focus-shadow)) !important",
        tooltip: "0px 4px 16px 3px #0000001F",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
