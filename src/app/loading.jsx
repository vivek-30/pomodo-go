'use client';
import { useContext } from 'react';
import { ModeContext } from '@contexts/modeContext';

const Loading = () => {
  const { state: { mode } } = useContext(ModeContext);
  
  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center">
      <div className={`relative w-16 h-16 border-[0.4rem] border-[#333] rounded-full before:absolute before:content-[''] before:w-[0.3rem] before:h-6 before:origin-top before:top-2/4 before:left-2/4 before:animate-spin ${mode === 'focus' ? 'before:bg-red-800' : mode === 'short-break' ? 'before:bg-green-800' : 'before:bg-sky-800'}`} />
      <p className="my-2 mx-auto text-2xl">Loading...</p>
    </section>
  );
}

export default Loading;
