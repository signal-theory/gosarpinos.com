'use client';
import React, { useState, useEffect } from 'react';
import { StoreContext } from './useStoreContext';

export const StoreProvider = ({ children }) => {
  const [store, setStore] = useState(localStorage.getItem('selectedStore') || '');

  // Update localStorage whenever the store state changes
  useEffect(() => {
    localStorage.setItem('selectedStore', store);
  }, [store]);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};