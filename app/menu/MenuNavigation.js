'use client'

import { useState } from 'react';
import Link from 'next/link';
import styles from './MenuNavigation.module.css';

export default function MenuNavigation({mode, activeItem}) {
  const [activeNav, setActiveNav] = useState(activeItem);
  //  Functions to handle nav Switching
  const handleNav1 = () => {
    setActiveNav("specials");
  };
  const handleNav2 = () => {
    setActiveNav("build-your-own");
  };
  const handleNav3 = () => {
    setActiveNav("pizza");
  };
  const handleNav4 = () => {
    setActiveNav("calzones");
  };
  const handleNav5 = () => {
    setActiveNav("wings-apps");
  };
  const handleNav6 = () => {
    setActiveNav("salads");
  };
  const handleNav7 = () => {
    setActiveNav("sandwiches");
  };
  const handleNav8 = () => {
    setActiveNav("pastas");
  };
  const handleNav9 = () => {
    setActiveNav("breadsticks");
  };
  const handleNav10 = () => {
    setActiveNav("desserts");
  };
  const handleNav11 = () => {
    setActiveNav("extras");
  };

  const subnav = [
    { id: "specials", label: "National Specials", handler: handleNav1, href: "/menu/national-specials" },
    { id: "build-your-own", label: "Build Your Own", handler: handleNav2, href: "/menu/build-your-own" },
    { id: "pizza", label: "Pizza", handler: handleNav3, href: "/menu/sarpinos-specialty-pizza" },
    { id: "calzones", label: "Calzones", handler: handleNav4, href: "/menu/calzones" },
    { id: "wings-apps", label: "Wings & Appetizers", handler: handleNav5, href: "/menu/wings-apps" },
    { id: "salads", label: "Salads", handler: handleNav6, href: "/menu/salads" },
    { id: "sandwiches", label: "Sandwiches", handler: handleNav7, href: "/menu/sandwiches" },
    { id: "pastas", label: "Pastas", handler: handleNav8, href: "/menu/pastas" },
    { id: "breadsticks", label: "Breadsticks", handler: handleNav9, href: "/menu/breadsticks" },
    { id: "desserts", label: "Desserts", handler: handleNav10, href: "/menu/desserts" },
    { id: "extras", label: "Extras", handler: handleNav10, href: "/menu/extras" }
  ];


  return (
      <nav className={mode === "light" ? `${styles.light}` : `${styles.dark}`}>
        <ul className={styles.menuNavigation}>
          {subnav.map((nav, index) => (
            <li key={index}>
              <Link
              href={nav.href}
              className={`${styles.navItem} ${activeNav === nav.id ? styles.active : ""}`}
              onClick={nav.handler}>{nav.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
  );
}
