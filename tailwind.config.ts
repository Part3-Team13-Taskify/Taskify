/** @type {import('tailwindcss').Config} */

const rem0_10 = { ...Array.from(Array(11)).map((_, i) => `${i / 10}rem`) };
const rem0_100 = { ...Array.from(Array(101)).map((_, i) => `${i / 10}rem`) };
const rem0_1200 = { ...Array.from(Array(1201)).map((_, i) => `${i / 10}rem`) };

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderWidth: rem0_10,
      borderRadius: rem0_100,
      fontSize: rem0_100,
      lineHeight: rem0_100,
      minWidth: rem0_1200,
      minHeight: rem0_1200,
      spacing: rem0_1200,
      colors: {
        blue: {
          DEFAULT: '#4981D5',
          bg: '#DBE6F7',
        },
        gray: {
          78: '#787486',
          '9f': '#9FA6B2',
          d9: '#D9D9D9',
          ee: '#EEEEEE',
          fa: '#FAFAFA',
        },
        black: {
          DEFAULT: '#000',
          17: '#171717',
          33: '#333236',
          '4b': '#4B4B4B',
          overlay: 'rgba(0, 0, 0, 0.70)', // 모달창 뒷 배경
        },
        red: '#D6173A',
        green: {
          DEFAULT: '#86D549',
          bg: '#E7F7DB',
        },
        purple: '#760DDE',
        orange: {
          DEFAULT: '#FFA500',
          bg: '#F9EEE3',
        },
        pink: {
          DEFAULT: '#D549B6',
          bg: '#F7DBF0',
        },
        violet: {
          DEFAULT: '#5534DA',
          '8%': '#F1EFFD',
          dark: '#2b1193',
        },
        white: '#FFF',
        'beige-f9': '#F9F7F7',
      },
      screens: {
        tablet: { max: '1199px' },
        mobile: { max: '767px' },
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      zIndex: {
        DEFAULT: '1',
        dropdown: '200',
        sticky: '400',
        popover: '600',
        overlay: '800',
        modal: '1000',
        toast: '1200',
      },
    },
  },
  plugins: [],
};
