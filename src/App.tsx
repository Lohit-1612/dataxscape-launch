import React, { useState, useEffect } from 'react';
import { SiteDataProvider } from './context/SiteDataContext';
import { LandingPage } from './pages/LandingPage';
import { AdminPortal } from './pages/AdminPortal';
import { MobileRemote } from './pages/MobileRemote';

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<'site' | 'admin' | 'remote'>(() => {
    const p = window.location.pathname;
    const h = window.location.hash;
    if (p === '/remote' || h === '#remote') return 'remote';
    if (p === '/admin' || h === '#admin') return 'admin';
    return 'site';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const p = window.location.pathname;
      const h = window.location.hash;
      if (p === '/remote' || h === '#remote') {
        setCurrentRoute('remote');
      } else if (p === '/admin' || h === '#admin') {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('site');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Secret keyboard shortcut to toggle admin portal: Ctrl + Shift + Alt + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setCurrentRoute((prev) => (prev === 'admin' ? 'site' : 'admin'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleBackToSite = () => {
    if (window.location.hash) {
      window.location.hash = '';
    }
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
    setCurrentRoute('site');
  };

  return (
    <SiteDataProvider>
      {currentRoute === 'remote' ? (
        <MobileRemote />
      ) : currentRoute === 'admin' ? (
        <AdminPortal onBackToSite={handleBackToSite} />
      ) : (
        <LandingPage />
      )}
    </SiteDataProvider>
  );
};

export default App;
