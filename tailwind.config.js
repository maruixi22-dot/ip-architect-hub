/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 背景色系统
        bg: {
          primary: '#0B0F14',
          secondary: '#0D1117',
          tertiary: '#11161C',
          elevated: '#161B22',
          hover: 'rgba(255, 255, 255, 0.03)',
        },

        // 文字色系统
        text: {
          primary: '#E6EDF3',
          secondary: '#9BA7B4',
          tertiary: '#6E7681',
          placeholder: '#484F58',
          muted: '#6E7681',
        },

        // 强调色系统
        accent: {
          primary: '#4F46E5',
          secondary: '#7C3AED',
          gradient: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
        },

        // 分割线
        border: {
          subtle: 'rgba(255, 255, 255, 0.06)',
          default: 'rgba(255, 255, 255, 0.1)',
          strong: 'rgba(255, 255, 255, 0.15)',
        },
      },

      // 阴影系统
      boxShadow: {
        'glow': '0 0 20px rgba(79, 70, 229, 0.3)',
        'glow-lg': '0 0 40px rgba(79, 70, 229, 0.4)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.2) inset',
        'card-hover': '0 8px 20px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.2) inset',
        'glass': '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
      },

      // 背景模糊
      backdropBlur: {
        xs: '2px',
      },

      // 间距系统
      spacing: {
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
      },

      // 圆角系统
      borderRadius: {
        '4xl': '2rem',
      },

      // 动画
      animation: {
        'float': 'float 0.3s ease-out',
        'glow-pulse': 'glow-pulse 1.5s infinite',
        'gradient-flow': 'gradient-flow 3s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(79, 70, 229, 0.4)' },
          '50%': { boxShadow: '0 0 0 4px rgba(79, 70, 229, 0)' },
        },
        'gradient-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },

      // 字体
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        mono: [
          'SF Mono',
          'Monaco',
          'Cascadia Code',
          'Roboto Mono',
          'Courier New',
          'monospace',
        ],
      },

      // 背景大小
      backgroundSize: {
        '300': '300%',
        '400': '400%',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    ({ addUtilities }) => {
      const newUtilities = {
        '.text-gradient': {
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.bg-noise': {
          'position': 'relative',
          '&::before': {
            content: '',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            'background-image': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
            'pointer-events': 'none',
            'z-index': '9999',
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
