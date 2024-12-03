import { Inter, Montserrat, Dancing_Script } from 'next/font/google'

export const mont = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-mont',
})

export const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal'],
  variable: '--font-caveat'
});

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
