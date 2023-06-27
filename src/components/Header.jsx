import Link from 'next/link';
import Image from 'next/image';
import styles from '@styles/header.module.css';

const Header = () => {
  return (
    <header>
      <nav className={styles['primary-nav']}>
        <div className={styles.logo}>
          <Link href="/" as="image">
            <Image
              src="/assets/images/logo-transparent.png"
              alt="pomodoGO logo"
              height={120}
              width={120}
              priority={true}
            />
          </Link>
        </div>
        <div className={styles['nav-links-container']}>
          <ul role="list" className={styles['nav-links']}>
            <li>
              <Link href="/analytics">
                <div data-tool-tip="Analytics" className={`${styles['icon-btn-div']} flex-center`}>
                  <Image
                    src="/assets/icons/statistics.svg"
                    alt="analytics icon"
                    height={20}
                    width={20}
                  />
                  <span>Analytics</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <div data-tool-tip="About" className={`${styles['icon-btn-div']} flex-center`}>
                  <Image
                    src="/assets/icons/more.svg"
                    alt="about icon"
                    height={20}
                    width={20}
                  />
                  <span>About</span>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/settings">
                <div data-tool-tip="Settings" className={`${styles['icon-btn-div']} flex-center`}>
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
          </ul>
        </div>
        <div className={styles.profile}>
          <div className="flex-center">
            <span>
              <Image
                src="/assets/icons/user.svg"
                alt="profile icon"
                height={35}
                width={35}
              />
            </span>
            <span>
              <Image
                src="/assets/icons/more.svg"
                alt="more icon"
                height={20}
                width={20}
              />
            </span>
          </div>
        </div>
      </nav>
      <div className={styles.divider}></div>
    </header>
  );
}

export default Header;
