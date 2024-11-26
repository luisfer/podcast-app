'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './Header.module.css';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';

export function Header() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  const breadcrumbs = useBreadcrumbs(pathname || '/');

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <Link href="/" className={styles.title}>
            Podcaster
          </Link>
            <div className={styles.breadcrumbsContainer}>
              <nav className={styles.breadcrumbs} aria-label="Breadcrumb navigation">
              {breadcrumbs.length > 1 && breadcrumbs.map((crumb, index) => (
                <span key={crumb.path} className={styles.breadcrumbItem}>
                  {index > 0 && <span className={styles.separator}>/</span>}
                  <Link href={crumb.path} className={styles.breadcrumbLink}>
                    {crumb.label}
                  </Link>
                </span>
              ))}
            </nav>
            </div>
        </div>
        <div className={`${styles.loader} ${isLoading ? styles.visible : ''}`} />
      </div>
    </header>
  );
}