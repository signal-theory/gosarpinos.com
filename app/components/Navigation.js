'use client'

import React, { useState, useEffect, useRef } from 'react';
import { fetchPageData, fetchMediaData } from '../lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import OrderBtn from './OrderBtn';
import './Navigation.css';

import logo from '../../public/sarpinos-logo.svg'

export default function Navigation() {

  const [featuredImages, setFeaturedImages] = useState({});
  useEffect(() => {
    const pageIds = [91, 34, 170];

    pageIds.forEach(async (id) => {
      try {
        const pageData = await fetchPageData(id);

        if (pageData.featured_media) {
          const mediaData = await fetchMediaData(pageData.featured_media, 'medium');
          if (mediaData) {
            setFeaturedImages(prevImages => ({
              ...prevImages,
              [id]: {
                url: mediaData.source_url,
                alt: mediaData.alt_text
              }
            }));
          }
        }
      } catch (error) {
        console.error(`Error fetching data for page ${id}:`, error);
      }
    });
  }, []);


  // handle desktopmenu dropdowns
  const [activeMenus, setActiveMenus] = useState({});
  const myRef1 = useRef(null);
  const myRef2 = useRef(null);
  const myRef3 = useRef(null);
  const handleSubmenu = (menu) => {
    setActiveMenus(prevState => {
      // Create a new state object with all menus inactive
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      // If the clicked menu was already active, keep it inactive
      // Otherwise, set it to active
      newState[menu] = !prevState[menu];

      return newState;
    });
  };

  // handle mobile menu
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleMobile = () => {
    setToggleMenu(!toggleMenu);
  };

  const [activeMobileMenus, setActiveMobileMenus] = useState({});
  const handleMobileSubmenu = (menu) => {
    setActiveMobileMenus(prevState => {
      // Create a new state object with all menus inactive
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      // Set the clicked menu to active
      newState[menu] = true;

      return newState;
    });
  };

  // close menu dropdowns when clicking outside of them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if ((myRef1.current && !myRef1.current.contains(event.target)) &&
        (myRef2.current && !myRef2.current.contains(event.target)) &&
        (myRef3.current && !myRef3.current.contains(event.target))) {
        setActiveMenus(prevState => {
          const newState = Object.keys(prevState).reduce((acc, key) => {
            acc[key] = false;
            return acc;
          }, {});
          return newState;
        });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="main-navigation">
      <div className="navbar">
        <Link href="/" className="logo" title="Go to Sarpino&apos;s Home page">
          <Image 
          src={logo} 
          alt="Sarpino&apos;s Pizzeria Logo"
           />
        </Link>
         <button
          className={`hamburger hamburger--squeeze ${toggleMenu ? 'is-active' : ''}`}
          aria-expanded={toggleMenu}
          aria-haspopup="true"
          aria-controls="mobilemenu"
          aria-label="Toggle mobile navigation menu"
          aria-labelledby="mobilemenu"
          role="button"
          onClick={handleMobile}>
          <span aria-hidden="true">&#x2630;</span>
        </button>
        <ul className="desktopmenu">
          <li className="item has-submenu">
            <a
              className={`${activeMobileMenus['About'] ? 'active' : ''}`}
              onClick={() => handleSubmenu('About')}>About</a>
          </li>
          <li className="item has-submenu">
            <a
              className={`${activeMobileMenus['Menu'] ? 'active' : ''}`}
              onClick={() => handleSubmenu('Menu')}>Menu</a>
          </li>
          <li className="item"><Link href="/catering">Catering</Link></li>
          <li className="item has-submenu">
            <a
              className={`${activeMobileMenus['Locations'] ? 'active' : ''}`}
              onClick={() => handleSubmenu('Locations')}>Find Locations</a>
          </li>
        </ul>
        <ul className="desktoplinks">
          <li className="item button heart">
            <Link href="/loyalty">Loyalty Sign-In</Link>
          </li>
          <li className="item button">
            <OrderBtn />
          </li>
        </ul>
      </div>
      <div className={`navbar-dropdowns ${activeMenus['Locations'] ? 'locations-active' : ''}`}>
        <ul ref={myRef1} className={`item submenu about ${activeMenus['About'] ? 'active' : ''}`}>
          <li className="subitem"><Link href="/about/company" onClick={() => handleSubmenu('About')}>Company Info</Link></li>
          <li className="subitem"><Link href="/about/why-sarpinos" onClick={() => handleSubmenu('About')}>Why Sarpino&apos;s?</Link></li>
          <li className="subitem"><Link href="/about/blog" onClick={() => handleSubmenu('About')}>Sarpino&apos;s Blog</Link></li>
        </ul>
        <ul ref={myRef2} className={`item submenu menu ${activeMenus['Menu'] ? 'active' : ''}`}>
          <li className="subitem has-submenu with-thumbs">
            <ul>
              <li className="subitem">
                <Link href="/menu/build-your-own" onClick={() => handleSubmenu('Menu')}>
                  {featuredImages[91] && (
                    <Image 
                      className="featured-image" 
                      src={featuredImages[91].url} 
                      alt={featuredImages[91].alt}
                      width={191}
                      height={43}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  )}
                  Build Your Own
                </Link>
              </li>
              <li className="subitem">
                <Link href="/menu/sarpinos-specialty-pizza" onClick={() => handleSubmenu('Menu')}>
                  {featuredImages[34] && (
                    <Image 
                      className="featured-image" 
                      src={featuredImages[34].url} 
                      alt={featuredImages[34].alt}
                      width={191}
                      height={43} />
                  )}
                  Specialty Pizza
                </Link>
              </li>
              <li className="subitem">
                <Link 
                  href="/menu/vegan-pizza" 
                  onClick={() => {  handleSubmenu('Menu');}}
                >
                  {featuredImages[170] && (
                    <Image 
                      className="featured-image" 
                      src={featuredImages[170].url} 
                      alt={featuredImages[170].alt}
                      width={191}
                      height={43} />
                  )}
                  Vegan Pizza
                </Link>
              </li>
            </ul>
          </li>
          <li className="subitem has-submenu without-thumbs">
            <ul>
              <li className="subitem"><Link href="/menu/sarpinos-specialty-pizza" onClick={() => handleSubmenu('Menu')}>Full Menu</Link></li>
              <li className="subitem"><Link href="/menu/vegan-menu" onClick={() => handleSubmenu('Menu')}>Vegan Menu</Link></li>
              <li className="subitem"><Link href="/menu/gluten-free" onClick={() => handleSubmenu('Menu')}>Gluten-Free Menu</Link></li>
              <li className="subitem"><Link href="/menu/national-specials" onClick={() => handleSubmenu('Menu')}>Specials & Promotions</Link></li>
            </ul>
          </li>
        </ul>
        <ul ref={myRef3} className={`item submenu ${activeMenus['Locations'] ? 'active' : ''}`}>
          <li className="subitem"><Link href="/locations" onClick={() => handleSubmenu('Locations')}>Search Sarpino&apos;s Locations</Link></li>
        </ul>
      </div>
      <ul className={`mobilemenu ${toggleMenu ? 'active' : ''}`}>
        <li className="item has-submenu"><a tabIndex="0" className={`${activeMobileMenus['About'] ? 'active' : ''}`} onClick={() => handleMobileSubmenu('About')}>About</a>
          <ul className={`item submenu ${activeMobileMenus['About'] ? 'active' : ''}`}>
            <li className="subitem"><Link href="/about/company" onClick={handleMobile}>Company Info</Link></li>
            <li className="subitem"><Link href="/about/why-sarpinos" onClick={handleMobile}>Why Sarpino&apos;s?</Link></li>
            <li className="subitem"><Link href="/about/blog" onClick={handleMobile}>Sarpino&apos;s Blog</Link></li>
          </ul>
        </li>
        <li className="item has-submenu"><a tabIndex="0" className={`${activeMobileMenus['Menu'] ? 'active' : ''}`} onClick={() => handleMobileSubmenu('Menu')}>Menu</a>
          <ul className={`item submenu ${activeMobileMenus['Menu'] ? 'active' : ''}`}>
             <li className="subitem"><Link href="/menu/sarpinos-specialty-pizza" onClick={handleMobile}>Full Menu</Link></li>
             <li className="subitem"><Link href="/menu/build-your-own" onClick={handleMobile}>Build Your Own</Link></li>
              <li className="subitem"><Link href="/menu/vegan-menu" onClick={handleMobile}>Vegan Menu</Link></li>
              <li className="subitem"><Link href="/menu/gluten-free" onClick={handleMobile}>Gluten-Free Menu</Link></li>
              <li className="subitem"><Link href="/menu/national-specials" onClick={handleMobile}>Specials & Promotions</Link></li>
            
          </ul>
        </li>
        <li className="item"><Link href="/catering" onClick={handleMobile}>Catering</Link></li>
        <li className="item"><Link href="/locations" onClick={handleMobile}>Find Locations</Link></li>
        <li className="item button heart"><a href="/loyalty" onClick={handleMobile}>Loyalty Sign-In</a></li>
      </ul>
      
    </nav>
  );
}