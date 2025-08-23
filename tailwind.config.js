/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta DTavern
        'tavern-wood': '#4B2E19',        // Madeira escura - fundo estrutural, paredes e barras
        'candlelight-gold': '#FFD36A',   // Luz de vela/brilho mágico - destaques, botões principais
        'brass-accent': '#C58B3D',       // Latão/Metais - ícones, bordas e detalhes decorativos
        'warm-amber': '#FFB347',         // Âmbar aconchegante - botões secundários, hovers
        'stone-gray': '#8C7A6B',         // Pedra medieval - texto secundário, cards
        'scroll-beige': '#E9D7B8',       // Pergaminho envelhecido - fundos de texto, modais
        
        // Paleta auxiliar
        'midnight-brown': '#1C0F0A',     // Quase preto - texto principal em fundo claro
        'ash-smoke': '#5A4B43',          // Cinza esfumaçado - divisórias, sombras
        
        // Cores de sistema (mantidas para compatibilidade)
        'background': '#4B2E19',
        'foreground': '#E9D7B8',
        'card': '#8C7A6B',
        'muted': '#5A4B43',
        'accent': '#FFD36A',
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
