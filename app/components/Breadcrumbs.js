'use client';
import { usePathname } from "next/navigation"
import Link from 'next/link'
import styles from './Breadcrumbs.module.css'

const Breadcrumbs = ({ style, location }) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((item) => item !== "");

  return (
    <nav aria-label="breadcrumbs" className={style === "nonmenu" ? styles.breadcrumbsNonmenu : styles.breadcrumbs}>
      <ol className={`${styles.list} ${location}`}>
        <li className={styles.item}><Link href="/">Home</Link></li>
        {segments.map((segment, index) => {
          const url = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          // Replace hyphens with spaces and capitalize each word
          const displayName = segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());

          return (
            <li key={segment} className={`${styles.item} ${isLast ? 'active' : ''}`}>
              {isLast ? (
                <span>{displayName}</span>
              ) : (
                <Link href={url}>
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;