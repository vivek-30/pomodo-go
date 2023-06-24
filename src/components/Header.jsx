import Link from 'next/link';
import Image from 'next/image';
import styles from '@styles/header.module.css';

const Header = () => {
  return (
    <header>
      <nav className={styles['primary-nav']}>
        <div className={styles.logo}>
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
        <div className={styles['nav-links-container']}>
          <ul role="list" className={styles['nav-links']}>
            <li>
              <Link href="/analytics">
                <div className={styles['icon-btn-div']}>
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
                <div className={styles['icon-btn-div']}>
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
                <div className={styles['icon-btn-div']}>
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
        <div className="profile">
          <div className={styles['icon-btn-div']}>
            <Image
              src="/assets/icons/user.svg"
              alt="profile icon"
              height={20}
              width={20}
            />
            <span>Profile</span>
          </div>
        </div>
      </nav>
      <div className={styles.divider}></div>
    </header>
  );
}

export default Header;
