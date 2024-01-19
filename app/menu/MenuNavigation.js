'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import styles from './MenuNavigation.module.css'

export default function MenuNavigation({ mode, activeItem }) {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState(activeItem);

  //  Functions to handle nav Switching
  const handleNav = (navId, href) => (event) => {
    setActiveNav(navId);
    router.push(href);
  };

  const subnav = [
    { id: "specials", label: "National Specials", handler: handleNav("specials"), href: "/menu/national-specials" },
    { id: "build-your-own", label: "Build Your Own", handler: handleNav("build-your-own"), href: "/menu/build-your-own" },
    { id: "vegan-menu", label: "Vegan", handler: handleNav("vegan-menu"), href: "/vegan-menu/vegan-pizza" },
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
