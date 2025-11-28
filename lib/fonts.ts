// app/lib/fonts.ts
import localFont from 'next/font/local';

export const coldiac = localFont({
  src: [
    { path: '/fonts/Coldiac.ttf', weight: '400', style: 'normal' },
    { path: '/fonts/ColdiacItalic.ttf', weight: '400', style: 'italic' },
  ],
  variable: '--font-coldiac',
  display: 'swap',
});

export const cormorant = localFont({
  src: [
    { path: '/fonts/CormorantGaramondRegular.ttf', weight: '400', style: 'normal' },
    
  ],
  variable: '--font-cormorant',
  display: 'swap',
});

export const parisienne = localFont({
  src: '/fonts/ParisienneRegular.ttf',
  variable: '--font-parisienne',
  display: 'swap',
});
