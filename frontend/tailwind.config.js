/* eslint-disable global-require */
import { white } from 'tailwindcss/colors';
/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'];
export const darkMode = 'class';
export const theme = {
  extend: {
    colors: {
      background: white,
      'darkmode-background': '#475577', // slate-600
      text: '#1a202c', // gray-900
      'darkmode-text': white,
      'sub-text': '#6b7280', // gray-500
      // 'darkmode-sub-text': , // ??
      main: white, // TODO maybe change
      'darkmode-main': '#0F172A', // slate-950
    },
  },
};
export const plugins = [
  require('tailwind-scrollbar'),
];
