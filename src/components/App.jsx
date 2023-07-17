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
  const { state: { mode } } = useContext(ModeContext);

  return (
    <body className={`
      ${poppins.className} 
      ${mode === 'focus' ? 'bg-red-100' : mode === 'short-break' ? 'bg-green-100' : 'bg-blue-100'}
    `}>
      <Header />
      {parentsChild}
    </body>
  );
}

export default App;
