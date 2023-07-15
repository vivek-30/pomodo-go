'use client';

import { useState, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ModeContext } from '@contexts/modeContext';
import styles from '@styles/components/header.module.scss';

const Header = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const router = useRouter();
  const { state } = useContext(ModeContext);

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
      <nav className={styles['nav']}>
        <div className={styles['nav__logo']}>
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
        <div className={styles['nav__links-container']}>
          <ul role="list" className={`${styles['links-container__links']} ${styles[state.mode]}`}>
            <li>
              <Link href="/analytics">
                <div data-tool-tip="Analytics" className={`${styles['links__btn']} flex-center`}>
                  <Image
                    src="/assets/icons/analytics.svg"
                    alt="analytics icon"
                    height={20}
                    width={20}
                  />
                  <span>Analytics</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/settings">
                <div data-tool-tip="Settings" className={`${styles['links__btn']} flex-center`}>
                  <Image
                    src="/assets/icons/settings.svg"
                    alt="settings icon"
                    height={20}
                    width={20}
                  />
                  <span>Settings</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <div data-tool-tip="About" className={`${styles['links__btn']} flex-center`}>
                  <Image
                    src="/assets/icons/description.svg"
                    alt="description icon"
                    height={22}
                    width={22}
                  />
                  <span>About</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles['nav__profile']}>
          <div className="flex-center" onClick={handleProfileNav}>
            <span>
              <Image
                src="/assets/icons/user.svg"
                alt="profile icon"
                height={120}
                width={120}
              />
            </span>
            <span>
              <Image
                src={`/assets/icons/${isDropDownOpen ? 'up' : 'down'}-arrow.svg`}
                alt={`${isDropDownOpen ? 'up' : 'down'} icon`}
                height={90}
                width={90}
              />
            </span>
          </div>
        </div>
        <div className={`${styles['profile__sidenav']} ${!isDropDownOpen ? styles['sidenav--close'] : ''}`}>
          <ul role="list">
            <li onClick={setDarkMode}>
              <Image
                src="/assets/icons/magic-stick.svg"
                alt="magic stick icon"
                height={20}
                width={20}
              />
              <span>Dark Mode</span>
            </li>
            <li onClick={() => router.push('/analytics')}>
              <Image
                src="/assets/icons/analytics.svg"
                alt="analytics icon"
                height={20}
                width={20}
              />
              <span>Analytics</span>
            </li>
            <li onClick={() => router.push('/settings')}>
              <Image
                src="/assets/icons/settings.svg"
                alt="settings icon"
                height={22}
                width={22}
              />
              <span>Settings</span>
            </li>
            <li onClick={() => router.push('/about')}>
              <Image
                src="/assets/icons/description.svg"
                alt="description icon"
                height={22}
                width={22}
              />
              <span>About</span>
            </li>
            <li onClick={handleUserSignOut}>
              <Image
                src="/assets/icons/logout.svg"
                alt="logout icon"
                height={20}
                width={20}
              />
              <span>SignOut</span>
            </li>
            <li onClick={handleAccountDeletion}>
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
      <div className={`${styles['divider']} ${styles[state.mode]}`}></div>
    </header>
  );
}

export default Header;
