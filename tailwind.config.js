/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores do tema medieval
        'tavern-wood': '#8B4513',
        'tavern-brass': '#CD7F32',
        'magical-glow': '#FFD700',
        'accent': '#FF6B35',
        'background': '#1a1a1a',
        'foreground': '#f5f5f5',
        'card': '#2a2a2a',
        'muted': '#3a3a3a',
      },
      fontFamily: {
        'medieval': ['Cinzel', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
