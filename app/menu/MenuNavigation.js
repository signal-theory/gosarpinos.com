'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useContext } from 'react';
import { ThemeContext } from '../context/useThemeProvider';

import Link from 'next/link'
import Image from 'next/image'
import styles from './MenuNavigation.module.css'
import Breadcrumbs from '../components/Breadcrumbs'

export default function MenuNavigation({ mode, activeItem }) {
  const theme = useContext(ThemeContext);
  let navClass = mode === "light" ? styles.light : styles.dark;
  if (mode === "light" && theme === 'night') {
    navClass = ` ${styles.night}`;
  }
  const router = useRouter();
  const [activeNav, setActiveNav] = useState(activeItem);
  const activeRef = useRef(null);

  //  Functions to handle nav Switching
  const handleNav = (navId, href) => (event) => {
    try {
      setActiveNav(navId);
      router.push(href);
    } catch (error) {
      console.error(error);
    }
  };

  const subnav = [
    { id: "build-your-own", label: "Create Your Own", handler: handleNav("build-your-own"), href: "/menu/create-your-own" },
    { id: "pizza", label: "Pizza", handler: handleNav("sarpinos-specialty-pizza"), href: "/menu/sarpinos-specialty-pizza" },
    { id: "deep-dish", label: "Deep Dish", handler: handleNav("deep-dish"), href: "/menu/deep-dish-pizza" },
    { id: "calzones", label: "Calzones", handler: handleNav("calzones"), href: "/menu/calzones" },
    { id: "wings-apps", label: "Wings & Appetizers", handler: handleNav("wings-apps"), href: "/menu/wings-apps" },
    { id: "salads", label: "Salads", handler: handleNav("salads"), href: "/menu/salads" },
    { id: "sandwiches", label: "Sandwiches", handler: handleNav("sandwiches"), href: "/menu/sandwiches" },
    { id: "pastas", label: "Pastas", handler: handleNav("pastas"), href: "/menu/pastas" },
    { id: "breadsticks", label: "Breadsticks", handler: handleNav("breadsticks"), href: "/menu/breadsticks" },
    { id: "desserts", label: "Desserts", handler: handleNav("desserts"), href: "/menu/desserts" },
    { id: "extras", label: "Extras", handler: handleNav("extras"), href: "/menu/extras" }
  ];

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
  }, []);

  return (
    <>
      <nav className={navClass}>
        <div className={styles.menuLabel}>
          <Image
            className={styles.menuLabelFull}
            src="/menu-label-full.png"
            alt="Full Menu"
            width={135}
            height={50}
          />
        </div>
        <ul className={styles.menuNavigation}>
          {subnav.map((nav, index) => (
            <li key={index} ref={activeNav === nav.id ? activeRef : null}>
              <Link
                href={nav.href}
                className={`${styles.navItem} ${activeNav === nav.id ? styles.active : ""}`}
                onClick={nav.handler}>{nav.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Breadcrumbs location={mode === "light" ? "white-text" : "green-text"} />
    </>
  );
}
