import App from '@components/App';
import ContextProvider from '@contexts/contextProvider';

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
      <ContextProvider>
        <App parentsChild={children} />
      </ContextProvider>
    </html>
  );
}

export default RootLayout;
