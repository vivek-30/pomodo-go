'use client';

import { useState, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ModeContext } from '@contexts/modeContext';

const Header = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const router = useRouter();
  const { state: { mode } } = useContext(ModeContext);

  const handleProfileNav = () => {
    setIsDropDownOpen(currentState => !currentState);
  }

  const setDarkMode = () => {
    console.log('dark mode enabled')
  }

  const handleUserSignOut = () => {
    console.log('handling user signout')
  }

  const handleAccountDeletion = () => {
    console.log('handling account deletion')
  }

  return (
    <header>
      <nav className="min-w-[375px] relative h-[6.5rem] px-8 flex justify-between items-center text-center">
        <div>
          <Link href="/">
            <Image
              src="/assets/images/logo-transparent.png"
              alt="pomodoGO logo"
              height={120}
              width={120}
              priority={true}
            />
          </Link>
        </div>
        <div>
          <ul role="list" className="hidden sm:flex justify-center items-center gap-[0.3rem]">
            <li>
              <Link href="/analytics">
                <div data-tool-tip="Analytics" className={`relative md:static py-[0.7rem] px-4 flex justify-center items-center gap-2 rounded-[5px] text-[1.08rem] text-gray-800 cursor-pointer ${mode === 'focus' ? 'bg-red-200' : mode === 'short-break' ? 'bg-green-200' : 'bg-blue-200'} hover:scale-[0.98] before:content-[''] before:hidden before:absolute hover:before:block md:hover:before:hidden before:w-4 before:h-4 before:bg-gray-100 before:rotate-45 before:-bottom-2/4 before:z-20 after:content-[attr(data-tool-tip)] after:hidden after:absolute hover:after:block md:hover:after:hidden after:py-[0.4rem] after:px-[0.8rem] after:text-[0.9rem] after:rounded-[5px] md:after:hidden after:-bottom-full after:bg-gray-100 after:z-20`}>
                  <Image
                    src="/assets/icons/analytics.svg"
                    alt="analytics icon"
                    height={20}
                    width={20}
                  />
                  <span className="hidden md:block">Analytics</span>
                </div>
              </Link>
            </li>

            <li>
              <Link href="/settings">
                <div data-tool-tip="Settings" className={`relative md:static py-[0.7rem] px-4 flex justify-center items-center gap-2 rounded-[5px] text-[1.08rem] text-gray-800 cursor-pointer ${mode === 'focus' ? 'bg-red-200' : mode === 'short-break' ? 'bg-green-200' : 'bg-blue-200'} hover:scale-[0.98] before:content-[''] before:hidden before:absolute hover:before:block md:hover:before:hidden before:w-4 before:h-4 before:bg-gray-100 before:rotate-45 before:-bottom-2/4 before:z-20 after:content-[attr(data-tool-tip)] after:hidden after:absolute hover:after:block md:hover:after:hidden after:py-[0.4rem] after:px-[0.8rem] after:text-[0.9rem] after:rounded-[5px] md:after:hidden after:-bottom-full after:bg-gray-100 after:z-20`}>
                  <Image
                    src="/assets/icons/settings.svg"
                    alt="settings icon"
                    height={20}
                    width={20}
                  />
                  <span className="hidden md:block">Settings</span>
                </div>
              </Link>
            </li>

            <li>
              <Link href="/about">
                <div data-tool-tip="About" className={`relative md:static py-[0.7rem] px-4 flex justify-center items-center gap-2 rounded-[5px] text-[1.08rem] text-gray-800 cursor-pointer ${mode === 'focus' ? 'bg-red-200' : mode === 'short-break' ? 'bg-green-200' : 'bg-blue-200'} hover:scale-[0.98] before:content-[''] before:hidden before:absolute hover:before:block md:hover:before:hidden before:w-4 before:h-4 before:bg-gray-100 before:rotate-45 before:-bottom-2/4 before:z-20 after:content-[attr(data-tool-tip)] after:hidden after:absolute hover:after:block md:hover:after:hidden after:py-[0.4rem] after:px-[0.8rem] after:text-[0.9rem] after:rounded-[5px] md:after:hidden after:-bottom-full after:bg-gray-100 after:z-20`}>
                  <Image
                    src="/assets/icons/description.svg"
                    alt="description icon"
                    height={22}
                    width={22}
                  />
                  <span className="hidden md:block">About</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="flex justify-center items-center gap-2" onClick={handleProfileNav}>
            <span className="cursor-pointer">
              <Image
                src="/assets/icons/user.svg"
                alt="profile icon"
                height={35}
                width={35}
              />
            </span>
            <span className="cursor-pointer">
              <Image
                src={`/assets/icons/${isDropDownOpen ? 'up' : 'down'}-arrow.svg`}
                alt={`${isDropDownOpen ? 'up' : 'down'} icon`}
                height={30}
                width={30}
              />
            </span>
          </div>
        </div>
        <div className={`w-[14.5rem] py-2 px-4 absolute top-[90%] right-[1.9%] bg-gray-100 rounded-lg z-20 before:content-[''] before:absolute before:w-6 before:h-6 before:bg-gray-100 before:rotate-45 before:-top-[2.5%] md:before:right-[21%] before:right-[27%] before:z-20 ${!isDropDownOpen && 'hidden'}`}>
          <ul role="list">
            <li className="w-full my-2 py-[0.8rem] px-[0.6rem] flex items-center gap-[1.2rem] border-b border-b-gray-800 text-gray-800 cursor-pointer opacity-70 hover:opacity-100" onClick={setDarkMode}>
              <Image
                src="/assets/icons/magic-stick.svg"
                alt="magic stick icon"
                height={20}
                width={20}
              />
              <span>Dark Mode</span>
            </li>
            <li className="w-full my-2 py-[0.8rem] px-[0.6rem] flex items-center gap-[1.2rem] border-b border-b-gray-800 text-gray-800 cursor-pointer opacity-70 hover:opacity-100" onClick={() => router.push('/analytics')}>
              <Image
                src="/assets/icons/analytics.svg"
                alt="analytics icon"
                height={20}
                width={20}
              />
              <span>Analytics</span>
            </li>
            <li className="w-full my-2 py-[0.8rem] px-[0.6rem] flex items-center gap-[1.2rem] border-b border-b-gray-800 text-gray-800 cursor-pointer opacity-70 hover:opacity-100" onClick={() => router.push('/settings')}>
              <Image
                src="/assets/icons/settings.svg"
                alt="settings icon"
                height={22}
                width={22}
              />
              <span>Settings</span>
            </li>
            <li className="w-full my-2 py-[0.8rem] px-[0.6rem] flex items-center gap-[1.2rem] border-b border-b-gray-800 text-gray-800 cursor-pointer opacity-70 hover:opacity-100" onClick={() => router.push('/about')}>
              <Image
                src="/assets/icons/description.svg"
                alt="description icon"
                height={22}
                width={22}
              />
              <span>About</span>
            </li>
            <li className="w-full my-2 py-[0.8rem] px-[0.6rem] flex items-center gap-[1.2rem] border-b border-b-gray-800 text-gray-800 cursor-pointer opacity-70 hover:opacity-100" onClick={handleUserSignOut}>
              <Image
                src="/assets/icons/logout.svg"
                alt="logout icon"
                height={20}
                width={20}
              />
              <span>SignOut</span>
            </li>
            <li className="w-full my-2 py-[0.8rem] px-[0.6rem] flex items-center gap-[1.2rem] rounded-[0.4rem] border-b-gray-800 text-gray-800 cursor-pointer opacity-70 hover:opacity-100 hover:bg-red-100 hover:text-red-800" onClick={handleAccountDeletion}>
              <Image
                src="/assets/icons/delete.svg"
                alt="delete icon"
                height={20}
                width={20}
              />
              <span>Delete Account</span>
            </li>
          </ul>
        </div>
      </nav>
      <div className={`w-full min-w-[375px] h-[1px] opacity-100 md:opacity-60 ${mode === 'focus' ? 'bg-pink-800' : mode === 'short-break' ? 'bg-green-800' : 'bg-sky-900'}`} />
    </header>
  );
}

export default Header;
