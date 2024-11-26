'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export function Header() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    function onRouteChangeStart() {
      setIsLoading(true);
    }

    function onRouteChangeComplete() {
      timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }

    window.addEventListener('routeChangeStart', onRouteChangeStart);
    window.addEventListener('routeChangeComplete', onRouteChangeComplete);
    window.addEventListener('routeChangeError', onRouteChangeComplete);

    return () => {
      window.removeEventListener('routeChangeStart', onRouteChangeStart);
      window.removeEventListener('routeChangeComplete', onRouteChangeComplete);
      window.removeEventListener('routeChangeError', onRouteChangeComplete);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.title}>
          Podcaster
        </Link>
        {isLoading && <div className={styles.loader} />}
      </div>
    </header>
  );
}
