'use client';
import { useContext } from 'react';
import Header from '@components/Header';
import { Poppins } from 'next/font/google';
import { ModeContext } from '@contexts/modeContext';
import '@styles/globals.scss';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '600', '800']
});

const App = ({ parentsChild }) => {
  const { state } = useContext(ModeContext);

  return (
    <body className={`${poppins.className} body--${state.mode}`}>
      <Header />
      { parentsChild }
    </body>
  );
}

export default App;
