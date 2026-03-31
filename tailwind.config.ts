import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#303C42',
        cream: '#FFF7D4',
        peach: '#FFEFE6',
        mint: '#D9FFF5',
        accent: '#2980B9',
        teal: '#148F77',
        positive: '#1E8449',
        negative: '#C0392B',
        amber: '#F39C12',
        'text-primary': '#2C3E50',
        'text-secondary': '#7F8C8D',
        bg: '#F8F9FA',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
