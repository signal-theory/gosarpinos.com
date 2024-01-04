'use client';
import React, { useState, useEffect, useRef } from 'react';
import { fetchPageData, fetchMediaData } from '../lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import '../styles/navigation.css';

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


  // handle menu dropdowns
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

  return (
    <nav className="main-navigation">
      <div className="navbar">
        <Link href="/" className="logo" title="Go to Sarpino&apos;s Home page">
          <Image 
          src={logo} 
          alt="Sarpino&apos;s Pizzeria Logo"
           />
        </Link>
        <ul className="desktopmenu">
          <li className="item has-submenu">
            <a
              className={`${activeMenus['About'] ? 'active' : ''}`}
              onClick={() => handleSubmenu('About')}>About</a>
          </li>
          <li className="item has-submenu">
            <a
              className={`${activeMenus['Menu'] ? 'active' : ''}`}
              onClick={() => handleSubmenu('Menu')}>Menu</a>
          </li>
          <li className="item"><Link href="/">Catering</Link></li>
          <li className="item has-submenu">
            <a
              className={`${activeMenus['Locations'] ? 'active' : ''}`}
              onClick={() => handleSubmenu('Locations')}>Find Locations</a>
          </li>
        </ul>
        <ul className="desktoplinks">
          <li className="item button heart">
            <a href="/">Loyalty Sign-In</a>
          </li>
          <li className="item button">
            <a href="" className=" btn primary-btn glow"><span>Order Now</span></a>
          </li>
        </ul>
      </div>
      <div className={`navbar-dropdowns ${activeMenus['Locations'] ? 'locations-active' : ''}`}>
        <ul ref={myRef1} className={`item submenu about ${activeMenus['About'] ? 'active' : ''}`}>
          <li className="subitem"><Link href="/" onClick={() => handleSubmenu('About')}>Company Info</Link></li>
          <li className="subitem"><Link href="/" onClick={() => handleSubmenu('About')}>Why Sarpino&apos;s?</Link></li>
          <li className="subitem"><Link href="/" onClick={() => handleSubmenu('About')}>Sarpino&apos;s Blog</Link></li>
        </ul>
        <ul ref={myRef2} className={`item submenu menu ${activeMenus['Menu'] ? 'active' : ''}`}>
          <li className="subitem has-submenu with-thumbs">
            <ul>
              <li className="subitem">
                <Link href="/" onClick={() => handleSubmenu('Menu')}>
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
                <Link href="/" onClick={() => handleSubmenu('Menu')}>
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
                <Link href="/" onClick={() => handleSubmenu('Menu')}>
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
              <li className="subitem"><Link href="/a" onClick={() => handleSubmenu('Menu')}>Full Menu</Link></li>
              <li className="subitem"><Link href="/" onClick={() => handleSubmenu('Menu')}>Vegan Menu</Link></li>
              <li className="subitem"><Link href="/" onClick={() => handleSubmenu('Menu')}>Gluten-Free Menu</Link></li>
              <li className="subitem"><Link href="/" onClick={() => handleSubmenu('Menu')}>Specials & Promotions</Link></li>
            </ul>
          </li>
        </ul>
        <ul ref={myRef3} className={`item submenu ${activeMenus['Locations'] ? 'active' : ''}`}>
          <li className="subitem"><Link href="/" onClick={() => handleSubmenu('Locations')}>Search Sarpino&apos;s Locations</Link></li>
        </ul>
      </div>
    </nav>
  );
}