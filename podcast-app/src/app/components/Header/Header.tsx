'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './Header.module.css';

export function Header() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Set loading to true when navigation starts
  useEffect(() => {
    setIsLoading(true);
    
    // Navigation completed
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.title}>
          Podcaster
        </Link>
        <div className={`${styles.loader} ${isLoading ? styles.visible : ''}`} />
      </div>
    </header>
  );
}