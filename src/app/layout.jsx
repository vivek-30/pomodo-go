import Header from '@components/Header';
import { Poppins } from 'next/font/google';
import '@styles/globals.scss';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '600', '800']
});

export const metadata = {
  charset: 'utf-8',
  applicationName: 'PomodoGo',
  authors: [{ name: 'Vivek Singh' }],
  themeColor: 'black',
  // icons: {
  //   icon: '/favicon.ico',
  //   apple: '/apple-touch-icon.png'
  // },
  // manifest: '/manifest.json'
  title: 'PomodoGo | Pomodoro App',
  description: 'This application implements pomodoro technique\
  to allow user accomplish their tasks with full focus.',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header />
        { children }
      </body>
    </html>
  );
}

export default RootLayout;
